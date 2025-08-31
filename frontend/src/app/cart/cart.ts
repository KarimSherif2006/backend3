import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CartComponent implements OnInit {
  cart: any = null;
  errorMessage = '';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cart = response;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load cart.';
        console.error('Failed to load cart', error);
      }
    });
  }

  getTotalPrice(): number {
    if (!this.cart || !this.cart.items) {
      return 0;
    }
    return this.cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }
}
