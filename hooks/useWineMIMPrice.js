import { useEffect, useState } from "react";
import { useNetwork, useContractRead } from "wagmi";
import { getDefaultProvider } from "ethers";

// constants
import { MIM, TOKEN } from "../constants";

export const useWineMIMPrice = () => {
  const { chain } = useNetwork();
  const provider = getDefaultProvider();
  const [wineMIMLPPrice, setWineMIMLPPrice] = useState();

  const LPContract = {
    addressOrName: TOKEN[chain?.id]?.address,
    contractInterface: TOKEN[chain?.id]?.abi,
  };

  const mimContract = {
    addressOrName: MIM[chain?.id]?.address,
    contractInterface: MIM[chain?.id]?.abi,
  };

  const { data: wineMIMSupply } = useContractRead({
    ...LPContract,
    functionName: "totalSupply",
  });

  const { data: mimBalance } = useContractRead({
    ...mimContract,
    functionName: "balanceOf",
    args: [LPContract.addressOrName],
  });

  useEffect(() => {
    async function retrievePrice() {
      const fixedLPSupply = Number(wineMIMSupply) / Math.pow(10, 18);
      const fixedMIMBalance = Number(mimBalance) / Math.pow(10, 18);
      const fixedLPPrice = ((fixedMIMBalance * 2) / fixedLPSupply).toFixed(2)
      setWineMIMLPPrice(fixedLPPrice);
    }
    if (chain && provider && wineMIMSupply && mimBalance) {
      retrievePrice();
    }
  }, [chain, provider, wineMIMSupply, mimBalance]);

  return wineMIMLPPrice;
};

export default useWineMIMPrice;
