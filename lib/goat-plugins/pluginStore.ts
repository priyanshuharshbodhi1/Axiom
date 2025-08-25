interface Plugin {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
  }
export const pluginStore: Plugin[] = [
  {
    id: "CoinGecko",
    name: "CoinGecko", 
    description: "Get coin information using CoinGecko API",
    icon: "🪙",
    category: "Search",
  },
  {
    id: "sendETH",
    name: "Send ETH", 
    description: "Send ETH to a wallet",
    icon: "💰",
    category: "Transaction",
  },
];
