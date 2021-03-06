import { UserDoc, UserModel, authType, userAttrs } from '@aashas/common';
import { model, Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    mobile: { type: String, unique: true, sparse: true },
    isAdmin: { type: Boolean, default: false },
    image: String,
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
      _id: { type: String, unique: true, sparse: true },
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
  }
);
userSchema.set('versionKey', 'version');
userSchema.plugin(updateIfCurrentPlugin);

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
  },
});

userSchema.statics.build = (attrs: userAttrs) => {
  return new User({ _id: attrs.id, ...attrs });
};
userSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return User.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

const User = model<UserDoc, UserModel>('user', userSchema);

export { User };
