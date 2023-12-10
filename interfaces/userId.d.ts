import type { LinkJsonApiRef, ResourceIDObjMeta, Links } from './common';

export interface UserID {
  type: string;
  id: string;
  display_name: string;
  links: Links;
  resourceIdObjMeta: ResourceIDObjMeta;
}
