import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';

@Component({
  //selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
pageTitle:string = 'Product Details';
product: IProduct | undefined;
  constructor( private router:ActivatedRoute,  private router2:Router) { }

  ngOnInit(): void {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.pageTitle += `:${id}`;
  }
  ngOnBack(): void {
    this.router2.navigate(['/products'])
  }
}
