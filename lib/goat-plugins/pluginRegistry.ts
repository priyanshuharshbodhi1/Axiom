import { coingecko } from "@goat-sdk/plugin-coingecko";
import { pluginStore } from "./pluginStore";

type PluginId = typeof pluginStore[number]["id"];

export const pluginRegistry: Record<PluginId, any> = {
  CoinGecko: coingecko({ apiKey: process.env.COINGECKO_API_KEY as string }),
} as const;