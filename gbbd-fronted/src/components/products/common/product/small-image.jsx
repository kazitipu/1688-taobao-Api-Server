import React, { Component } from "react";
import Slider from "react-slick";
import "./small-image.css";

class SmallImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav2: this.slider2,
    };
  }
  componentDidMount() {
    this.setState({
      nav2: this.slider2,
    });
  }

  render() {
    const { item, settings } = this.props;

    var productsnav = settings;

    return (
      <div
        style={
          {
            //   display: "flex",
            //   flexDirection: "row",
            //   justifyContent: "space-around",
            //   maxWidth: "100%",
            //   minWidth: "100%",
          }
        }
      >
        <div className="col-8 p-0" style={{ margin: "auto", marginTop: "5px" }}>
          <Slider
            {...productsnav}
            asNavFor={this.props.navTwo}
            ref={(slider) => (this.slider2 = slider)}
            className="slider-nav"
          >
            {item.pictures.map((vari, index) => (
              <div
                // className="small-image"
                key={index}
                onClick={() => this.props.clickOnColorVariant(vari)}
                style={{ padding: "1px" }}
              >
                <img
                  src={`${vari}`}
                  key={index}
                  alt=""
                  className="img-fluid"
                  style={{ maxHeight: "60px", minHeight: "60px" }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default SmallImages;
