import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }
  // findAll() {
  //   return this.productModel.find();
  // }

  async getProduct(productID: string): Promise<Product> {
    const product = await this.productModel.findById(productID);
    return product;
  }
  // async findOne(id: string) {
  //   return this.productModel.findById(id);
  // }

  async createProduct(createProductDTO: CreateProductDTO) {
    const product = new this.productModel(createProductDTO);
    return await product.save();
  }
  // async create(createTask: CreateProductDTO) {
  //   const newTask = new this.productModel(createTask);
  //   return newTask.save();
  // }

  async deleteProduct(productID: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productID);
    return deletedProduct;
  }
  // async delete(id: string) {
  //   return this.productModel.findByIdAndDelete(id);
  // }

  async updateProduct(
    id: string,
    updateProductDTO: UpdateProductDTO,
  ): Promise<Product> {
    const updatedProduct = this.productModel.findByIdAndUpdate(
      id,
      updateProductDTO,
      { new: true },
    );
    return updatedProduct;
  }
  // async update(id: string, task: UpdateTaskDto) {
  //   return this.productModel.findByIdAndUpdate(id, task, { new: true });
  // }
}
