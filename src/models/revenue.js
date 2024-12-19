import mongoose, { Schema, model } from 'mongoose';
import Joi, { required } from 'joi';

export const revenueSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String, 
      required: true,
    },
    data: [
      {
        type: [Schema.Types.Mixed],
        required: true,
        validate: {
          validator: function (v) {
            const { error } = validateRevenueData({ data: v, userId: this.userId, date: this.date });
            return !error;
          },
          message: (props) => {
            const { error } = validateRevenueData({ data: props.value, userId: this.userId, date: this.date });
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

export const validateRevenueData = (obj) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    date: Joi.string().required(),
    data: Joi.array()
      .items(
        Joi.array()
          .ordered(
            Joi.string().required(), 
            Joi.string().required(), 
            Joi.number().required(),
            Joi.string().required()
          )
          .length(4) 
      )
      .required()
      .messages({
        'array.base': 'Data must be an array of arrays.',
        'array.includes': 'Each data entry must follow the structure: [String, String, Number, String].',
      }),
  }).options({ abortEarly: false }); // Return all validation errors

  return schema.validate(obj);
};
export const Revenue = model('Revenue', revenueSchema);