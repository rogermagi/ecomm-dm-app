import { Component, inject } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';
import { EcommerceStore } from '../../../ecommerce-store';
import { ShowCartItem } from '../../show-cart-item/show-cart-item';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-list-cart-items',
  imports: [ViewPanel, ShowCartItem, MatIcon],
  template: ` 
    <div appViewPanel> 
      <div class="flex items-center gap-3">
        <mat-icon>shopping_cart</mat-icon>
        <h2 class="text-2xl font-bold mb-4">Shopping Cart ({{store.cartCount()}})</h2>
      </div>
      <div class="flex flex-col gap-6">
        @for(item of store.cartItems(); track item.product.id) {
          <app-show-cart-item [item]="item" />
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class ListCartItems {
  store = inject(EcommerceStore);
}
