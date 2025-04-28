import * as yup from 'yup';

export const cafeSchema = yup.object().shape({
  name: yup.string().min(6, 'Minimum 6 characters').max(10, 'Maximum 10 characters').required('Name is required'),
  description: yup.string().max(256, 'Maximum 256 characters'),
  location: yup.string().required('Location is required'),
  // TODO: Logo validation
});