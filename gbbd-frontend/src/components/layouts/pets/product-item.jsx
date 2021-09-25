import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import "./collection2.css";
import { getRelatedItems } from "../../../services";

class ProductItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      cartModalopen: false,
      stock: "InStock",
      quantity: 1,
      image: "",
    };
  }

  onClickHandle(img) {
    this.setState({ image: img });
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  onOpenCartModal = () => {
    this.setState({ cartModalopen: true });
    this.props.onAddToCartClicked();
  };
  onCloseCartModal = () => {
    this.setState({ cartModalopen: false });
  };

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ stock: "InStock" });
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  plusQty = () => {
    if (this.props.product.stock >= this.state.quantity) {
      this.setState({ quantity: this.state.quantity + 1 });
    } else {
      this.setState({ stock: "Out of Stock !" });
    }
  };
  changeQty = (e) => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  render() {
    const {
      product,
      symbol,
      onAddToCartClicked,
      onAddToWishlistClicked,
      onAddToCompareClicked,
      relatedItems,
    } = this.props;

    let RatingStars = [];
    for (var i = 0; i < product.rating; i++) {
      RatingStars.push(<i className="fa fa-star" key={i} />);
    }
    const image = product.pictures[0];

    // console.log(product)
    return (
      <div>
        <div className="product-box product-box-homepage" style={{}}>
          <div className="img-wrapper img-wrapper-homepage">
            <div className="lable-block">
              {product.sale == true ? (
                <span className="lable4">on sale</span>
              ) : (
                ""
              )}
              {product.new == true ? <span className="lable3">new</span> : ""}
            </div>
            <div className="front">
              <Link to={`/product/${product.id}`}>
                <img
                  src={`${
                    image
                      ? image
                      : `${process.env.PUBLIC_URL}/assets/images/icon/icon.png`
                  }`}
                  className="img-fluid lazyload bg-img product-only-image"
                  style={{ minWidth: "100%" }}
                  alt=""
                />
              </Link>
            </div>
            <div className="cart-info cart-wrap" style={{ padding: "5px" }}>
              <Link to={`/product/${product.id}`} title="Add to cart">
                <i
                  className="fa fa-shopping-cart"
                  aria-hidden="true"
                  style={{ fontSize: "10px" }}
                />
              </Link>
              <a
                onClick={onAddToWishlistClicked}
                title="Add to Wishlist"
                style={{ cursor: "pointer" }}
              >
                <i
                  className="fa fa-heart"
                  aria-hidden="true"
                  style={{ fontSize: "10px" }}
                />
              </a>
              <a
                href="javascript:void(0)"
                data-toggle="modal"
                data-target="#quick-view"
                title="Quick View"
                onClick={this.onOpenModal}
              >
                <i
                  className="fa fa-search"
                  aria-hidden="true"
                  style={{ fontSize: "10px" }}
                />
              </a>
              <Link
                to={`${process.env.PUBLIC_URL}/compare`}
                title="Compare"
                onClick={onAddToCompareClicked}
              >
                <i
                  className="fa fa-refresh"
                  aria-hidden="true"
                  style={{ fontSize: "10px" }}
                />
              </Link>
            </div>
          </div>
          <div
            className="product-detail"
            style={{ padding: "5px", paddingBottom: "80px", paddingTop: "0px" }}
          >
            <div>
              <div className="rating" style={{ minHeight: "35px" }}>
                {RatingStars.length > 0 ? (
                  RatingStars
                ) : (
                  <p
                    style={{
                      color: "gainsboro",
                      fontSize: "90%",
                    }}
                  >
                    No rating
                  </p>
                )}
              </div>
              <Link to={`/product/${product.id}`}>
                <h6
                  style={{ fontSize: "80%", paddingBottom: "0px" }}
                  className="product-name"
                >
                  {product.name.slice(0, 25)}
                </h6>
              </Link>
              <h6
                style={{ color: "#1b1b1b", fontSize: "90%" }}
                className="product-price"
              >
                {symbol}
                {product.salePrice} <br />
                {product.price ? (
                  <del style={{ fontSize: "70%" }}>
                    <span className="money">
                      {symbol}
                      {product.price}
                    </span>
                  </del>
                ) : (
                  ""
                )}
              </h6>
            </div>
          </div>

          {/*Quick-view modal popup Start*/}
          <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              role="document"
            >
              <div className="modal-content quick-view-modal">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-lg-6  col-xs-12">
                      <div className="quick-view-img">
                        <img
                          src={`${product.pictures[0]}`}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 rtl-text">
                      <div className="product-right">
                        <h2> {product.name} </h2>
                        <h3>
                          {symbol}
                          {Math.round(product.price)}
                        </h3>
                        {/* {product.variants?
                                                <ul className="color-variant">
                                                    {product.variants.map((vari, i) =>
                                                        <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)
                                                    }
                                                </ul>:''} */}
                        <div className="border-product">
                          <h6 className="product-title">product details</h6>
                          <p>{product.shortDetails}</p>
                        </div>
                        <div className="product-description border-product">
                          {/* {product.size?
                                                    <div className="size-box">
                                                        <ul>
                                                            {product.size.split(',').map((size, i) => {
                                                                return <li key={i}><a href="#">{size}</a></li>
                                                            })}
                                                        </ul>
                                                    </div>:''} */}
                          {/* <h6 className="product-title">quantity</h6>
                                                    <div className="qty-box">
                                                        <div className="input-group">
                                                                  <span className="input-group-prepend">
                                                                    <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                                                     <i className="fa fa-angle-left"></i>
                                                                    </button>
                                                                  </span>
                                                            <input type="text" name="quantity" value={this.state.quantity}  onChange={this.changeQty} className="form-control input-number" />
                                                            <span className="input-group-prepend">
                                                                    <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                                                    <i className="fa fa-angle-right"></i>
                                                                    </button>
                                                                   </span>
                                                        </div>
                                                    </div> */}
                        </div>
                        <div className="product-buttons">
                          <Link
                            to={`${process.env.PUBLIC_URL}/product/${
                              product.id
                            }`}
                            className="btn btn-solid"
                            onClick={onAddToWishlistClicked}
                          >
                            add to wishlits
                          </Link>
                          <Link
                            to={`${process.env.PUBLIC_URL}/product/${
                              product.id
                            }`}
                            className="btn btn-solid"
                          >
                            view detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          {/*Quick-view modal popup End*/}

          {/* Add to cart modal popup start */}
          {/* <Modal open={this.state.cartModalopen} onClose={this.onCloseCartModal} center className="cart-modal">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body modal1">
                                    <div className="container-fluid p-0">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="modal-bg addtocart">
                                                    <div className="media">
                                                        <a href="#">
                                                            <img src={`${
                                                                product.variants?
                                                                    this.state.image?this.state.image:product.variants[0].images
                                                                    :product.pictures[0]
                                                                }`} alt="" className="img-fluid blur-up lazyload pro-img" />
                                                        </a>
                                                        <div className="media-body align-self-center text-center">
                                                            <a href="#">
                                                                <h6>
                                                                    <i className="fa fa-check"></i>Item
                                                                    <span>{product.name}</span>
                                                                    <span> successfully added to your Cart</span>
                                                                </h6>
                                                            </a>
                                                            <div className="buttons">
                                                                <a href="#" className="view-cart btn btn-solid">Your
                                                                    cart</a>
                                                                <a href="#" className="checkout btn btn-solid">Check
                                                                    out</a>
                                                                <a href="#" className="continue btn btn-solid">Continue
                                                                    shopping</a>
                                                            </div>

                                                            <div className="upsell_payment">
                                                                <img src="assets/images/payment_cart.png"
                                                                     className="img-fluid blur-up lazyload" alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-section">
                                                        <div className="col-12 product-upsell text-center">
                                                            <h4>Customers who bought this item also.</h4>
                                                        </div>
                                                        <div className="row" id="upsell_product">
                                                            {relatedItems.map((item,i) =>
                                                                <div className="product-box col-sm-3 col-6" key={i}>
                                                                    <div className="img-wrapper">
                                                                        <div className="front">
                                                                            <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item.id}`} >
                                                                                <img src={`${
                                                                                    item.variants?
                                                                                        item.variants[0].images
                                                                                        :item.pictures[0]
                                                                                    }`} alt="" className="img-fluid blur-up lazyload mb-1" />
                                                                            </Link>
                                                                        </div>
                                                                        <div className="product-detail">
                                                                            <h6><Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item.id}`} >
                                                                                    <span>{item.name}</span>
                                                                            </Link></h6>
                                                                            <h4><span>{symbol}{item.price}</span></h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal> */}
          {/*Add to cart modal popup End*/}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  relatedItems: getRelatedItems(state.data.products, ownProps.product.category),
  symbol: state.data.symbol,
});

export default connect(mapStateToProps)(ProductItem);
