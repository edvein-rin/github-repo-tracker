import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import z from 'zod';

import type { EnvironmentVariables } from './environmentVariables';
import type { LeafTypes, Leaves } from './leaves';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  static validate = (config: Record<string, unknown>): EnvironmentVariables => {
    const envsSchema = z.object({
      POSTGRES_HOST: z.string(),
      POSTGRES_PORT: z.string().regex(/^\d+$/).transform(Number),
      POSTGRES_USER: z.string(),
      POSTGRES_PASSWORD: z.string(),
      POSTGRES_DATABASE: z.string(),
      PORT: z.string().regex(/^\d+$/).transform(Number),
      MODE: z.enum(['development', 'production', 'test']),
      JWT_SECRET: z.string(),
      JWT_EXPIRATION_TIME: z.string(),
    });

    return envsSchema.parse(config);
  };

  get<T extends Leaves<EnvironmentVariables>>(
    propertyPath: T,
  ): LeafTypes<EnvironmentVariables, T> {
    return this.nestConfigService.get(propertyPath) as LeafTypes<
      EnvironmentVariables,
      T
    >;
  }
}
