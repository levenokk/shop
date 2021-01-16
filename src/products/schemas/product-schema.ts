import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../../category/schemas/category-schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  category: Category;

  @Prop(
    raw({
      src: { type: String },
      alt: { type: String },
    }),
  )
  image: Record<string, any>;

  @Prop({ default: true })
  newProduct: boolean;

  @Prop({ default: 0 })
  like: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
