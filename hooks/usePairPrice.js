import { useEffect, useState } from "react";
import { useNetwork, useContractRead } from "wagmi";
import { getDefaultProvider } from "ethers";

// constants
import {
  TOKEN,
  GRAPEMIM,
  MIM,
  XGRAPE,
  GRAPE_MIM_SW,
  GRAPE_MIM_SW_MAGIK,
  XGRAPEORACLE,
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

  const xGrapeOracleContract = {
    addressOrName: XGRAPEORACLE[chain?.id]?.address,
    contractInterface: XGRAPEORACLE[chain?.id]?.abi,
  };

  const { data: xGrapePrice } = useContractRead({
    ...xGrapeOracleContract,
    functionName: "xGrapePrice",
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

  useEffect(() => {
    async function retrievePrice() {
      const formattedxGrapePrice = Number(xGrapePrice) / Math.pow(10, 18);
      const lpSupply = Number(grapeXGrapeSupply) / Math.pow(10, 18);
      const xGrapeBalanceInLP = Number(xGrapeBalance) / Math.pow(10, 18);
      const fixedLPPrice = (
        (xGrapeBalanceInLP * formattedxGrapePrice * 2) /
        lpSupply
      ).toFixed(3);
      setPairPrice(fixedLPPrice);
    }
    if (
      chain &&
      provider &&
      xGrapeBalance &&
      grapeXGrapeSupply &&
      xGrapePrice
    ) {
      retrievePrice();
    }
  }, [chain, provider, xGrapeBalance, grapeXGrapeSupply, xGrapePrice]);

  return pairPrice;
};

export default usePairPrice;
