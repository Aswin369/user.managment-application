import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userModel } from '../../../../model/signup.model';
import { getUser } from '../user.store/user.store.selector';
import { AsyncPipe } from '@angular/common';
import { logout } from '../user.store/user.store.action';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  imports: [AsyncPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  user$!: Observable<userModel | null>;
  selectedImage: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('profilePhoto') profilePhoto!: ElementRef<HTMLDivElement>;

  constructor(private http: HttpClient, private store: Store<{ user: userModel }>) {}

  ngOnInit() {
    this.user$ = this.store.select((state: any) => state.auth.user);
  }

  ngAfterViewInit() {
    console.log('✅ profilePhoto initialized:', this.profilePhoto);
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
      this.openCropModal();
    };
    reader.readAsDataURL(file);
  }

  openCropModal() {
    document.getElementById('cropModal')?.classList.add('active');
    const img = document.getElementById('cropImage') as HTMLImageElement;
    img.src = this.selectedImage!;
  }

  closeCropModal() {
    document.getElementById('cropModal')?.classList.remove('active');
    this.fileInput.nativeElement.value = '';
  }

  async saveCroppedImage() {
    if (!this.selectedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const size = 250;
    canvas.width = size;
    canvas.height = size;

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const img = new Image();
    img.onload = async () => {
      const scale = Math.max(size / img.width, size / img.height);
      const x = (size - img.width * scale) / 2;
      const y = (size - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      const croppedBase64 = canvas.toDataURL('image/png');
      (this.profilePhoto.nativeElement as HTMLElement).innerHTML = `<img src="${croppedBase64}" alt="Profile" />`;

      // ✅ Upload to Cloudinary
      try {
        const res = await this.http.post<any>('http://localhost:4000/user/upload-photo', {
          image: croppedBase64,
        }).toPromise();

        console.log('Uploaded Image URL:', res.imageUrl);
        alert('Photo uploaded successfully!');
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed');
      }

      this.closeCropModal();
    };
    img.src = this.selectedImage!;
  }

}
