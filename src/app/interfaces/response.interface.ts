import { Images } from './images.interface';

export interface Response {
  page: number;
  per_page: number;
  photos: Images[];
  total_results: number;
  next_page: string;
}
