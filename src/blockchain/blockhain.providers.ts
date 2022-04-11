import { AlchemyProvider } from '@ethersproject/providers';
import { EnvService } from 'src/types/env';
import { ConfigService } from '@nestjs/config';

export const blockchainProviders = [
  {
    provide: 'ALCHEMY_CONNECTION',
    inject: [ConfigService],
    useFactory: (envVariables: EnvService) =>
      new AlchemyProvider('mainnet', envVariables.get('ALCHEMY_KEY')),
  },
];
