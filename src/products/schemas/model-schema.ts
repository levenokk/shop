import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from './product-schema';

export type ModelDocument = Model & Document;

@Schema()
export class Model {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  items: Product[];
}

export const ModelSchema = SchemaFactory.createForClass(Model);
