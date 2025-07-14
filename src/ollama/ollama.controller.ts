import { Body, Controller, Post } from '@nestjs/common';
import { OllamaService } from './ollama.service';

@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post()
  public async generateResponse(@Body() body: { prompt: string }) {
    const resp = await this.ollamaService.generateResponse(body.prompt);
    return {
      success: resp !== null,
      request: body.prompt,
      response: resp,
    };
  }
}
