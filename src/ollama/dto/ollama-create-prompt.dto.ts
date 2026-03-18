import { ApiProperty } from '@nestjs/swagger';

export class OllamaCreatePrompt {
  @ApiProperty({
    description: 'Prompt to generate response',
    required: true,
    type: String,
  })
  prompt: string;
}
