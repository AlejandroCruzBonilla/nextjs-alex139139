import { usePassThrough } from 'primereact/passthrough';
import Tailwind, { global, button } from './passthroughTailwind';

export const useCustomPassThrough = () => {
  const customPassThrough = usePassThrough(
    Tailwind,
    {
      global,
      button
    },
    { mergeSections: false, mergeProps: false }
  );

  return {
    customPassThrough,
  };
};
