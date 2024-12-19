import mongoose, { Schema, model } from 'mongoose';
import Joi, { required } from 'joi';

export const coaSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    data: [
      {
        type: [Schema.Types.Mixed],
        required: true,
        validate: {
          validator: function (v) {
            const { error } = validateCOAData({ data: v, userId: this.userId, date: this.date });
            return !error;
          },
          message: (props) => {
            const { error } = validateCOAData({ data: props.value, userId: this.userId, date: this.date });
            return error?.details.map((err) => err.message).join(', ') || 'Invalid data structure.';
          },
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const validateCOAData = (obj) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    data: Joi.array()
      .items(
        Joi.array()
          .ordered(
            Joi.string().required(), 
            Joi.string().required(), 
            Joi.string().required()
          )
          .length(3) 
      )
      .required()
      .messages({
        'array.base': 'Data must be an array of arrays.',
        'array.includes': 'Each data entry must follow the structure: [String, String, Number, String].',
      }),
  }).options({ abortEarly: false }); // Return all validation errors

  return schema.validate(obj);
};
export const COA = model('COA', coaSchema);