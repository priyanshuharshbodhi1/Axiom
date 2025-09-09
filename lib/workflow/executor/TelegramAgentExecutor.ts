import { ExecutionEnvironment } from "@/types/executor";
import { generateText } from "ai";
import { google } from '@ai-sdk/google';
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import { TelegramAgentTask } from "@/lib/workflow/task/TelegramAgent";
import { telegramTools } from "@/lib/telegram-plugin/telegram";


export async function TelegramAgentExecutor(
  environment: ExecutionEnvironment<typeof TelegramAgentTask>
): Promise<boolean> {
  try {
    const systemPrompt = environment.getInput("System Prompt");
    if (!systemPrompt) {
      environment.log.error("input->systemPrompt not defined");
    }

    const context = environment.getInput("Context");
    environment.log.info(`Context: ${context}`);

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("input->prompt not defined");
    }

    const botToken = environment.getInput("Bot Token");
    if (!botToken) {
      environment.log.error("input->botToken not defined");
    }

    const chatId = environment.getInput("Chat ID");
    if (!chatId) {
      environment.log.error("input->chatId not defined");
    }
     // Get credentials from DB
     const credential = await prisma.credential.findUnique({
      where: { id: botToken },
    });

    if (!credential) {
      environment.log.error("credential not found");
      return false;
    }

    const decryptedBotToken = symmetricDecrypt(credential.value);
    if (!decryptedBotToken) {
      environment.log.error("cannot decrypt bot token");
      return false;
    }

    environment.log.info(`Bot token length: ${decryptedBotToken.length}`);
    environment.log.info(`Chat ID: ${chatId}`);

    // Validate bot token format (should be like 123456789:ABC-DEF...)
    if (!decryptedBotToken.includes(':') || decryptedBotToken.length < 45) {
      environment.log.error("Invalid bot token format");
      return false;
    }

    // Validate chat ID (should be numeric or start with @ for username)
    if (!chatId || (!/^-?\d+$/.test(chatId) && !chatId.startsWith('@'))) {
      environment.log.error("Invalid chat ID format");
      return false;
    }

    const message = context ? "Context: " + context + "\n\n" + "Prompt: " + prompt : "Prompt: " + prompt;

    environment.log.info(`Messages: ${message}`);

    const response = await generateText({
      model: google('gemini-1.5-flash'),
      tools: { ...telegramTools({ botToken: decryptedBotToken, chatId }) } as any,
      maxSteps: 10,
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
