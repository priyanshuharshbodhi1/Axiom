import { coingecko } from "@goat-sdk/plugin-coingecko";
import { sendETH } from "@goat-sdk/wallet-evm";
import { oneInch } from '@goat-sdk/plugin-1inch';
import { zeroEx } from '@goat-sdk/plugin-0x';
import { birdeye } from '@goat-sdk/plugin-birdeye';
import { coinmarketcap } from '@goat-sdk/plugin-coinmarketcap';
import { polymarket } from '@goat-sdk/plugin-polymarket';

import { pluginStore } from "./pluginStore";

type PluginId = typeof pluginStore[number]["id"];

export const pluginRegistry: Record<PluginId, any> = {
  CoinGecko: coingecko({ apiKey: process.env.COINGECKO_API_KEY as string }),
  sendETH: sendETH(),
  oneInch: oneInch({ apiKey: process.env.ONEINCH_API_KEY as string }),
  zeroEx: zeroEx({ apiKey: process.env.ZEROEX_API_KEY as string }),
  birdeye: birdeye({ apiKey: process.env.BIRDEYE_API_KEY as string }),
  coinMarketCap: coinmarketcap({ apiKey: process.env.COINMARKETCAP_API_KEY as string }),
  polymarket: polymarket({ 
    credentials: {
    key: process.env.POLYMARKET_API_KEY as string,
    secret: process.env.POLYMARKET_SECRET as string,
    passphrase: process.env.POLYMARKET_PASSPHRASE as string,
}, }),
} as const;