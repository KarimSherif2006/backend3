import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  errorMessage = '';
  selectedOptions: { [productId: string]: { color: string; size: string } } = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        // Initialize selected options for each product
        this.products.forEach(p => {
          this.selectedOptions[p._id] = {
            color: p.colors[0],
            size: p.sizes[0]
          };
        });
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products.';
        console.error('Failed to load products', error);
      }
    });
  }

  addToCart(product: any): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return;
    }

    const selected = this.selectedOptions[product._id];
    if (!selected || !selected.color || !selected.size) {
      alert('Please select a color and size.');
      return;
    }

    const item = {
      productId: product._id,
      quantity: 1,
      size: selected.size,
      color: selected.color
    };

    this.cartService.addToCart(item).subscribe({
      next: () => {
        alert(`${product.name} added to cart!`);
      },
      error: (error) => {
        this.errorMessage = 'Failed to add item to cart.';
        console.error('Failed to add to cart', error);
      }
    });
  }
}
