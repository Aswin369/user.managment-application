import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { userModel } from '../../../../model/signup.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { logout } from '../user.store/user.store.action';
import { UserService } from '../../../services/user.service';
import { getUser } from '../user.store/user.store.selector';
import { AuthState } from '../user.store/user.store.state';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user-profile',
  imports: [AsyncPipe, CommonModule, UserUpdateComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  user$!: Observable<userModel | null>;
  selectedImage: string | null = null;
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('profilePhoto', { static: false }) profilePhoto!: ElementRef;


  constructor(
    private store: Store<{ auth: AuthState }>,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(getUser);
  }

  onLogout() {
    this.store.dispatch(logout());
  }
  uploadError: string | null = null;
  async onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  this.uploadError = null; // reset previous errors

  // ✅ Validate file type (must be image)
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    this.uploadError = "Only image files (PNG, JPG, JPEG, WEBP) are allowed!";
    this.fileInput.nativeElement.value = '';
    return;
  }

  // ✅ Validate file size (max 2MB)
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    this.uploadError = "File too large! Max allowed size: 2MB.";
    this.fileInput.nativeElement.value = '';
    return;
  }

  // ✅ Show cropping modal if valid
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
  img.onload = () => {
    const scale = Math.max(size / img.width, size / img.height);
    const x = (size - img.width * scale) / 2;
    const y = (size - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    // ✅ Convert canvas → Blob file instead of base64
    canvas.toBlob((blob) => {
  if (!blob) return;

  const file = new File([blob], "profile.png", { type: "image/png" });

  // ✅ Updated here
  this.selectedImage = URL.createObjectURL(file);

  this.store.select(getUser).pipe(take(1)).subscribe(user => {
    if (!user) return;

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("image", file);

    this.userService.uploadImage(formData).subscribe({
      next: (res) => console.log("✅ Uploaded:", res),
      error: (err) => console.error("❌ Upload failed:", err)
    });
  });

  this.closeCropModal();
}, "image/png");
  };

  img.src = this.selectedImage!;
}


// edit function

howEdit: boolean = false;

showEditForm() {
  this.howEdit = true;
}

closeEditForm() {
  this.howEdit = false;
}

  h:string = "hello"

  @Input()home:string = "aswin"

  sendData(){
    this.h = "hi"
  }

}
