import { Component, computed, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { ViewPanel } from "../../directives/view-panel";
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel,MatButton,MatIcon],
  template: ` 
  <div appViewPanel>
    <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
    <div class="space-y-3 text-lg pt-4 border-t">
      <div class="flex justify-between">
        <span>Subtotal</span>
        <span>\$ {{ subtotal() }}</span>
      </div>
      <div class="flex justify-between">
        <span>Tax</span>
        <span>\$ {{ tax() }}</span>
      </div>
      <div class="flex justify-between border-t pt-3 font-bold text-lg">
        <span>Total</span>
        <span>\$ {{ total() }}</span>
      </div>
    </div>
    <div class="flex flex-col items-center mt-[10px]">
      <button matButton = "filled" class="flex ml_auto gap-2">
         Proceed to Checkout
         <mat-icon>arrow_right</mat-icon>
      </button>
    </div>
  </div>
  `,
  styles: ``,
})
export class SummarizeOrder {
  store = inject(EcommerceStore);

  subtotal = computed(()=> 
    Math.round(this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0))
);

  tax = computed(() => Math.round(0.13 * this.subtotal()));

  total = computed(() => this.subtotal() - this.tax());
}
