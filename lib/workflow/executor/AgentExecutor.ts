import { symmetricDecrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import { AgentTask } from "@/lib/workflow/task/AgentTask";
import { ExecutionEnvironment } from "@/types/executor";
import OpenAI from "openai";

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

    // const openai = new OpenAI({
    //   apiKey: plainCredentialValue,
    // });

    // const response = await openai.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         "You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text",
    //     },
    //     {
    //       role: "user",
    //       content: content,
    //     },
    //     { role: "user", content: prompt },
    //   ],
    //   temperature: 1,
    // });

    const result = prompt;
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
