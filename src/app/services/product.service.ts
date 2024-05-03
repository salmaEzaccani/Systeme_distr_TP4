import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

    //tous les traitement de app la comm vec backend se fait dans services
    public getProducts():Observable<Array<Product>>{   // ca permet de chercher des prod du backend
      return this.http.get<Array<Product>>(`http://localhost:8089/products`);
    }
  //get post patch.. il renvois des requetes vers le backend et il sont pas bloquante c pour ca IL RETURN UN OBJET DE TYPE OBSERVABLE comme ca partie UI fait SUBSCRIBE vers observable
    public  checkProduct(product:Product):Observable<Product>{   //
      return     this.http.patch<Product>(`http://localhost:8089/products/${product.id}`,//handle c pour dire que je veux modifier juste un element et pas tous objet
        {checked:!product.checked});
    }

  public  deleteProduct(product:Product){   //il ya pas un return
    return     this.http.delete<any>(`http://localhost:8089/products/${product.id}`);//handle c pour dire que je veux modifier juste un element et pas tous objet
  }


  public saveProduct(product : Product) : Observable<Product> {
    return this.http.post<Product>(`http://localhost:8089/products`,product);//on vient denvoyer les donner
  }

  public searchProduct(keyword : string) : Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}`);
  }
}

