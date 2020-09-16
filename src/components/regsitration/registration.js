import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { PostApiAction } from "../../constfunctions/apiaction";
import { formValid, getallErrors, getErrorMessages } from "../../constfunctions/formvalidations";
import Loader from "../loader/loader";
import {login} from "../../redux/action/index"

class Registration extends React.Component {
    constructor(){
        super()
        this.state = {
            formValue:{
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
                address:"",
                role: ""
            },
            formErrors:{
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
                address:"",
                role: ""
            },
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        if(localStorage.getItem("token")){
            this.props.history.push("/")
        }
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            formValue: {
                ...this.state.formValue,
                [name]:value}
        });
        let formErrors = { ...this.state.formErrors };
        formErrors = getErrorMessages(formErrors, name, value);
        this.setState({ formErrors: formErrors });
    }

    //Submit Handler for form
  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
        let obj = {
                firstName: this.state.formValue.firstName,
                lastName: this.state.formValue.lastName,
                email: this.state.formValue.email,
                phoneNumber: this.state.formValue.phoneNumber,
                password: this.state.formValue.password,
                address:this.state.formValue.address,
                role: this.state.formValue.role
        };
        this.setState({
            loading: true,
        });
        PostApiAction("user/register", obj)
        .then((res) => {
          this.setState({
            loading: false,
          });
          this.props.login(true);
          toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
          localStorage.setItem("token", res.data.token);
          this.props.history.push("/home");
        })
        .catch((err) => {
            this.setState({
                loading: false,
              });
          this.props.login(false);
          console.log("erorr", err);
        });
    } else {
        let errors = getallErrors(this.state);
        this.setState({ formErrors: errors });
    }
  };
    render() {
        const {formErrors}= this.state;
        return (
            <>
                <div className="bradcam_area bradcam_bg_2">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="bradcam_text text-center">
                                    <h3>Registration</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-10">
                    <div className="text-center w-50 m-auto">
                        <div className="row">
                    <div className="col-lg-12 col-md-8">
                            <h3 className="mt-10 mb-30">Registration form</h3>
                            <form onSubmit={this.handleSubmit}>
                                <div className="mt-10">
                                    <input type="text" value={this.state.formValue.firstName} name="firstName" placeholder="First Name"
                                        className="single-input" onChange={this.handleChange} />
                                        {formErrors.firstName.length > 0 && (
                                            <small className="text-danger">{formErrors.firstName}</small>
                                        )}
                                </div>
                                <div className="mt-10">
                                    <input type="text" value={this.state.formValue.lastName} name="lastName" placeholder="Last Name" 
                                        className="single-input" onChange={this.handleChange} />
                                        {formErrors.lastName.length > 0 && (
                                            <small className="text-danger">{formErrors.lastName}</small>
                                        )}
                                </div>
                                <div className="mt-10">
                                    <input type="email" value={this.state.formValue.email} name="email" placeholder="Email address" 
                                        className="single-input" onChange={this.handleChange} />
                                        {formErrors.email.length > 0 && (
                                            <small className="text-danger">{formErrors.email}</small>
                                        )}
                                </div>
                                <div className="mt-10">
                                    <input type="number" value={this.state.formValue.phoneNumber} name="phoneNumber" placeholder="Phone number"
                                        className="single-input-secondary" onChange={this.handleChange} />
                                        {formErrors.phoneNumber.length > 0 && (
                                            <small className="text-danger">{formErrors.phoneNumber}</small>
                                        )}
                                </div>
                                <div className="mt-10">
                                    <input type="password" value={this.state.formValue.password} name="password" placeholder="Password" 
                                        className="single-input" onChange={this.handleChange} />
                                        {formErrors.password.length > 0 && (
                                            <small className="text-danger">{formErrors.password}</small>
                                        )}
                                </div>
                                <div className="input-group-icon mt-10">
                                    <div className="icon"><i className="fa fa-thumb-tack" aria-hidden="true"></i></div>
                                    <input type="text" value={this.state.formValue.address} name="address" placeholder="Address" className="single-input" onChange={this.handleChange} />
                                    {formErrors.address.length > 0 && (
                                        <small className="text-danger">{formErrors.address}</small>
                                    )}
                                </div>

                                <div className="input-group-icon mt-10">
                                    <div className="icon"><i className="fa fa-user" aria-hidden="true"></i></div>
                                    <div className="form-select" >
                                        <select value={this.state.formValue.role} name="role" className="nice-select" onChange={this.handleChange}>
                                            <option value="">Role</option>
                                            <option value="4">Customer</option>
                                        </select>
                                    </div>
                                    {formErrors.role.length > 0 && (
                                        <small className="text-danger">{formErrors.role}</small>
                                    )}
                                </div>
                                <button type="submit" className="genric-btn default circle mt-10 mb-30">Sign up</button>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
                <Loader loading={this.state.loading} />
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      login: (payload) => dispatch(login(payload)),
    };
  };
   

export default connect(null,mapDispatchToProps)(Registration);