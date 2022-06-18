import { style } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatWith, Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
 // selector: 'pm-products',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub! : Subscription 

  //listFilter : string = 'cart';

  private _listFilter: string = ' ';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter ' + value);
    this.filteredProducts = this.performFilter(value);

    console.log(this.filteredProducts);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = []; //

  constructor(private productService: ProductService) {}

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((p: IProduct) =>
      p.productName.toLocaleLowerCase().includes(filterBy)
    );
  }

  ngOnInit(): void {
    console.log('In OnInit');

    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err,
    });
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onRatingClicked(m: string): void {
    this.pageTitle = 'Product List' + m;
  }
}
