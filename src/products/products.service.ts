import { Product } from './products.model';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    
    constructor(
        @InjectModel('Product') private readonly productModel: Model <Product>
        )  {}
    
    async insertProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({
            title, 
            description, 
            price
        })

        const result =  await newProduct.save();
        return result;
    }

    async getProducts() {
        return await this.productModel.find().exec()
    }

    async getProduct(productId: string){
        const product = await this.findProduct(productId);
        return product;
    }

    async updateProduct(productId: string, title:string, description:string, price:number){
        const updatedProduct = await this.findProduct(productId);
        if(title){
            updatedProduct.title = title;
        }

        if(description){
            updatedProduct.description = description;
        }

        if (price){
            updatedProduct.price = price;
        }

        updatedProduct.save();
        return updatedProduct;

    }

    async deleteProduct(prodId: string){
        const result = await this.productModel.deleteOne({ _id: prodId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find product.');
        }
        return true;
    }

    private async findProduct(productId: string): Promise<Product>{
        let book;
        try {
            book = await this.productModel.findById(productId).exec();
        } catch (error) {
            throw new NotFoundException('Could not find product.');
        }

        if (!book) {
            throw new NotFoundException('Could not find product.');
        }

        return book;
    }

}