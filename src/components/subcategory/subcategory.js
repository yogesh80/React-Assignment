import React from "react";
import { Link } from "react-router-dom";
import { GetApiAction } from "../../constfunctions/apiaction";
import Loader from "../loader/loader";

class SubCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      SubCategory: [],
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    } else {
        let obj = {
            id: this.props.match.params.catgoryid,
            type:'merchant',
            merchantID: this.props.match.params.merchantid
            };
        this.setState({
            loading: true,
        });
        GetApiAction(`subcategory/getSubCatId?id=${obj.id}&type=${obj.type}&merchantID=${obj.merchantID}`)
            .then((res) => {
            const subcategory = res.data;
            
            this.setState(
                {
                loading: false,
                SubCategory: subcategory,
                },
                () => console.log(this.state.SubCategory)
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

  renderMerchant() {
        return this.state.SubCategory.map((tat, i) => {
        return (
            <div className="col-xl-6 col-md-6 col-lg-6" key={tat._id+i}>
            <div className="single_delicious d-flex align-items-center">
                <div className="thumb">
                <img
                    src={tat.icon}
                    style={{ heigh: "166px", width: "166px" }}
                    alt=""
                />
                </div>
                <div className="info">
                    <Link to={`/product/${tat._id}`}><span>{tat.title}</span></Link>
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
                  <h3>Subcategories</h3>
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
                {this.state.SubCategory.length ?(<h3>Subcategory Listing</h3>):(<h3>No Subcategory available under this merchant!!</h3>)}
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
                    {this.renderMerchant()}
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

export default SubCategory;
