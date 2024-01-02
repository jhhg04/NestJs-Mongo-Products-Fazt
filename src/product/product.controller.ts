import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException('Product not found');
    return res.status(HttpStatus.OK).json(product);
  }

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created',
      product: product,
    });
  }

  @Delete('/:productID')
  async deleteProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.deleteProduct(productID);
    if (!product) throw new NotFoundException('Product not found');
    return res.status(HttpStatus.OK).json(product);
  }

  @Put('/:productID')
  async updateProduct(
    @Res() res,
    @Param('productID') productID,
    @Body() body: any,
  ) {
    const product = await this.productService.updateProduct(productID, body);
    if (!product) throw new NotFoundException('Product not found');
    return res.status(HttpStatus.OK).json(product);
  }
}
