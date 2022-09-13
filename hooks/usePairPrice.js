import { useEffect, useState } from "react";
import { useNetwork, useContractRead } from "wagmi";
import { getDefaultProvider } from "ethers";

// constants
import { GRAPE, TOKEN, GRAPEMIM, MIM } from "../constants";

export const usePairPrice = () => {
  const { chain } = useNetwork();
  const provider = getDefaultProvider();
  const [pairPrice, setPairPrice] = useState();

  const LPContract = {
    addressOrName: TOKEN[chain?.id]?.address,
    contractInterface: TOKEN[chain?.id]?.abi,
  };

  const GrapeMIMContract = {
    addressOrName: GRAPEMIM[chain?.id]?.address,
    contractInterface: GRAPEMIM[chain?.id]?.abi,
  };

  const grapeContract = {
    addressOrName: GRAPE[chain?.id]?.address,
    contractInterface: GRAPE[chain?.id]?.abi,
  };

  const mimContract = {
    addressOrName: MIM[chain?.id]?.address,
    contractInterface: MIM[chain?.id]?.abi,
  };

  const { data: grapeXGrapeSupply } = useContractRead({
    ...LPContract,
    functionName: "totalSupply",
  });

  const { data: grapeBalance } = useContractRead({
    ...grapeContract,
    functionName: "balanceOf",
    args: [LPContract.addressOrName],
  });

  const { data: grapeBalanceInGrapeMIM } = useContractRead({
    ...grapeContract,
    functionName: "balanceOf",
    args: [GrapeMIMContract.addressOrName],
  });

  const { data: mimBalanceInGrapeMIM } = useContractRead({
    ...mimContract,
    functionName: "balanceOf",
    args: [GrapeMIMContract.addressOrName],
  });

  useEffect(() => {
    async function retrievePrice() {
      const grapePrice = (
        +mimBalanceInGrapeMIM / +grapeBalanceInGrapeMIM
      ).toFixed(3);
      const lpSupply = Number(grapeXGrapeSupply) / Math.pow(10, 18);
      const grapeBalanceInLP = Number(grapeBalance) / Math.pow(10, 18);
      const fixedLPPrice = (
        (grapeBalanceInLP * grapePrice * 2) /
        lpSupply
      ).toFixed(3);
      setPairPrice(fixedLPPrice);
    }
    if (
      chain &&
      provider &&
      grapeBalance &&
      grapeXGrapeSupply &&
      grapeBalanceInGrapeMIM &&
      mimBalanceInGrapeMIM
    ) {
      retrievePrice();
    }
  }, [
    chain,
    provider,
    grapeBalance,
    grapeXGrapeSupply,
    grapeBalanceInGrapeMIM,
    mimBalanceInGrapeMIM,
  ]);

  return pairPrice;
};

export default usePairPrice;
