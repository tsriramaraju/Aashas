import { UserDoc, UserModel, authType, userAttrs } from '@aashas/common';
import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    mobile: { type: String, unique: true, sparse: true },
    isAdmin: { type: Boolean, default: false },
    authType: {
      type: Number,
      enum: [
        authType.email,
        authType.facebook,
        authType.google,
        authType.mobile,
      ],
      required: true,
    },
    addresses: [
      {
        name: { type: String },
        house: { type: String },
        location: { type: String },
        street: { type: String },
        pin: { type: Number },
        city: { type: String },
        state: { type: String },
      },
    ],
    defaultAddress: {
      name: { type: String },
      house: { type: String },
      location: { type: String },
      street: { type: String },
      pin: { type: Number },
      city: { type: String },
      state: { type: String },
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'order' }],
    cart: [{ type: Schema.Types.ObjectId, ref: 'cart' }],
    favourites: [{ type: Schema.Types.ObjectId, ref: 'favourite' }],
    customProducts: [{ type: Schema.Types.ObjectId, ref: 'customProduct' }],
  },
  {
    autoIndex: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>('user', userSchema);

export { User };
