import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input() maxFiles = 6;
  @Output() filesChanged = new EventEmitter<File[]>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selected: File[] = [];

  openFilePicker() {
    this.fileInput.nativeElement.click();
  }

  onChooseFiles(event: any) {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    const availableSlots = this.maxFiles - this.selected.length;
    const count = Math.min(files.length, availableSlots);

    for (let i = 0; i < count; i++) {
      this.selected.push(files[i]);
    }

    this.filesChanged.emit(this.selected);
  }
}
