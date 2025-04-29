export type EnvironmentVariables = {
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
  PORT: number;
  MODE: 'development' | 'production' | 'test';
  RUN_MIGRATIONS: boolean;
};
