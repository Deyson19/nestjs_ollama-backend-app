import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OllamaService } from './ollama.service';

@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async generateResponse(@Body() body: { prompt: string }) {
    const resp = await this.ollamaService.generateResponse(body.prompt);

    return {
      success: resp !== null,
      response: resp,
    };
  }
}
