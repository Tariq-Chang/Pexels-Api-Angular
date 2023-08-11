import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImgGalleryComponent } from './components/img-gallery/img-gallery.component';
import { VideoGalleryComponent } from './components/video-gallery/video-gallery.component';

const routes: Routes = [
  { path: '', component: ImgGalleryComponent },
  {
    path: 'videos',
    component: VideoGalleryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
