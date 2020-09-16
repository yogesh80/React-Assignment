const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const regularExpression = RegExp(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
  );
  
  //For get error all messages on chane fields
  function getErrorMessages(formErrors, name, value) {
    switch (name) {
        case "firstName":
            formErrors.firstName =
            value.length < 3 ? "*minimum 3 characters required" : "";
        break;
        case "lastName":
            formErrors.lastName =
            value.length < 3 ? "*minimum 3 characters required" : "";
        break;
        case "address":
            formErrors.address =
            value.length === 0 ? "*Please enter yur address" : "";
        break;
        case "email":
            formErrors.email = emailRegex.test(value) ? "" : "*invalid email address";
        break;
        case "phoneNumber":
            formErrors.phoneNumber = value.length < 10 ? "*minimum 10 characaters required" : "";
        break;
        case "role":
            formErrors.role = value.length < 1 ? "*Please select a role" : "";
        break;
        case "password":
            if (value.length < 8) {
                formErrors.password = "*minimum 8 characaters required";
            } else
                formErrors.password = regularExpression.test(value)
                ? ""
                : "*required symbol, upper and lower case letters and a number ";
        break;
        default:
        break;
    }
    return formErrors;
  }
  
  //For check form valid or not
  function formValid({ formErrors, formValue }) {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(formValue).forEach((val) => {
      val === "" && (valid = false);
    });
    return valid;
  }
  
  //For get error all messages on click button not on change fields
  function getallErrors(state) {
    let errors = state.formErrors;
    if (errors.firstName === "" && state.formValue.firstName.length < 3) {
      errors.firstName = "*minimum 3 characaters required";
    }
    if (errors.lastName === "" && state.formValue.lastName.length < 3) {
      errors.lastName = "*minimum 3 characaters required";
    }
    if (errors.address === "" && state.formValue.address.length < 10) {
        errors.address = "*Please enter your address";
      }
    if (errors.email === "" && !emailRegex.test(state.formValue.email)) {
      errors.email = "*invalid email address";
    }
    if (errors.password === "" && state.formValue.password.length <= 8) {
      errors.password = "*minimum 8 characaters required";
    }
    if (errors.role === "") {
      errors.role = "*Please select a role";
    }
    if (errors.phoneNumber === "" && state.formValue.phoneNumber.length < 10) {
      errors.phoneNumber = "*minimum 10 characaters required";
    }
    return errors;
  }
  
  export { getErrorMessages, formValid, getallErrors };
  