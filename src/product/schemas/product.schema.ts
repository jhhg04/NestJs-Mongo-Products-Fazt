import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ requied: true })
  name: String;

  @Prop({ trim: true })
  description: String;

  @Prop({ trim: true })
  imageURL: String;

  @Prop({ requied: true })
  price: Number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
