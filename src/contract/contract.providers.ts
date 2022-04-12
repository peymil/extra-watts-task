import { AlchemyProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import USDT_ABI from 'src/ABIS/USDT';
import { USDT_CONTRACT } from './tokens';
import { ALCHEMY_CONNECTION } from 'src/blockchain/tokens';

export const contractProviders = [
  {
    provide: USDT_CONTRACT,
    inject: [ALCHEMY_CONNECTION],
    useFactory: (alchemyConnection: AlchemyProvider) =>
      new Contract(
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        USDT_ABI,
        alchemyConnection,
      ),
  },
];
