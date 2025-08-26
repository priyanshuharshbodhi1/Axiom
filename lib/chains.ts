import {
    mainnet,
    sepolia,
    baseSepolia,
    base,
    sei,
    seiDevnet,
    seiTestnet,
    arbitrum,
    arbitrumSepolia,
    avalanche,
    avalancheFuji,
    celo,
    celoAlfajores,
    gnosis,
    gnosisChiado,
    linea,
    lineaSepolia,
    optimism,
    optimismSepolia,
    polygon,
    polygonMumbai,
    polygonZkEvm,
    polygonZkEvmTestnet
} from "viem/chains";

export const chains = {
    sepolia: sepolia,
    mainnet: mainnet,
    baseSepolia: baseSepolia,
    base: base,
    sei: sei,
    seiDevnet: seiDevnet,
    seiTestnet: seiTestnet,
    arbitrum: arbitrum,
    arbitrumSepolia: arbitrumSepolia,
    avalanche: avalanche,
    avalancheFuji: avalancheFuji,
    celo: celo,
    celoAlfajores: celoAlfajores,
    gnosis: gnosis,
    gnosisChiado: gnosisChiado,
    linea: linea,
    lineaSepolia: lineaSepolia,
    optimism: optimism,
    optimismSepolia: optimismSepolia,
    polygon: polygon,
    polygonMumbai: polygonMumbai,
    polygonZkEvm: polygonZkEvm,
    polygonZkEvmTestnet: polygonZkEvmTestnet,
};
//11155111 | 1 | 84532 | 8453 | 1329 | 713715 | 1328 | 42161 | 421614 | 43114 | 43113 | 42220 | 44787 | 100 | 10200 | 59144 | 59141 | 10 | 11155420 | 137 | 80001 | 1101 | 1442

const CHAIN_MAP: Record<string, keyof typeof chains> = {
    "11155111": "sepolia",
    "1": "mainnet",
    "84532": "baseSepolia",
    "8453": "base",
    "1329": "sei",
    "713715": "seiDevnet",
    "1328": "seiTestnet",
    "42161": "arbitrum",
    "421614": "arbitrumSepolia",
    "43114": "avalanche",
    "43113": "avalancheFuji",
    "42220": "celo",
    "44787": "celoAlfajores",
    "100": "gnosis",
    "10200": "gnosisChiado",
    "59141": "linea",
    "59144": "lineaSepolia",
    "10": "optimism",
    "11155420": "optimismSepolia",
    "137": "polygon",
    "80001": "polygonMumbai",
    "1442": "polygonZkEvm",
    "1101": "polygonZkEvmTestnet"
  };
  
  export const selectChain = (chainId: string) => {
    return chains[CHAIN_MAP[chainId] || "sepolia"];
  };

export const chainList = Object.values(chains).map((chain) => ({
    label: chain.name,
    value: chain.id.toString(),
}));