import { ON_DECORATOR_METADATA_KEY } from './on.constant';
import { SetMetadata } from '@nestjs/common';
import { EventType } from '@ethersproject/providers';

export const on = (event: EventType): MethodDecorator => {
  return SetMetadata(ON_DECORATOR_METADATA_KEY, { event });
};
