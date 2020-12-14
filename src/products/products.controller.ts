import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductService){}

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number
        ):any{
        const product = this.productService.insertProduct(
            prodTitle, 
            prodDescription, 
            prodPrice
        );
        return product
    }

    @Get()
    getProducts(){
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string){
        return this.productService.getProduct(prodId)
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number
        ){
            return this.productService.updateProduct(prodId, prodTitle, prodDescription, prodPrice)
        }

    @Delete(':id')
    removeProduct( @Param('id') prodId: string){
        return this.productService.deleteProduct(prodId);
    }
}
