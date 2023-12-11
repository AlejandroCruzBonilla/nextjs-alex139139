import { usePassThrough } from 'primereact/passthrough';
import Tailwind from './passthroughTailwind';

export const CustomPassThrough = () => {
  return usePassThrough(
    Tailwind,
    {},
    { mergeSections: false, mergeProps: false }
  );
};
