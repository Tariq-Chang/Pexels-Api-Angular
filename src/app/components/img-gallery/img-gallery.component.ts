import { Component } from '@angular/core';
import { Images } from 'src/app/interfaces/images.interface';
import { Response } from 'src/app/interfaces/response.interface';
import { PexelsService } from 'src/app/services/pexels.service';

@Component({
  selector: 'app-img-gallery',
  templateUrl: './img-gallery.component.html',
  styleUrls: ['./img-gallery.component.css'],
})
export class ImgGalleryComponent {
  response: Response;
  photos: Images[];
  inputSearch: string = 'nature';
  page: number = 1;
  constructor(private dataService: PexelsService) {}

  ngOnInit() {
    this.dataService.getImages('nature').subscribe((data) => {
      this.response = data;
      this.photos = this.response.photos;
      console.log(this.response);
    });
  }
  handleInput(e: any) {
    this.inputSearch = e.target.value;
  }

  handleInputSearch(e: any) {
    e.preventDefault();
    this.dataService.getImages(this.inputSearch).subscribe((data) => {
      this.response = data;
      this.photos = this.response.photos;
    });
  }

  handleNextButton() {
    this.page++;
    this.dataService
      .getImages(this.inputSearch, this.page)
      .subscribe((data) => {
        this.response = data;
        this.photos = this.response.photos;
      });
  }

  handlePrevButton() {
    if (this.page > 1) this.page--;

    this.dataService
      .getImages(this.inputSearch, this.page)
      .subscribe((data) => {
        this.response = data;
        this.photos = this.response.photos;
      });
  }
}
