import React from "react";
import "./product.css";
import { GetApiActionWithAuthorization } from "../../constfunctions/apiaction";
import Loader from "../loader/loader";
import { connect } from "react-redux";
import {addCart} from "../../redux/action/index";

import { DropdownList } from "react-widgets";
import { Link } from "react-router-dom";
// import DropdownList from 'react-widgets/lib/DropdownList';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      Product: [],
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    } else {
      let obj = {
        subCategoryId: this.props.match.params.subcategoryid,
      };
      this.setState({
        loading: true,
      });
      GetApiActionWithAuthorization(
        `product/pagination?subcategoryID=${obj.subCategoryId}`
      )
        .then((res) => {
          const products = res.data.data;
          this.setState(
            {
              loading: false,
              Product: products,
            },
            () => console.log(this.state.Product)
          );
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
          console.log("erorr", err);
        });
    }
  }

  addtocart(tat){
    tat.qty=1;
    if(localStorage.cartdata && JSON.parse(localStorage.cartdata).length){
      let cart=[...JSON.parse(localStorage.cartdata)];
      let present=cart.some((item,i)=>{
             return item._id==tat._id?cart[i].qty+=1:false;
      })
      present?localStorage.cartdata=JSON.stringify(cart):localStorage.cartdata=JSON.stringify([...cart,tat]);


    }else{
      localStorage.cartdata=JSON.stringify([tat]);
    }
    this.props.addCart(JSON.parse(localStorage.cartdata));

  };
  renderProduct() {
    return this.state.Product.map((tat, i) => {
      return (
        <div className="itm-wrppr" key={tat._id+i}>
          <div className="sc-kafWEX bAsOxl" data-label="Margherita">
            <div className="injectStyles-sc-1jy9bcf-0 eRJwMX">
              <div className="wd-100">
                <div className="sc-gGBfsJ dykkXf">
                  <div className="img-cvr">
                    <img
                      className="img-wrpr__img"
                      src={tat.icon}
                    />
                  </div>
                  <div className="injectStyles-sc-1jy9bcf-0 dnurXH"></div>
                  <div className="img-wrpr__img-txt">
                    <span className="rupee">199</span>
                  </div>
                  <div
                    className="img-wrpr__fav"
                    data-label="favorite"
                  >
                    <div className="injectStyles-sc-1jy9bcf-0 iBNnip"></div>
                    <div className="injectStyles-sc-1jy9bcf-0 iwmcbq"></div>
                  </div>
                  <div className="img-wrpr__typ">
                    <div className="injectStyles-sc-1jy9bcf-0 khLfXP"></div>
                  </div>
                  <div className="injectStyles-sc-1jy9bcf-0 fkPpkx">
                    <button
                      data-label="customise"
                      className="btn--cstmz"
                    >
                      <span>CUSTOMISE</span>
                      <div className="injectStyles-sc-1jy9bcf-0 FTAhK"></div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="sc-jnlKLf edelCC">
                <div className="itm-nm-dsc ">
                  <span className="itm-dsc__nm">{tat.title}</span>
                  <span
                    className="itm-dsc__dscrptn"
                    title="Classic delight with 100% real mozzarella cheese"
                  >
                    {tat.description}
                  </span>
                </div>
                <div className="itm-dsc__actn">
                  <div
                    className="itm-dsc__actn__sz"
                    data-label="selectSize"
                  >
                    <div className="itm-dsc__actn__sz__nm">
                      Size
                    </div>
                    <div>
                      <div className="injectStyles-sc-1jy9bcf-0 dVfvkq">
                        <div className="nm-icn">
                          <DropdownList
                            data={tat.variation}
                            textField="title"
                          />
                          <div className="injectStyles-sc-1jy9bcf-0 ebOjDJ"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="itm-dsc__actn__adCrt">
                  <div className="injectStyles-sc-1jy9bcf-0 jrxrSi">
                  {this.props.cart.some((item)=>{
                    return item._id==tat._id
                  })?'':
                    <button data-label="addTocart">
                      <span onClick={()=>{
                        this.addtocart(tat)
                      }} >ADD TO CART</span>
                    </button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        <div className="bradcam_area bradcam_bg_2">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="bradcam_text text-center">
                  <h3>Products</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Delicious_area">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="section_title text-center mb-50">
                  {this.state.Product.length ?(<h3>Product Listing</h3>):(<h3>No Products available under this sub category!!</h3>)}
                </div>
              </div>
            </div>

            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="row">
                  <div className="sc-hqyNC eNjllT">
                    <div className="sc-cIShpX jUGDEI">
                      <div
                        className="sc-bbmXgH cVANQF"
                        data-label="Bestsellers"
                        style={{ marginTop: "0em" }}
                      >
                        {this.renderProduct()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Loader loading={this.state.loading} />
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    cart:state.cart,
  };
};

// export default Product;
const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (payload) => dispatch(addCart(payload)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps) (Product);
