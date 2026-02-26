import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrls:  ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private toastService   = inject(ToastService);
  private router         = inject(Router);

  products         = signal<Product[]>([]);
  categories       = signal<string[]>([]);
  loading          = signal(false);
  deleting         = signal<number | null>(null);
  showDeleteModal  = signal<Product | null>(null);

  search   = '';
  category = '';
  isActive = '';

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    const activeFilter = this.isActive === '' ? undefined : this.isActive === 'true';
    this.productService.getAll(this.search || undefined, this.category || undefined, activeFilter)
      .subscribe({
        next:  p => { this.products.set(p); this.loading.set(false); },
        error: () => { this.toastService.error('Failed to load products'); this.loading.set(false); }
      });
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: c => this.categories.set(c),
      error: () => {}
    });
  }

  editProduct(id: number)          { this.router.navigate(['/products/edit', id]); }
  addProduct()                     { this.router.navigate(['/products/create']); }
  confirmDelete(product: Product)  { this.showDeleteModal.set(product); }
  cancelDelete()                   { this.showDeleteModal.set(null); }

  deleteProduct() {
    const product = this.showDeleteModal();
    if (!product) return;
    this.deleting.set(product.id);
    this.productService.delete(product.id).subscribe({
      next: () => {
        this.toastService.success(`"${product.name}" deleted successfully`);
        this.showDeleteModal.set(null);
        this.deleting.set(null);
        this.loadProducts();
      },
      error: () => {
        this.toastService.error('Failed to delete product');
        this.deleting.set(null);
      }
    });
  }

  clearFilters() {
    this.search = '';
    this.category = '';
    this.isActive = '';
    this.loadProducts();
  }

  get totalValue():  number { return this.products().reduce((s, p) => s + p.price * p.stock, 0); }
  get activeCount(): number { return this.products().filter(p => p.isActive).length; }
  get lowStock():    number { return this.products().filter(p => p.stock < 10).length; }
}