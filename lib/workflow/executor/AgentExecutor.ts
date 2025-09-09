import { AgentTask } from "@/lib/workflow/task/AgentTask";
import { ExecutionEnvironment } from "@/types/executor";
import { privateKeyToAccount } from "viem/accounts";
import { http } from "viem";
import { sepolia } from "viem/chains";
import { createWalletClient } from "viem";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";
import { generateText } from "ai";
import { google } from '@ai-sdk/google';
import { pluginRegistry } from "@/lib/goat-plugins/pluginRegistry";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import { selectChain } from "@/lib/chains";

export async function AgentExecutor(
  environment: ExecutionEnvironment<typeof AgentTask>
): Promise<boolean> {
  try {
    const systemPrompt = environment.getInput("System Prompt");
    if (!systemPrompt) {
      environment.log.error("input->systemPrompt not defined");
    }

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("input->prompt not defined");
    }
    const wallet = environment.getInput("Wallet");
    if (!wallet) {
      environment.log.error("input->wallet not defined");
    }
    const chain = environment.getInput("Chain");
    if (!chain) {
      environment.log.error("input->chain not defined");
    }

    const context = environment.getInput("Context");
    environment.log.info(`Context: ${context}`);

    const plugins = environment.getPlugin();
    environment.log.info(`Plugins: ${plugins}`);

     // Get credentials from DB
     const credential = await prisma.credential.findUnique({
      where: { id: wallet },
    });

    if (!credential) {
      environment.log.error("credential not found");
      return false;
    }

    const privateKey = symmetricDecrypt(credential.value);
    if (!privateKey) {
      environment.log.error("cannot decrypt wallet private key");
      return false;
    }
    const account = privateKeyToAccount(
      privateKey.startsWith('0x') ? privateKey as `0x${string}` : `0x${privateKey}`
    );
    environment.log.info(`Chain: ${JSON.stringify(selectChain(chain))}`);
    environment.log.info(`RPC URL: ${selectChain(chain).rpcUrls.default.http[0]}`);
    const walletClient = createWalletClient({
      account: account,
      transport: http(selectChain(chain).rpcUrls.default.http[0]),
      chain: selectChain(chain),
    });

    const tools = await getOnChainTools({
      wallet: viem(walletClient as any),
      plugins: plugins?.map(pluginId => pluginRegistry[pluginId as keyof typeof pluginRegistry]) || [],
    });

    const message = context ? context + "\n\n" + prompt : prompt;


    environment.log.info(`Messages: ${message}`);

    const response = await generateText({
      model: google('gemini-1.5-flash'),
      tools: tools as any,
      maxSteps: 5,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
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
