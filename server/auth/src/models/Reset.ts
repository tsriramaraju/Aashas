import { resetAttrs, ResetDoc, ResetModel } from '@aashas/common';
import { Schema, model } from 'mongoose';

const resetSchema = new Schema(
  {
    uid: { type: String, required: true },
    email: { type: String, unique: true },
    date: { type: Date, default: Date.now(), expires: '15m' },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

resetSchema.statics.build = (attrs: resetAttrs) => {
  return new Reset(attrs);
};

const Reset = model<ResetDoc, ResetModel>('reset', resetSchema);

export { Reset };
