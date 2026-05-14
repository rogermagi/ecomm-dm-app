import { computed, inject } from "@angular/core";
import { Product } from "./models/product";
import { CartItem } from "./models/cart-item";
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from "@ngrx/signals"
import {produce} from "immer";
import { Toaster } from "./services/toaster";
import { MatDialog } from "@angular/material/dialog";
import { Dialog } from "@angular/cdk/dialog";
import { SignInDialog } from "./components/sign-in-dialog/sign-in-dialog";
import { SignInParams, SignUpParams } from "./models/user";
import { User } from "./models/user";
import { Router } from "@angular/router";
import { Order } from "./models/order";
import { withStorageSync} from '@angular-architects/ngrx-toolkit'

export type EcommerceState = {
    products: Product[];
    category: string;
    wishlistItems: Product[];
    cartItems: CartItem[];
    user: User | undefined;
    loading: boolean;
    selectedProductId: string | undefined;
}

export const EcommerceStore = signalStore(
    {
        providedIn: 'root',
    },
    withState({
        products: [
            {
                id: 'P001',
                name: 'Wireless Headphones',
                description: 'Noise-cancelling over-ear wireless headphones with long battery life.',
                price: 149.99,
                imageUrl: 'https://m.media-amazon.com/images/I/71NDLYRh5NL._AC_SX425_.jpg',
                rating: '4.5',
                reviewCount: 120,
                inStock: true,
                category: 'Electronics'
            },
            {
                id: 'P002',
                name: 'Smart Watch',
                description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
                price: 199.99,
                imageUrl: 'https://m.media-amazon.com/images/I/613Wp+zE4qL._AC_SL1280_.jpg',
                rating: '4.3',
                reviewCount: 85,
                inStock: true,
                category: 'Wearables'
            },
            {
                id: 'P003',
                name: 'Gaming Mouse',
                description: 'Ergonomic gaming mouse with customizable DPI and RGB lighting.',
                price: 59.99,
                imageUrl: 'https://m.media-amazon.com/images/I/61BJ2MpgTTL._AC_SY300_SX300_QL70_ML2_.jpg',
                rating: '4.6',
                reviewCount: 210,
                inStock: true,
                category: 'Accessories'
            },
            {
                id: 'P004',
                name: 'Mechanical Keyboard',
                description: 'Backlit mechanical keyboard with blue switches for tactile feedback.',
                price: 89.99,
                imageUrl: 'https://m.media-amazon.com/images/I/71T1WQSxp9L._AC_SY300_SX300_QL70_ML2_.jpg',
                rating: '4.7',
                reviewCount: 150,
                inStock: false,
                category: 'Accessories'
            },
            {
                id: 'P005',
                name: '4K Monitor',
                description: 'Ultra HD 27-inch monitor with vibrant colors and slim design.',
                price: 329.99,
                imageUrl: 'https://m.media-amazon.com/images/I/81tizzS173L._AC_SX425_.jpg',
                rating: '4.4',
                reviewCount: 95,
                inStock: true,
                category: 'Electronics'
            },
            {
                id: 'P006',
                name: 'Bluetooth Speaker',
                description: 'Portable waterproof speaker with deep bass and long battery life.',
                price: 79.99,
                imageUrl: 'https://m.media-amazon.com/images/I/81GCkvM2mIL._AC_SY300_SX300_QL70_ML2_.jpg',
                rating: '4.2',
                reviewCount: 60,
                inStock: true,
                category: 'Eletronics'
            },
            {
                id: 'P007',
                name: 'Laptop Backpack',
                description: 'Durable backpack with padded laptop compartment and USB charging port.',
                price: 49.99,
                imageUrl: 'https://m.media-amazon.com/images/I/61REyoHffML._AC_SY300_SX300_QL70_ML2_.jpg',
                rating: '4.5',
                reviewCount: 110,
                inStock: true,
                category: 'Accessories'
            },
            {
                id: 'P008',
                name: 'Smartphone Stand',
                description: 'Adjustable aluminum stand for smartphones and tablets.',
                price: 19.99,
                imageUrl: 'https://m.media-amazon.com/images/I/61srjyM7TFL._AC_SX679_.jpg',
                rating: '4.1',
                reviewCount: 40,
                inStock: true,
                category: 'Accessories'
            },
            {
                id: 'P009',
                name: 'External SSD 1TB',
                description: 'High-speed portable SSD with USB-C connectivity.',
                price: 139.99,
                imageUrl: 'https://m.media-amazon.com/images/I/91YfRIy7kYL._AC_SX679_.jpg',
                rating: '4.8',
                reviewCount: 175,
                inStock: false,
                category: 'Electronics'
            },
            {
                id: 'P010',
                name: 'Fitness Tracker',
                description: 'Lightweight fitness tracker with sleep and activity monitoring.',
                price: 69.99,
                imageUrl: 'https://m.media-amazon.com/images/I/619lzWYApAL._AC_SX425_.jpg',
                rating: '4.0',
                reviewCount: 55,
                inStock: true,
                category: 'Wearables'
            },
            {
                id: "P011",
                name: "Classic Cotton T-Shirt",
                description: "Soft, breathable cotton t-shirt with a modern fit. იდეal for everyday wear.",
                price: 19.99,
                imageUrl: "https://m.media-amazon.com/images/I/81tpGc13OgL._AC_SX679_.jpg",
                rating: "4.5",
                reviewCount: 128,
                inStock: true,
                category: "clothing",
            },
            {
                id: "P012",
                name: "Slim Fit Denim Jeans",
                description: "Durable denim jeans with a slim fit design and slight stretch for comfort.",
                price: 49.99,
                imageUrl: "https://m.media-amazon.com/images/I/6124bm41NuL._AC_SX569_.jpg",
                rating: "4.3",
                reviewCount: 89,
                inStock: true,
                category: "clothing",
            },
            {
                id: "P013",
                name: "Lightweight Hoodie",
                description: "Cozy lightweight hoodie perfect for layering during cooler days.",
                price: 39.99,
                imageUrl: "https://m.media-amazon.com/images/I/51pY6FO3POL._AC_SX679_.jpg",
                rating: "4.7",
                reviewCount: 156,
                inStock: false,
                category: "clothing",
            },
            {
                id: "P014",
                name: "Ceramic Table Lamp",
                description: "Minimalist ceramic lamp with a linen shade, ideal for bedside or desk lighting.",
                price: 34.99,
                imageUrl: "https://m.media-amazon.com/images/I/714t7w1dZVL._AC_SX679_.jpg",
                rating: "4.6",
                reviewCount: 64,
                inStock: true,
                category: "home",
            },
            {
                id: "P015",
                name: "Memory Foam Pillow",
                description: "Ergonomic memory foam pillow designed for optimal neck and head support.",
                price: 29.99,
                imageUrl: "https://m.media-amazon.com/images/I/61E0XwfzJZL._AC_SY300_SX300_QL70_ML2_.jpg",
                rating: "4.4",
                reviewCount: 210,
                inStock: true,
                category: "home",
            },
            {
                id: "P016",
                name: "Woven Storage Basket",
                description: "Handwoven basket perfect for organizing blankets, toys, or laundry.",
                price: 24.99,
                imageUrl: "https://m.media-amazon.com/images/I/71XRZINoY1L._AC_SY300_SX300_QL70_ML2_.jpg",
                rating: "4.2",
                reviewCount: 47,
                inStock: false,
                category: "home",
            }
        ],
        category: "all",
        wishlistItems: [],
        cartItems: [],
        user: undefined,
        loading: false,
        selectedProductId: undefined,
    } as EcommerceState),
    withStorageSync({ key: 'ecommerce-store', select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user})}),
    withComputed(({category, products, wishlistItems, cartItems, selectedProductId}) => ({
        filteredProducts: computed(()=> {
            if(category()==='all') return products();
            
            return products().filter(p => p.category.toLocaleLowerCase() === category().toLocaleLowerCase())            
        }),
        wishlistCount: computed(() => wishlistItems().length),
        cartCount: computed(() => cartItems().reduce((acc,item) => acc + item.quantity, 0)),
        selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())),
    })),
    withMethods((store, toaster=inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
        setCategory: signalMethod<string>((category: string) => {
            patchState(store, { category });
        }),
        setProductId: signalMethod<string>((productId: string) => {
            patchState(store, { selectedProductId: productId });
        }),
        addToWishlist: (product: Product) => { 
            const updatedWishlist = produce(store.wishlistItems(), (draft) => {
                if(!draft.find(p => p.id === product.id)){
                    draft.push(product);
                }
            });
            patchState(store, {wishlistItems: updatedWishlist});
            toaster.success("Product added to wishlist");  
        },
        removeFromWishlist: (product: Product) => {
            patchState(store, {
                wishlistItems: store.wishlistItems().filter(p=>p.id!==product.id),
            });
            toaster.success("Product removed from wishlist");
        },
        clearWishlist: () => {
            patchState(store, {wishlistItems: []})
        },
        addToCart: (product:Product, quantity=1) => {
            const existingItemIndex = store.cartItems().findIndex(p=>p.product.id===product.id);

            const updatedCartItems = produce(store.cartItems(), (draft) => {
                if(existingItemIndex !== -1) {
                    draft[existingItemIndex].quantity+=quantity;
                    return;
                }
                draft.push({product, quantity});
            });
            patchState(store, {cartItems: updatedCartItems});
            toaster.success(existingItemIndex !==-1 ? 'Product added again': 'Product added to the cart');
        },
        setItemQuantity(params: {productId: string, quantity: number}) {
            const index = store.cartItems().findIndex(c=> c.product.id === params.productId);
            const updated = produce(store.cartItems(), (draft) => {
                draft[index].quantity=params.quantity;
            });
            patchState(store,{cartItems:updated});
        },
        addAllWishlistToCart: () => {
            const updatedCartItems = produce(store.cartItems(), (draft)=> {
                store.wishlistItems().forEach(p => {
                    if(!draft.find(c => c.product.id === p.id)){
                        draft.push({product: p, quantity: 1});
                    }
                })
            });

            patchState(store, {cartItems:updatedCartItems, wishlistItems: [] })
        },
        moveToWishlist: (product:Product) => {
            const updatedCartItems = store.cartItems().filter(p => p.product.id !== product.id);
            const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
                if(!draft.find(p=> p.id === product.id)) {
                    draft.push(product);
                }
            });
            patchState(store, {cartItems: updatedCartItems, wishlistItems: updatedWishlistItems});
        },
        removeFromCart: (product: Product) => {
            patchState(store, {
                cartItems: store.cartItems().filter(c => c.product.id !== product.id),
            });
        },
        proceedToCheckout: () => {
            if(!store.user()) {
                matDialog.open(SignInDialog, {
                    disableClose: true,
                    data: {
                        checkout: true
                    }
                });   
                return;         
            }
            router.navigate(['/checkout']);
            
        },
        placeOrder: async () => {
            patchState(store, {loading:true});

            const user = store.user();

            if(!user){
                toaster.error('Please login before placing order');
                patchState(store, {loading:false});
                return;
            }

            const order: Order = {
                    id: crypto.randomUUID(),
                    userId: user.id,
                    total: Math.round(store.cartItems().reduce((acc,curr)=>(acc + curr.quantity * curr.product.price), 0)),
                    items: store.cartItems(),
                    paymentStatus: 'success',
            };
            await new Promise((resolve) => setTimeout(resolve, 1000));

            patchState(store, { loading: false, cartItems:[] });
            router.navigate(['order-success']);
        },
        signIn: ({email, password, checkout, dialogId}: SignInParams) => {
            patchState(store, {
                user: {
                    id:'1',
                    email,
                    name: 'John Doe',
                    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
                },
            });
            matDialog.getDialogById(dialogId)?.close();

            if(checkout) {
                router.navigate(['/checkout']);
            }
        },
        signUp: ({email, password, name, checkout, dialogId}: SignUpParams) => {
            patchState(store, {
                user: {
                    id:'1',
                    email,
                    name: 'John Doe',
                    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
                },
            });
            matDialog.getDialogById(dialogId)?.close();

            if(checkout) {
                router.navigate(['/checkout']);
            }
        },
        signOut: () => {
            patchState(store, {user:undefined});
        }
    }))
);
