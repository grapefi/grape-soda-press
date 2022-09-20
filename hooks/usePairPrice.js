import { useEffect, useState } from "react";
import { useNetwork, useContractRead } from "wagmi";
import { getDefaultProvider } from "ethers";

// constants
import {
  GRAPE,
  TOKEN,
  GRAPEMIM,
  MIM,
  XGRAPE,
  GRAPE_MIM_SW,
  GRAPE_MIM_SW_MAGIK,
} from "../constants";

export const usePairPrice = () => {
  const { chain } = useNetwork();
  const provider = getDefaultProvider();
  const [pairPrice, setPairPrice] = useState();

  const LPContract = {
    addressOrName: TOKEN[chain?.id]?.address,
    contractInterface: TOKEN[chain?.id]?.abi,
  };

  const xGrapeContract = {
    addressOrName: XGRAPE[chain?.id]?.address,
    contractInterface: XGRAPE[chain?.id]?.abi,
  };

  const GrapeMIMContract = {
    addressOrName: GRAPEMIM[chain?.id]?.address,
    contractInterface: GRAPEMIM[chain?.id]?.abi,
  };

  const GrapeMIMSWContract = {
    addressOrName: GRAPE_MIM_SW[chain?.id]?.address,
    contractInterface: GRAPE_MIM_SW[chain?.id]?.abi,
  };

  const GrapeMIMMagikContract = {
    addressOrName: GRAPE_MIM_SW_MAGIK[chain?.id]?.address,
    contractInterface: GRAPE_MIM_SW_MAGIK[chain?.id]?.abi,
  };

  const mimContract = {
    addressOrName: MIM[chain?.id]?.address,
    contractInterface: MIM[chain?.id]?.abi,
  };

  const { data: calculatedPrice } = useContractRead({
    ...xGrapeContract,
    functionName: "calculatePrice",
  });

  const { data: pricePerFullShare } = useContractRead({
    ...GrapeMIMMagikContract,
    functionName: "getPricePerFullShare",
  });

  const { data: grapeMIMSWTotalSupply } = useContractRead({
    ...GrapeMIMSWContract,
    functionName: "totalSupply",
  });

  const { data: mimBalanceInSWLP } = useContractRead({
    ...mimContract,
    functionName: "balanceOf",
    args: [GrapeMIMSWContract.addressOrName],
  });

  const { data: grapeXGrapeSupply } = useContractRead({
    ...LPContract,
    functionName: "totalSupply",
  });

  const { data: xGrapeBalance } = useContractRead({
    ...xGrapeContract,
    functionName: "balanceOf",
    args: [LPContract.addressOrName],
  });

  const calculateXGrapePrice = () => {
    const xGrapeToMagik = Number(calculatedPrice) / 1e18;
    const magikLpToGrapeMIM = Number(pricePerFullShare) / 1e18;
    const grapeMIMTotalSupply = Number(grapeMIMSWTotalSupply) / 1e18;
    const mimBalance = Number(mimBalanceInSWLP) / 1e18;
    const fixedLPPrice = (Number(mimBalance) * 2) / Number(grapeMIMTotalSupply);
    return (xGrapeToMagik * magikLpToGrapeMIM * fixedLPPrice).toFixed(3);
  };

  useEffect(() => {
    async function retrievePrice() {
      const xGrapePrice = calculateXGrapePrice();
      const lpSupply = Number(grapeXGrapeSupply) / Math.pow(10, 18);
      const xGrapeBalanceInLP = Number(xGrapeBalance) / Math.pow(10, 18);
      const fixedLPPrice = (
        (xGrapeBalanceInLP * xGrapePrice * 2) /
        lpSupply
      ).toFixed(3);
      setPairPrice(fixedLPPrice);
    }
    if (
      chain &&
      provider &&
      xGrapeBalance &&
      grapeXGrapeSupply &&
      calculatedPrice &&
      pricePerFullShare &&
      grapeMIMSWTotalSupply &&
      mimBalanceInSWLP
    ) {
      retrievePrice();
    }
  }, [
    chain,
    provider,
    xGrapeBalance,
    grapeXGrapeSupply,
    calculatedPrice,
    pricePerFullShare,
    grapeMIMSWTotalSupply,
    mimBalanceInSWLP,
  ]);

  return pairPrice;
};

export default usePairPrice;
