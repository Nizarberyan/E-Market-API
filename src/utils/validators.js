const yup = require('yup');

const productSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().positive().required(),
  stock: yup.number().integer().min(0).required(),
  category: yup.string().required(),
  imageUrl: yup.string().url()
});

const userSchema = yup.object({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  role: yup.string().oneOf(['user', 'admin'])
});

const categorySchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required()
});

module.exports = { productSchema, userSchema, categorySchema };
