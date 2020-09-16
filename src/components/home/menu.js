
import React from "react";
import { GetApiAction } from "../../constfunctions/apiaction";
import Loader from "../loader/loader";


class Menu extends React.Component {
    constructor(){
        super()
        this.state = {
            loading:false,
            foodCategory: []
        }
    }
    componentDidMount() {
        GetApiAction("category/pagination")
        .then((res) => {
            const category = res.data.data
            
            this.setState({
                loading: false,
                foodCategory: category

            },
            ()=>console.log(this.state.foodCategory))
        })
        .catch((err) => {
            this.setState({
                loading: false,
                });
            console.log("erorr", err);
        });
      };
        renderCategory() {
            return this.state.foodCategory.map((tat,i)=>{
                return (
                    <div className="col-xl-6 col-md-6 col-lg-6" key={tat._id+i}>
                        <div className="single_delicious d-flex align-items-center">
                            <div className="thumb">
                                <img src={tat.icon} style={{heigh: "166px",width: "166px"}} alt="" />
                            </div>
                            <div className="info">
                                {/* <h3>#12. Chicken Chilis</h3> */}
                                <p>{tat.description}</p>
                                {/* <span>$20</span> */}
                            </div>
                        </div>
                    </div>      
                )
            })
        }
    render() {
        return (
                <div className="Delicious_area">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="section_title text-center mb-50">
                                    <h3>Delicious Food For You</h3>
                                </div>
                            </div>
                        </div>
                        <div className="tablist_menu">
                            <div className="row">
                                <div className="col-xl-12">
                                    <ul className="nav justify-content-center" id="pills-tab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                                            <div className="single_menu text-center">
                                                <div className="icon">
                                                    <i className="flaticon-lunch"></i>
                                                </div>
                                                <h4>Food categories</h4>
                                            </div>
                                            </a>
                                        </li>
                                    </ul>
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
                                {this.renderCategory() }
                            </div>
                            </div>
                        </div>
                    </div>
                    <Loader loading={this.state.loading} />
                </div>
                );
            }
        }
        
export default Menu;