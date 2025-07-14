import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
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
    console.log(resp.data);
    return resp.data.response;
  }

  private async request(prompt: string) {
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
