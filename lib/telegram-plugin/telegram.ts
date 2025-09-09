import { type Tool, tool } from 'ai'
import { z } from 'zod'

export type TelegramTools = 'sendMessage'

export const telegramTools = (
    { botToken, chatId }: { botToken: string; chatId: string },
    config?: { excludeTools?: TelegramTools[] }
): Partial<Record<TelegramTools, Tool>> => {
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const tools: Partial<Record<TelegramTools, Tool>> = {
        sendMessage: tool({
            description: 'A Tool to send a message to a telegram chat',
            parameters: z.object({
                message: z.string().describe('The message to send'),
            }),
            execute: async ({ message }) => {
                const response = await sendMessage(telegramUrl, chatId, message)

                return response
            },
        }),
    }

    if (config?.excludeTools) {
        for (const toolName in tools) {
            if (config.excludeTools.includes(toolName as TelegramTools)) {
                delete tools[toolName as TelegramTools]
            }
        }
    }

    return tools
}

async function sendMessage(
    telegramUrl: string,
    chatId: string,
    message: string
) {
    try {
        console.log(`Attempting to send message to Telegram API: ${telegramUrl}`);
        console.log(`Chat ID: ${chatId}`);
        
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        console.log(`Response status: ${response.status}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Telegram API error: ${errorText}`);
            return {
                error: `Failed to send message: ${response.status} - ${errorText}`,
            }
        }

        const responseData = await response.json();
        console.log('Message sent successfully:', responseData);
        
        return {
            success: 'Message sent successfully',
            data: responseData
        }
    } catch (error: any) {
        console.error('Fetch error:', error.message);
        return {
            error: `Network error: ${error.message}`,
        }
    }
}
