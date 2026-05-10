import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInParams, SignUpParams } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
imports: [MatIcon, MatIconButton, MatFormField, MatPrefix, MatInput, MatDialogClose, MatButton, ReactiveFormsModule],  template: ` 

    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign Up</h2>
          <p class="text-sm text-gray-500">Join us and start shopping today</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form [formGroup]="signUpForm" class="mt-6 flex flex-col" (ngSubmit)="signUp()">
        <mat-form-field class="mb-4">
          <input matInput formControlName="name" placeholder="Enter your name" />
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input matInput formControlName="email" placeholder="Enter your email" />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input matInput formControlName="password" placeholder="Enter your password" />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input matInput formControlName="confirmPassword" placeholder="Confirm your password" />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>               
        <button type="submit" matButton="filled" class="w-full"> Create Account </button>
      </form>
      <p class="text-sm text-gray-500 mt-2 text-center">
      Already have an account?
      <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()">Sign In</a>
    </p>
    </div>

  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);

  store = inject(EcommerceStore);
  data = inject<{checkout:boolean}>(MAT_DIALOG_DATA);
  matDialog = inject(MatDialog);
  dialogRef = inject(MatDialogRef);

  signUpForm = this.fb.group({
    name: ['John D', Validators.required],
    email: ['john.doe@example.com',Validators.required],
    password:['test123', Validators.required],
    confirmPassword:['test123', Validators.required]
  });

  signUp() {
    if(!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const {name, email, password} = this.signUpForm.value;

    this.store.signUp({ name, email, password, checkout:this.data?.checkout, dialogId:this.dialogRef.id} as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose:true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}
