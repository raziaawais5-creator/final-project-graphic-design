export type ProjectTab = 
  | 'overview' 
  | 'photoshop-poster' 
  | 'pen-tool-retouch' 
  | 'illustrator-identity' 
  | 'stationery-mockups' 
  | 'behance-portfolio' 
  | 'submission-package';

export interface LayerItem {
  id: string;
  name: string;
  type: 'image' | 'vector' | 'text' | 'adjustment' | 'folder' | 'mask';
  blendMode: string;
  opacity: number;
  visible: boolean;
  hasMask?: boolean;
  maskType?: 'layer-mask' | 'clipping-mask';
  children?: LayerItem[];
  colorTag?: string;
  description?: string;
}

export interface ColorSwatch {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  cmyk: string;
  pantone: string;
  lightText?: boolean;
}

export interface FontSpec {
  role: string;
  fontFamily: string;
  weights: string[];
  sampleText: string;
  usage: string;
}

export interface RubricItem {
  id: string;
  section: string;
  criterion: string;
  weightLabel: string;
  evidence: string;
  status: 'completed' | 'in-review';
}

export interface SubmissionFileItem {
  id: string;
  folder: string;
  fileName: string;
  fileType: string;
  sizeLabel: string;
  description: string;
  downloadUrl: string;
  previewType: string;
  previewUrl?: string;
  specificationTag: string;
}
