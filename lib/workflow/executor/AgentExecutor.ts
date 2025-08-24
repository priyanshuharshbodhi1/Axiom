import { AgentTask } from "@/lib/workflow/task/AgentTask";
import { ExecutionEnvironment } from "@/types/executor";
import { privateKeyToAccount } from "viem/accounts";
import { http } from "viem";
import { sepolia } from "viem/chains";
import { createWalletClient } from "viem";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { coingecko } from "@goat-sdk/plugin-coingecko";
import { viem } from "@goat-sdk/wallet-viem";
import { generateText } from "ai";
import { google } from '@ai-sdk/google';


export async function AgentExecutor(
  environment: ExecutionEnvironment<typeof AgentTask>
): Promise<boolean> {
  try {

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("input->prompt not defined");
    }

    const context = environment.getInput("Context");
    environment.log.info(`Context: ${context}`);

    const plugins = environment.getPlugin();
    environment.log.info(`Plugins: ${plugins}`);

    const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);

    const walletClient = createWalletClient({
      account: account,
      transport: http(process.env.RPC_PROVIDER_URL),
      chain: sepolia,
    });

    const tools = await getOnChainTools({
      wallet: viem(walletClient as any),
      plugins: [coingecko({ apiKey: process.env.COINGECKO_API_KEY as string })],
    });

    const response = await generateText({
      model: google('gemini-2.0-pro-exp-02-05'),
      tools: tools,
      maxSteps: 5,
      prompt: prompt,
    });

    const result = response.text;
    if (!result) {
      environment.log.error("empty response from AI");
      return false;
    }

    environment.setOutput("Response", result);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
