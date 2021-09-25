import * as Yup from "yup";

export const formValidationData={
    fname:'',
    lname:'',
    address:'',
    email:'',
    city:'',
    zipcode:'',
    country:'',
    phone:'',

    employer:'',
    jobtitle:'',
    city:'',
    state:'',
    startdate_month:'',
    startdate_year:'',
    enddate_month:'',
    enddate_year:'',
    job_description:'',

    schoolname:'',
    city:'',
    state:'',
    degree:'',
    graduation_month:'',
    graduation_year:'',
    field_of_study:'',

    summary:''
}
const regex_only_numbers = /^\d+$/ 

export const schema={
    fname: Yup.string().required('This Field is required'),
    lname: Yup.string().required('This Field is required'),
    address: Yup.string().required('This Field is required'),
    city:Yup.string().required('This Field is required'),
    zipcode:Yup.string().matches(regex_only_numbers, 'Invalid ZIP Code').required('This Field is required'),
    email: Yup.string().email().required('This Field is required'),  
    phone:Yup.string().matches(regex_only_numbers, 'Invalid phone number').required('This Field is required').min(10).max(10),

    employer:Yup.string().required('This Field is required'),
    jobtitle:Yup.string().required('This Field is required'),
    // city:Yup.string().required('This Field is required'),
    state:Yup.string().required('This Field is required'),
    startdate_month:Yup.string().required('This Field is required'),
    startdate_year:Yup.string().required('This Field is required'),
    job_description:Yup.string().required('This Field is required'),

    schoolname:Yup.string().required('This Field is required'),
    // city:Yup.string().required('This Field is required'),
    // state:Yup.string().required('This Field is required'),
    degree:Yup.string().required('This Field is required'),
    field_of_study:Yup.string().required('This Field is required'),

    summary:Yup.string().required('This Field is required'),
}

