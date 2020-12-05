import { Schema, model, Types } from 'mongoose';
import { resetAttrs, ResetDoc, ResetModel } from '@aashas/common';

const resetSchema = new Schema(
  {
    uid: { type: Types.ObjectId, required: true },
    email: { type: String, unique: true },
    date: { type: String, default: Date.now().toString(), expires: '15m' },
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
