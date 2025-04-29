import z from 'zod';

export const validate = (config: Record<string, unknown>) => {
  const envsSchema = z.object({
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z.string().regex(/^\d+$/).transform(Number),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DATABASE: z.string(),
    PORT: z.string().regex(/^\d+$/).transform(Number),
    MODE: z.enum(['development', 'production', 'test']),
    RUN_MIGRATIONS: z.string().transform((val) => val === 'true'),
  });

  return envsSchema.parse(config);
};
