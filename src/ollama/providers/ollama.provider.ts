import { generateText } from 'ai';
import { ollama } from 'ollama-ai-provider';

export class OllamaProvider {
  public static async generateResponse(prompt: string) {
    const resp = await generateText({
      model: ollama('gemma3:1b'),
      prompt: prompt,
    });
    const { text } = resp.response.messages[0].content[0] as any;

    return text;
  }
}
