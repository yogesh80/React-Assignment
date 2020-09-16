import React from "react";

class Content extends React.Component {
    
    render() {
        return (
            <div className="about_area">
                <div className="icon_1 d-none d-md-block">
                    <img src="assets/img/icon/1.png" alt="" />
                </div>
                <div className="icon_2 d-none d-md-block">
                    <img src="assets/img/icon/2.png" alt="" />
                </div>
                <div className="icon_3 d-none d-md-block">
                    <img src="assets/img/icon/3.png" alt="" />
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about_info_wrap">
                                <h3>Sed ut perspiciatis unde  <br />
                                    omnis iste natus
                                </h3>
                                <span className="long_dash"></span>
                                <p>Omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi. Exercitation photo booth stumptown tote bag todo Banksy, elit small batch freegan sed. Craft beer elit seitan exercitation photo booth et 8-bit kale chips proident chillwave deep vow laborum. Aliquip veniam delectus, marfa eiusmod pinterest.</p>
                                <ul className="food_list">
                                    <li>
                                        <img src="assets/img/svg_icon/salad.svg" alt="" />
                                        <span>Fresh Ingredients</span>
                                    </li>
                                    <li>
                                        <img src="assets/img/svg_icon/tray.svg" alt="" />
                                        <span>Expert cooker</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about_img">
                                <div className="img_1">
                                    <img src="assets/img/about/big.png" alt="" />
                                </div>
                                <div className="small_img">
                                    <img src="assets/img/about/small.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;
