import type {
  LinkJsonApiRef,
  ResourceIDObjMeta,
  Links,
  Metatag,
  Path,
} from './common';

export interface FieldTag {
  type: string;
  id: string;
  status: boolean;
  description: string | null;
  metatag: Metatag[];
  name: string;
  path: Path;
  field_icon_class: string;
  links: Links;
  resourceIdObjMeta: ResourceIDObjMeta;
}
