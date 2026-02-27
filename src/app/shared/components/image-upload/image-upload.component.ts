import {
  Component, inject, Input, Output,
  EventEmitter, OnInit, signal, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { UploadService } from '../../../core/services/upload.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.component.html',   // ✅ relative path
  styleUrls:  ['./image-upload.component.scss']   // ✅ relative path
})
export class ImageUploadComponent implements OnInit, OnDestroy {
  private uploadService = inject(UploadService);

  @Input() currentUrl = '';
  @Output() urlChanged = new EventEmitter<string>();

  previewUrl = signal('');
  uploading  = signal(false);
  progress   = signal(0);
  error      = signal('');
  isDragging = signal(false);

  ngOnInit() {
    if (this.currentUrl) {
      this.previewUrl.set(this.currentUrl);
    }
  }

  ngOnDestroy() {
    const url = this.previewUrl();
    if (url.startsWith('blob:')) URL.revokeObjectURL(url);
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging.set(false);
    const file = e.dataTransfer?.files[0];
    if (file) this.processFile(file);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0];
    if (file) this.processFile(file);
    input.value = '';
  }

  processFile(file: File) {
    this.error.set('');

    const allowed = ['image/jpeg','image/jpg','image/png','image/webp','image/gif'];
    if (!allowed.includes(file.type)) {
      this.error.set('Only JPG, PNG, WEBP or GIF images are accepted.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.error.set('Image must be smaller than 5 MB.');
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    this.previewUrl.set(blobUrl);
    this.uploading.set(true);
    this.progress.set(0);

    this.uploadService.upload(file).subscribe({
      next: event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress.set(Math.round(100 * event.loaded / event.total));
        }
        if (event.type === HttpEventType.Response) {
          const serverUrl = event.body?.url ?? '';
          URL.revokeObjectURL(blobUrl);
          this.previewUrl.set(serverUrl);
          this.uploading.set(false);
          this.progress.set(100);
          this.urlChanged.emit(serverUrl);
        }
      },
      error: (err) => {
        const msg = err?.error?.error ?? 'Upload failed. Please try again.';
        this.error.set(msg);
        this.uploading.set(false);
        this.previewUrl.set('');
        URL.revokeObjectURL(blobUrl);
      }
    });
  }

  removeImage() {
    const url = this.previewUrl();
    if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    this.previewUrl.set('');
    this.error.set('');
    this.uploading.set(false);
    this.progress.set(0);
    this.urlChanged.emit('');
  }
}