import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../../category/schemas/category-schema';

export type ProductDocument = Product & Document;

type ImageType ={
  src: string;
  alt: string;
}

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  category: Category;

  @Prop([
    raw({
      src: { type: String },
      alt: { type: String },
    }),
  ])
  images: Record<string, any>[];

  @Prop(
    raw({
      src: { type: String },
      alt: { type: String },
    }),
  )
  activeImage: Record<string, any>;

  @Prop(
    raw({
      src: {
        type: String,
      },
      alt: {
        type: String,
      },
    }),
  )
  backetImg: Record<string, any>;

  @Prop({ default: true })
  newProduct: boolean;

  @Prop({ default: 0 })
  like: number;

  @Prop({ required: true })
  sizes: number[];

  @Prop({ required: true })
  information: string;

  @Prop({ required: true })
  careDetail: string;

  @Prop({ required: true })
  delivery: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: true })
  have: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
