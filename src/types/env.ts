import { ConfigService } from '@nestjs/config';

export type EnvironmentVariables = {
  ALCHEMY_KEY: string;
};
export type EnvService = ConfigService<EnvironmentVariables>;
