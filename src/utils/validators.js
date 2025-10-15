import * as yup from 'yup';

export const productSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().positive().required(),
  stock: yup.number().integer().min(0).required(),
  category: yup.string().required(),
  imageUrl: yup.string().url()
});

export const userSchema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  role: yup.string().oneOf(['user', 'admin'])
});

export const categorySchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required()
});
