

export const Validation = (values) => {
    
    const {personalInfo,experienceInfo} = values
    let errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex_only_numbers = /^\d+$/ // to check string contains only characters
    if (!personalInfo.fname) {
        errors.fname = "This Field is required";
    }

    if (!personalInfo.lname) {
        errors.lname = "This Field is required";
    }

    if (!personalInfo.address) {
        errors.address = "This Field is required";
    }

    if (!personalInfo.city) {
        errors.city = "This Field is required";
    }

    if (!personalInfo.zipcode) {
        errors.zipcode = "This Field is required";
    } else if (!regex_only_numbers.test(personalInfo.zipcode)) {
        errors.zipcode = "Invalid ZIP Code";
    }

    if (!personalInfo.email) {
        errors.email = "This Field is required";
    } else if (!regexEmail.test(personalInfo.email)) {
        errors.email = "email must be a valid email";
    }

    if (!personalInfo.phone) {
        errors.phone = "This Field is required";
    }else if(!regex_only_numbers.test(personalInfo.phone)){
        errors.phone = "Invalid phone number";
    } 
    else if (personalInfo.phone.length < 10){
        errors.phone = "phone must be at least 10 characters";
    }
    else if(personalInfo.phone.length > 10)  {
        errors.phone = "phone must be at most 10 characters";
    }

    //experience validation
    else if (!experienceInfo.employer) {
        errors.employer = "This Field is required";
    }
    else if (!experienceInfo.jobtitle) {
        errors.jobtitle = "This Field is required";
    }
    else if (!experienceInfo.state) {
        errors.state = "This Field is required";
    }
    else if (!experienceInfo.city) {
        errors.city = "This Field is required";
    }
    else if (!experienceInfo.startdate_month) {
        errors.startdate_month = "This Field is required";
    }
    else if (!experienceInfo.startdate_year) {
        errors.startdate_year = "This Field is required";
    }
    else if (!experienceInfo.job_description) {
        errors.job_description = "This Field is required";
    }


    return errors;
}