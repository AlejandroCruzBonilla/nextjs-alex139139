import type {
  LinkJsonApiRef,
  Meta,
  Links,
  Metatag,
  Path,
} from './common';

export interface FieldTag {
  description: string | null;
  field_icon_class: string;
  id: string;
  links: Links;
  meta: Meta;
  metatag: Metatag[];
  name: string;
  path: Path;
  status: boolean;
  type: string;
}
