import * as yup from 'yup';

const employeeSchema = yup.object().shape({
    name: yup
        .string()
        .min(6, 'Minimum 6 characters')
        .max(10, 'Maximum 10 characters')
        .required('Name is required'),

    emailAddress: yup
        .string()
        .email('Invalid email address')
        .required('Email address is required'),

    phoneNumber: yup
        .string()
        .matches(/^[89]\d{7}$/, 'Phone number must start with 8 or 9 and be 8 digits long')
        .required('Phone number is required'),

    cafeId: yup.string().required('Please select a cafe'),

});

export { employeeSchema };