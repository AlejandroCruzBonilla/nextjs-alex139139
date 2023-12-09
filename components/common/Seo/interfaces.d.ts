export interface SeoProps {
	metaTags: MetaTag[]
}

export interface MetaTag {
	tag:        string;
	attributes: Attributes;
}

export interface Attributes {
	name?:     string;
	content?:  string;
	rel?:      string;
	href?:     string;
	property?: string;
}
