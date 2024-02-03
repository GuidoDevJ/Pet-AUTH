/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Auth {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  userId: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth).set('toJSON', {
  transform: (_, ret) => {
    // Eliminar el campo _id del objeto retornado
    delete ret._id;
    delete ret.password;
  },
});
