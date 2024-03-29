import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Modal from "react-responsive-modal";
import "./details-price.css";
import { connect } from "react-redux";

class DetailsWithPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      quantity: 1,
      selectedColor: "",
      colorUrl: "",
      selectedSize: "",
      stock: "InStock",
      nav3: null,
      warningMessage: false,
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.setState({
      nav3: this.slider3,
    });
  }

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ stock: "InStock" });
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  plusQty = () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };

  changeQty = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  clickOnColorVariant = (image, selectedColor) => {
    if (image) {
      this.props.clickOnColorVariant(image);
      this.setState({ colorUrl: image });
    }

    console.log(selectedColor);
    this.setState({ selectedColor });
  };

  clickOnSizeVariant = (sizeName, sizeCm) => {
    this.setState({ selectedSize: `${sizeName}(${sizeCm})` });
  };

  BuynowClicked = (item) => {
    const { BuynowClicked, history, currentUser } = this.props;
    if (!currentUser) {
      history.push("/pages/login", {
        from: `/product/${this.props.match.params.id}`,
      });
      return;
    }
    const cartItemObj = {
      id: item.id,
      name: item.name,
      price: item.price,
      salePrice: item.salePrice,
      availability: item.availability,
      pictures: item.pictures,
      variants: false,
    };
    if (!item.variants) {
      BuynowClicked(cartItemObj, this.state.quantity);
      this.setState({
        open: false,
        quantity: 1,
        selectedColor: "",
        selectedSize: "",
        stock: "InStock",
        nav3: null,
        warningMessage: false,
        colorUrl: "",
      });
      history.push(`${process.env.PUBLIC_URL}/checkout`);
    } else {
      if (item.variants.options[0] && item.variants.options[1]) {
        if (this.state.selectedColor === "" || this.state.selectedSize === "") {
          this.setState({ warningMessage: true });
        } else {
          BuynowClicked(
            {
              ...cartItemObj,
              variants: true,
              color: this.state.selectedColor,
              colorUrl: this.state.colorUrl,
              sizeOrShipsFrom: this.state.selectedSize,
            },
            this.state.quantity
          );
          this.setState({
            open: false,
            quantity: 1,
            selectedColor: "",
            selectedSize: "",
            stock: "InStock",
            nav3: null,
            warningMessage: false,
            colorUrl: "",
          });
          history.push(`${process.env.PUBLIC_URL}/checkout`);
        }
      } else if (item.variants.options[0]) {
        if (this.state.selectedColor === "") {
          this.setState({ warningMessage: true });
        } else {
          BuynowClicked(
            {
              ...cartItemObj,
              variants: true,
              color: this.state.selectedColor,
              colorUrl: this.state.colorUrl,
            },
            this.state.quantity
          );
          this.setState({
            open: false,
            quantity: 1,
            selectedColor: "",
            selectedSize: "",
            stock: "InStock",
            nav3: null,
            warningMessage: false,
            colorUrl: "",
          });
          history.push(`${process.env.PUBLIC_URL}/checkout`);
        }
      }
    }
  };

  addToCartClicked = (item) => {
    const {
      currentUser,
      addToCartClicked,
      BuynowClicked,
      history,
    } = this.props;
    if (!currentUser) {
      history.push("/pages/login", {
        from: `/product/${this.props.match.params.id}`,
      });
      return;
    }
    const cartItemObj = {
      id: item.id,
      name: item.name,
      price: item.price,
      salePrice: item.salePrice,
      availability: item.availability,
      pictures: item.pictures,
      variants: false,
    };
    if (!item.variants) {
      addToCartClicked(cartItemObj, this.state.quantity);
      this.setState({
        open: false,
        quantity: 1,
        selectedColor: "",
        selectedSize: "",
        stock: "InStock",
        nav3: null,
        warningMessage: false,
        colorUrl: "",
      });
    } else {
      if (item.variants.options[0] && item.variants.options[1]) {
        if (this.state.selectedColor === "" || this.state.selectedSize === "") {
          this.setState({ warningMessage: true });
        } else {
          addToCartClicked(
            {
              ...cartItemObj,
              variants: true,
              color: this.state.selectedColor,
              colorUrl: this.state.colorUrl,
              sizeOrShipsFrom: this.state.selectedSize,
            },
            this.state.quantity
          );
          this.setState({
            open: false,
            quantity: 1,
            selectedColor: "",
            selectedSize: "",
            stock: "InStock",
            nav3: null,
            warningMessage: false,
            colorUrl: "",
          });
        }
      } else if (item.variants.options[0]) {
        if (this.state.selectedColor === "") {
          this.setState({ warningMessage: true });
        } else {
          addToCartClicked(
            {
              ...cartItemObj,
              variants: true,
              color: this.state.selectedColor,
              colorUrl: this.state.colorUrl,
            },
            this.state.quantity
          );
          this.setState({
            open: false,
            quantity: 1,
            selectedColor: "",
            selectedSize: "",
            stock: "InStock",
            nav3: null,
            warningMessage: false,
            colorUrl: "",
          });
        }
      }
    }
  };

  render() {
    const {
      symbol,
      item,
      BuynowClicked,
      addToWishlistClicked,
      currentUser,
    } = this.props;

    var colorsnav = {
      slidesToShow: 8,
      swipeToSlide: true,
      arrows: false,
      dots: false,
      focusOnSelect: true,
    };

    return (
      <div className="col-lg-6 rtl-text">
        <div className="product-right">
          <h6
            style={{
              color: "black",
              fontSize: "100%",
              fontFamily: "sans-serif",
              fontWeight: "120%",
            }}
          >
            {window.innerWidth > 600
              ? item.name
              : `${item.name.slice(0, 60)}....`}
          </h6>
          <div>
            <h6 style={{ marginBottom: "0px" }}>orders: {item.orders}</h6>
            <h6>available: {item.totalAvailableQuantity}</h6>
          </div>
          <h3>
            {symbol}
            {item.salePrice}
            <span>
              <del>
                {symbol}
                {item.price}
              </del>
            </span>
          </h3>

          {item.variants ? (
            <ul>
              <h6 className="product-title size-text">
                select {item.variants.options[0].name}:{" "}
              </h6>
              <Slider
                {...colorsnav}
                asNavFor={this.props.navTwo}
                ref={(slider) => (this.slider3 = slider)}
                className="color-variant flex-color-variant"
              >
                {item.variants.options[0].values.map((vari, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        cursor: "pointer",
                        maxWidth: "60px",
                        minHeight: "62px",
                        maxHeight: "62px",
                        padding: "0px",
                      }}
                      className={
                        this.state.selectedColor == vari.displayName
                          ? "border-red"
                          : ""
                      }
                      onClick={() =>
                        this.clickOnColorVariant(vari.image, vari.displayName)
                      }
                    >
                      <img
                        src={`${vari.image}`}
                        key={i}
                        alt={vari.displayName}
                        className="img-fluid color-variant-image"
                        style={{
                          maxWidth: "60px",
                          maxHeight: "60px",
                          minHeight: "60px",
                        }}
                      />
                    </div>
                  );
                })}
              </Slider>
            </ul>
          ) : (
            ""
          )}

          <div className="product-description border-product">
            {item ? (
              <div>
                {item.variants ? (
                  <>
                    {item.variants.options[1] ? (
                      <h6 className="product-title size-text">
                        select {item.variants.options[1].name}
                      </h6>
                    ) : (
                      ""
                    )}{" "}
                  </>
                ) : (
                  ""
                )}

                <div className="size-box">
                  {item.variants ? (
                    <ul className="size-category">
                      {item.variants.options[1]
                        ? item.variants.options[1].values.map((size, i) => {
                            return (
                              <li
                                className={
                                  this.state.selectedSize ==
                                  `${size.name}(${size.displayName})`
                                    ? "border-red"
                                    : "border-gray"
                                }
                                style={{ width: "fit-content" }}
                                onClick={() =>
                                  this.clickOnSizeVariant(
                                    size.name,
                                    size.displayName
                                  )
                                }
                                key={i}
                              >{`${size.name}(${size.displayName})`}</li>
                            );
                          })
                        : ""}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            <p className="service-list">
              <span>&#10003;</span> 24/7 online services for our customers via
              wechat,whatsapp, hotline and facebook. <br />
              <span>&#10003;</span> The best wholesale prices and a vast variety
              of goods.
              <br />
              <span>&#10003;</span> live tracking your product 24/7.
              <br />
              <span>&#10003;</span> 100% Secure payment with us. <br />
              <span>&#10003;</span> Fastest product delivery(around 15-20
              working days). <br />
              <span>&#10003;</span> Cheapest shipping charges around the
              country.
              <br />
              <span>&#10003;</span> Claiming 100% refund facility.{" "}
              <Link
                to={`${process.env.PUBLIC_URL}/pages/refund-policy`}
                style={{ fontSize: "80%", color: "orange" }}
              >
                see refund policy
              </Link>
              <br />{" "}
            </p>
            <span className="instock-cls">{item.availability}</span>

            <h6 className="product-title">quantity</h6>
            <div className="qty-box">
              <div className="input-group">
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-left-minus"
                    onClick={this.minusQty}
                    data-type="minus"
                    data-field=""
                  >
                    <i className="fa fa-angle-left" />
                  </button>
                </span>
                <input
                  type="text"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.changeQty}
                  className="form-control input-number"
                />
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-right-plus"
                    onClick={this.plusQty}
                    data-type="plus"
                    data-field=""
                  >
                    <i className="fa fa-angle-right" />
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="form">
            <div className="form-group row shipping-method">
              <label className="col-xl-3 col-sm-4 mb-0">
                Shipping method :
              </label>
              <div className="col-xl-9 col-sm-7">
                <select
                  className="form-control digits"
                  id="exampleFormControlSelect1"
                  name="category"
                  value={this.state.category}
                  onChange={this.handleChange}
                >
                  <option>Alg cargos and logistics(700-1200/kgs)</option>
                </select>
              </div>
            </div>
          </div>
          {this.state.warningMessage ? (
            <div
              class="alert alert-danger"
              role="alert"
              style={{
                color: "white",
                backgroundColor: "orange",
                margin: "auto",
                marginBottom: "10px",
              }}
            >
              Please fill the missing information first
            </div>
          ) : (
            ""
          )}
          {!currentUser ? (
            <div
              className="alert alert-danger"
              role="alert"
              style={{
                color: "white",
                backgroundColor: "orange",
                margin: "auto",
                marginBottom: "10px",
              }}
            >
              You must login first
            </div>
          ) : (
            ""
          )}
          <div className="product-buttons">
            {currentUser ? (
              <>
                <a
                  className="btn btn-solid"
                  onClick={() => this.addToCartClicked(item)}
                >
                  add to cart
                </a>
                <a
                  className="btn btn-solid"
                  onClick={() => this.BuynowClicked(item)}
                >
                  buy now
                </a>
              </>
            ) : (
              <a
                className="btn btn-solid"
                onClick={() =>
                  this.props.history.push("/pages/login", {
                    from: this.props.match.url,
                  })
                }
              >
                Login
              </a>
            )}
          </div>

          <div className="border-product">
            <h6 className="product-title">product details</h6>
            {item.shortDetails ? <p>{item.shortDetails}</p> : ""}
          </div>
          <div className="border-product" style={{ paddingBottom: "30px" }}>
            <h6 className="product-title">share it</h6>
            <div className="product-icon">
              <ul className="product-social">
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a href="https://plus.google.com/discover" target="_blank">
                    <i className="fa fa-google-plus" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/" target="_blank">
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank">
                    <i className="fa fa-instagram" />
                  </a>
                </li>
              </ul>
              <button
                className="wishlist-btn"
                onClick={() => addToWishlistClicked(item)}
              >
                <i className="fa fa-heart" />
                <span className="title-font">Add To WishList</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser.displayName,
});
export default connect(
  mapStateToProps,
  null
)(DetailsWithPrice);
