export interface FieldMediaImage {
	type:              string;
	id:                string;
	filename:          string;
	uri:               URI;
	filemime:          string;
	links:             Links;
	resourceIdObjMeta: ResourceIDObjMeta;
}

export interface Links {
	"1024_large":     MediaStyle;
	"1280_x_large":   MediaStyle;
	"1440_2x_large":  MediaStyle;
	"480_x_small":    MediaStyle;
	"640_small":      MediaStyle;
	"768_medium":     MediaStyle;
	describedby:      MediaJsonApiRef;
	self:             MediaJsonApiRef;
	thumbnail:        MediaStyle;
	thumbnail_large:  MediaStyle;
	thumbnail_medium: MediaStyle;
}

export interface MediaStyle {
	href: string;
	meta: MediaStyleMeta;
}

export interface MediaStyleMeta {
	linkParams: LinkParams;
	rel:        string[];
}

export interface LinkParams {
	width:  string;
	height: string;
	rel:    string[];
}

export interface MediaJsonApiRef {
	href: string;
}

export interface ResourceIDObjMeta {
	alt:                        string;
	title:                      string;
	width:                      number;
	height:                     number;
	drupal_internal__target_id: number;
	imageDerivatives:           ImageDerivatives;
}

export interface ImageDerivatives {
	links: { [key: string]: Link };
}

export interface Link {
	href:  string;
	title: string;
	meta:  LinkMeta;
	rel:   string;
}

export interface LinkMeta {
	rel: string;
}

export interface URI {
	value: string;
	url:   string;
}
