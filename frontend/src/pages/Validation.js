

const Validation = (values)=> {
    console.log("bbbbbbbbbbbbbbb")
    let errors= { };
    console.log(values);
    if(!values.fullname){
        errors.fullname="Name is required"
    }
    if(!/^[A-Za-z]*$/.test(values.fullname)){
        errors.fullname="name can't contain spaces and characters"
    }
    if(!values.email){
        errors.email="Email is required"
    }
    else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)){
        errors.email="email is invalid"

    }
    if(!values.phoneno){
        errors.phoneno="phone number is required"
    }else if((values.phoneno.length<10 || values.phoneno.length>10)){
        errors.phoneno="phone number must contain 10 digits"
    }
    if(!values.password1){
        errors.password="Password required"
    }
    if (!values.password2){
        errors.password2="password required"
    
    }
    if(!(values.password1===values.password2)){
        errors.password1="password did not match"
    }else if(values.password2.length <5){
        errors.password2="password must contain 6 characters"
    }

  return errors;
}

export default Validation