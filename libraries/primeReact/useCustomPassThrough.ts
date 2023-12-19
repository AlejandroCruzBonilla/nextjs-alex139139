import { usePassThrough } from 'primereact/passthrough';
import Tailwind, { global, button, paginator } from './passthroughTailwind';

export const useCustomPassThrough = () => {
  const customPassThrough = usePassThrough(
    Tailwind,
    {
      global,
      button,
      paginator,
    },
    { mergeSections: false, mergeProps: false }
  );

  return {
    customPassThrough,
  };
};
