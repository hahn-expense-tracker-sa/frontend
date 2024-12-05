import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  imports: [CommonModule],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent {
  isVisible = false;  // Modal visibility flag

  @Output() deleteConfirmed = new EventEmitter<void>();  // Event emitter to notify the parent component
  @Output() deleteCancelled = new EventEmitter<void>();  // Event emitter for cancellation

  // Show the modal
  showModal(): void {
    this.isVisible = true;
  }

  // Hide the modal and emit deleteConfirmed
  confirmDelete(): void {
    this.deleteConfirmed.emit();
    this.isVisible = false;
  }

  // Hide the modal and emit deleteCancelled
  cancelDelete(): void {
    this.deleteCancelled.emit();
    this.isVisible = false;
  }
}
