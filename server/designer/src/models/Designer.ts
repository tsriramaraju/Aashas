import {
  DatabaseConnectionError,
  designerAttrs,
  DesignerDoc,
  DesignerModel,
} from '@aashas/common';
import { model, Schema } from 'mongoose';

const designerSchema = new Schema(
  {
    name: { required: true, type: String },
    email: { required: true, type: String },
    image: { required: true, type: String },
    bio: { required: true, type: String },
    mobile: { required: true, type: Number },
    blogs: [
      {
        title: String,
        image: String,
        content: String,
        slug: String,
      },
    ],
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

designerSchema.statics.build = (attrs: designerAttrs) => {
  return new Designer({ _id: attrs.id, ...attrs });
};

const Designer = model<DesignerDoc, DesignerModel>('designer', designerSchema);

Designer.on('index', function (err) {
  if (err) {
    throw new DatabaseConnectionError(err.message);
  }
});

export { Designer };
