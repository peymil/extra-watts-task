import { Inject } from '@nestjs/common';
import { CHAIN_PROVIDER } from '../tokens';
export const InjectChainProvider = () => {
  return Inject(CHAIN_PROVIDER);
};
