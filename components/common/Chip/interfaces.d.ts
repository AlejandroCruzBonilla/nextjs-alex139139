import type { HTMLAttributes } from 'react';

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
	icon?: string;
	name?: string;
	button?: boolean;
	disabled?: boolean;
}