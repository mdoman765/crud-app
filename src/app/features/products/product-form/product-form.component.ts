import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ToastService }   from '../../../shared/services/toast.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls:  ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  private fb             = inject(FormBuilder);
  private productService = inject(ProductService);
  private toastService   = inject(ToastService);
  private router         = inject(Router);
  private route          = inject(ActivatedRoute);

  isEdit     = signal(false);
  loading    = signal(false);
  saving     = signal(false);
  editId     = signal<number | null>(null);
  categories = signal<string[]>([]);

  form = this.fb.group({
    name:        ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
    description: [''],
    price:       [0,   [Validators.required, Validators.min(0)]],
    category:    [''],
    stock:       [0,   [Validators.required, Validators.min(0)]],
    isActive:    [true],
    imageUrl:    ['']
  });

  ngOnInit() {
    this.productService.getCategories().subscribe({ next: c => this.categories.set(c) });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.editId.set(Number(id));
      this.loading.set(true);
      this.productService.getById(Number(id)).subscribe({
        next: p  => { this.form.patchValue(p as any); this.loading.set(false); },
        error: () => { this.toastService.error('Product not found'); this.router.navigate(['/products']); }
      });
    }
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const value = this.form.value as any;
    const obs   = this.isEdit()
      ? this.productService.update(this.editId()!, value)
      : this.productService.create(value);

    obs.subscribe({
      next:  () => { this.toastService.success(this.isEdit() ? 'Product updated!' : 'Product created!'); this.router.navigate(['/products']); },
      error: () => { this.toastService.error('Save failed. Please try again.'); this.saving.set(false); }
    });
  }

  cancel() { this.router.navigate(['/products']); }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && c?.touched);
  }

  get imagePreview(): string { return this.form.get('imageUrl')?.value || ''; }
}