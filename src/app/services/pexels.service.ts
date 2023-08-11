import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interfaces/response.interface';
import { Observable, map } from 'rxjs';
import { Images } from '../interfaces/images.interface';
import { ImageUrls } from '../interfaces/image-urls.interface';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class PexelsService {
  private readonly imgApiUrl: string = 'https://api.pexels.com/v1/search';
  private readonly videoApiUrl: string = 'https://api.pexels.com/videos/search';
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getImages(searchValue: string, page: number = 1): Observable<Response> {
    const options = {
      headers: new HttpHeaders().set(
        'Authorization',
        'LBUMvBf57nrMOj5FWcVQtscEjaSNBYGCUewe4uFgS1UOehKnDbgA3gvC'
      ),
    };

    return this.http
      .get<Response>(
        `${this.imgApiUrl}?query=${searchValue}&page=${page}`,
        options
      )
      .pipe(map((data) => this.processData(data)));
  }

  getVideos(searchValue: string, page: number = 1): Observable<Response> {
    const options = {
      headers: new HttpHeaders().set('Authorization', environment.apiKey),
    };

    return this.http
      .get<Response>(
        `${this.videoApiUrl}?query=${searchValue}&page=${page}`,
        options
      )
      .pipe(map((data) => this.processData(data)));
  }

  processData(response: Response): Response {
    return {
      page: response.page,
      per_page: response.per_page,
      photos: response.photos.map(
        (photo) =>
          <Images>{
            id: photo.id,
            photographer: photo.photographer,
            photographer_url: photo.photographer_url,
            photographer_id: photo.photographer_id,
            avg_color: photo.avg_color,
            src: <ImageUrls>{
              original: photo.src.original,
              large2x: photo.src.large2x,
              portrait: photo.src.portrait,
              landscape: photo.src.landscape,
            },
          }
      ),
      total_results: response.total_results,
      next_page: response.next_page,
    };
  }
}
