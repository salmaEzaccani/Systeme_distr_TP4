import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

 public products :Array<Product> =[];
 public keyword : string="";

  constructor(private ps:ProductService) { //injection des dependances
  }


//je vais envoyer une requeete HTTP vers le backend pour chercher des produits

  ngOnInit() {
    this.getProducts();   //je fais appel a cette methode
  }

  getProducts(){          //jai envoyer une requete asychrone au backend
    this.ps.getProducts()
        .subscribe({
          next : data => {this.products=data}
          //cad des une reponse arrive "data" je la stocker dans products
        })
  }

  handleCheckProduct(product: Product) {
    //ca c pour changer checked du backend aussi ca si je change dans frontend
    this.ps.checkProduct(product).subscribe({
      next :updatedProduct => { // la backend envoyer le produit qui a ete changer
        product.checked=!product.checked;  //et maintenat je modifie frontend
      }
    })

  }


  handleDelete(product: Product) {
    if(confirm("Etes vous sure?"))
this.ps.deleteProduct(product).subscribe({
   next:value => {
  // this.getProducts();   //pour maj le frontend
    this.products= this.products.filter(p=>p.id!=product.id);
  }
    })

  }

  searchProducts() {
    this.ps.searchProduct(this.keyword).subscribe({
          next : value => {
            this.products = value;
          }
        })
  }
}
