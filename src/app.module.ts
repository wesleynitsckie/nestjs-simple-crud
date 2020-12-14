import { ProductsModule } from './products/products.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule, 
    
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nest-simple-crud'
      )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
