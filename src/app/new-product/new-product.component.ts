import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})

export class NewProductComponent implements OnInit{
   public productForm! : FormGroup;

  constructor(private fb : FormBuilder, private ps : ProductService) {
  }

  ngOnInit() {
    this.productForm = this.fb.group({ //creer structure de formulaire cad tous ce que je vais saisir dans formulaire sont stocker ici
      name : this.fb.control('', [Validators.required]),
      price : this.fb.control('', [Validators.required]),
      checked : this.fb.control(false, [Validators.required])
    });
  }



  saveProduct() {
    let product:Product = this.productForm.value;
    this.ps.saveProduct(product).subscribe({
      next : data => { alert(JSON.stringify(data)) },
      error : err => { console.log(err) }
    });
  }
}
