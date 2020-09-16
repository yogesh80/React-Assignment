import React from "react";
import Content from "./content";
import Menu from "./menu";

class Home extends React.Component {
    
    render() {
        return (
            <>
              <div className="bradcam_area slider_bg_1">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="bradcam_text text-center">
                                        <h3>Home</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            <Content />
            <Menu />
            </>
        );
    }
}

export default Home;
