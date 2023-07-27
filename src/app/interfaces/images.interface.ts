import { ImageUrls } from './image-urls.interface';

export interface Images {
  id?: number;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: ImageUrls;
  liked: boolean;
  alt: string;
}
