import React from "react";
import { Link } from "react-router-dom";
import { GetApiAction } from "../../constfunctions/apiaction";
import Loader from "../loader/loader";

class MenuPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      merchantList: [],
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    } else {
        this.setState({
            loading: true,
        });
        GetApiAction("merchant/pagination")
            .then((res) => {
            const merchant = res.data.data;

            this.setState(
                {
                loading: false,
                merchantList: merchant,
                },
                () => console.log(this.state.merchantList)
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
    return this.state.merchantList.map((tat, i) => {
      return (
        <div className="col-xl-6 col-md-6 col-lg-6" key={tat._id+i}>
          <div className="single_delicious d-flex align-items-center">
            <div className="thumb">
              <img
                src={tat.merchant_image}
                style={{ heigh: "166px", width: "166px" }}
                alt=""
              />
            </div>
            <div className="info">
                <Link to={`/subcategories/${tat.categoryID}/${tat._id}`}><span>{tat.name}</span></Link>
                <p>{tat.description}</p>
                <p>{tat.address}</p>
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
                  <h3>Merchants</h3>
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
                  <h3>Merchant Listing</h3>
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

export default MenuPage;
