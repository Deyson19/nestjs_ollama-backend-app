import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IOllamaResponse } from './interfaces/IOllamaResponse';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class OllamaService {
  private readonly baseUrl: string;
  private readonly model: string = 'gemma3:1b';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>('BASE_URL')!;
  }

  public async generateResponse(prompt: string) {
    const resp = await this.request(prompt);
    return resp.data.response;
  }

  public async generateText(prompt: string) {
    const resp = (await this.request(prompt)).data.response;
    return resp;
  }

  private async request(prompt: string) {
    if (prompt.length === 0) {
      throw new BadRequestException({
        message: 'Prompt cannot be empty',
        status: 400,
        error: 'Bad Request',
      });
    }
    const endPoint = `${this.baseUrl}/api/generate`;
    const body = {
      model: this.model,
      prompt: prompt,
      stream: false,
      format: 'json',
    };

    return await firstValueFrom(
      this.httpService.post<IOllamaResponse>(endPoint, body),
    );
  }
}
