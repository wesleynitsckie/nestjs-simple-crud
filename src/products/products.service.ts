import { Product } from './products.model';
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ProductService {
    private products: Product[] = [];

    insertProduct(title:string, description:string, price:number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, description, price)
        this.products.push(newProduct);

        return prodId;
    }

    getProducts() {
        return [...this.products];
    }

    getProduct(productId: string){
        const product = this.findProduct(productId);
        return {...product}
    }

    updateProduct(productId: string, title:string, description:string, price:number){
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};
        if(title){
            updatedProduct.title = title;
        }

        if(description){
            updatedProduct.description = description;
        }

        if (price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;

    }

    deleteProduct(prodId: string){
        const [product, index] = this.findProduct(prodId);
        this.products.splice(index,1);
    }
    private findProduct(productId: string): [Product, number]{
        const productIndex = this.products.findIndex( (prod) => prod.id == productId);
        const product = this.products[productIndex];
        if (!product){
            throw new NotFoundException('Could not find product.');
        }
        
        return [product, productIndex];
    }

}