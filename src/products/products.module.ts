import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './products.service';
import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductSchema } from './products.model';


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Product', schema: ProductSchema}
        ])
    ],
    controllers: [ProductsController],
    providers: [ProductService],
})
export class ProductsModule{}