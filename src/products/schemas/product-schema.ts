import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Model } from './model-schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'Model', default: null })
  category: Model;

  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
