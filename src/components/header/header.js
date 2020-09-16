import React from "react";
import logo from "../../assets/img/logo.png";
import { Link, withRouter } from "react-router-dom";
import {login} from "../../redux/action/index"
import { connect } from "react-redux";
import { toast } from "react-toastify";
class Header extends React.Component {
    constructor(props){
        super(props);
        this.state={
            login:false
        }
    }
    componentDidMount(){
        if(localStorage.getItem("token")){
            this.props.loginF(true)
        }
        else{
            this.props.loginF(false)
        }
    }
    logout = e =>{
      console.log(this.props,'logout');
        toast.success("Logout Successfully!!");
        this.props.loginF(false)
        localStorage.removeItem("token");
        this.props.history.push("/")
      }

  render() {
    return (
      <header>
        <div className="header-area ">
          <div id="sticky-header" className="main-header-area">
            <div className="container-fluid p-0">
              <div className="header_bottom_border">
                <div className="row align-items-center no-gutters">
                  <div className="col-xl-3 col-lg-2">
                    <div className="logo">
                      <Link to="/">
                        <img src={logo} alt="" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-7">
                    <div className="main-menu  d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li>
                            <Link className="active" to="/home">
                              home
                            </Link>
                          </li>
                          <li>
                            <Link to="/merchants">Merchants</Link>
                          </li>
                          <li>
                            <Link to="/about-us">About</Link>
                          </li>
                          <li>
                            <Link to="/contact">Contact</Link>
                          </li>
                          <li>

                            <Link to="/cart">Cart</Link>
                              <i className="fa fa-shopping-cart" style={{color:"white"}} aria-hidden="true"></i>
                            <sup style={{color:'#fff',padding:'4px',fontSize:'16px'}}>{this.props.cart.length}</sup>

                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  {console.log(this.props,'yogi')}
                  {!this.props.login ? (
                    <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                      <div className="say_hello">
                        <Link to="/login">Login/</Link>
                        <Link to="/register">Regsitration</Link>
                      </div>
                    </div>
                  ) : (
                    <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                      <div className="say_hello">
                        <Link onClick={this.logout} >Logout</Link> &nbsp;
                        <i className="fa fa-sign-out" style={{color:"white"}} aria-hidden="true"></i>
                      </div>
                    </div>
                  )}

                  <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cart:state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      loginF: (payload) => dispatch(login(payload)),
    };
  };
   

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
