import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { IntlActions } from "react-redux-multilingual";
import Pace from "react-pace-progress";
import "./header-three.css";
// Import custom components
import store from "../../../store";
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import CartContainer from "../../../containers/CartContainer";
import TopBar from "./common/topbar";
import {
  changeCurrency,
  setSearchedProductsArray,
  setSearchedProductDetail,
} from "../../../actions";
import { connect } from "react-redux";
import LogoImage from "./common/logo";
import { withRouter } from "react-router-dom";

class HeaderThree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      searchBarValue: "",
    };
  }

  /*=====================
         Pre loader
         ==========================*/
  componentDidMount() {
    setTimeout(() => {
      document.querySelector(".loader-wrapper").style = "display: none";
      // if (this.props.location.pathname == "/") {
      //   this.openNav();
      // }
    }, 2000);
  }

  componentWillMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (number >= 300) {
      if (window.innerWidth < 576) {
        document.getElementById("sticky").classList.remove("fixed");
      } else document.getElementById("sticky").classList.add("fixed");
    } else {
      document.getElementById("sticky").classList.remove("fixed");
    }
  };

  changeLanguage(lang) {
    store.dispatch(IntlActions.setLocale(lang));
  }

  openNav() {
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  }
  openSearch() {
    document.getElementById("search-overlay").style.display = "block";
  }

  closeSearch() {
    document.getElementById("search-overlay").style.display = "none";
  }

  load = () => {
    this.setState({ isLoading: true });
    fetch().then(() => {
      // deal with data fetched
      this.setState({ isLoading: false });
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSearchBarSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchBarValue.length < 35) {
      this.props.setSearchedProductsArray([]);
      this.props.history.push(
        `${process.env.PUBLIC_URL}/collection/${this.state.searchBarValue}`
      );
      this.setState({ searchBarValue: "" });
    } else {
      this.props.setSearchedProductsArray([]);
      if (this.state.searchBarValue.includes("1688")) {
        this.props.setSearchedProductDetail(null, "1688");
        let productId = this.state.searchBarValue.split("/")[4].split(".")[0];
        console.log(productId);
        this.props.history.push(`${process.env.PUBLIC_URL}/1688/${productId}`);
      } else {
        this.props.setSearchedProductDetail(null, "taobao");
        let taobaoUrl = new URL(this.state.searchBarValue);
        let params = taobaoUrl.search;
        const urlParams = new URLSearchParams(params);
        const id = urlParams.get("id");
        this.props.history.push(`${process.env.PUBLIC_URL}/taobao/${id}`);
      }
      this.setState({ searchBarValue: "" });
    }
    this.setState({ searchBarValue: "" });
  };

  render() {
    return (
      <div>
        <header id="sticky" className="sticky header-2 header-6">
          {this.state.isLoading ? <Pace color="#27ae60" /> : null}
          <div className="mobile-fix-option" />
          {/*Top Header Component*/}
          <TopBar />

          <div className="container">
            <div className="row">
              <div className="col-sm-12 header-container-left">
                <div className="main-menu">
                  <div className="menu-left">
                    <div className="navbar">
                      {/* <a href="javascript:void(0)" onClick={this.openNav}>
                        <div className="bar-style">
                          {" "}
                          <i
                            className="fa fa-bars sidebar-bar"
                            style={{ color: "darkorange" }}
                            aria-hidden="true"
                          />
                        </div>
                      </a> */}
                      {/*SideBar Navigation Component*/}
                      {/* <SideBar /> */}
                    </div>
                    <div
                      className="brand-logo"
                      // style={{ maxWidth: "70%", margin: "auto" }}
                    >
                      <LogoImage logo={this.props.logoName} />
                    </div>
                  </div>
                  <div>
                    <form
                      className="form_search"
                      role="form"
                      onSubmit={this.handleSearchBarSubmit}
                    >
                      <input
                        id="query search-autocomplete"
                        type="search"
                        placeholder="Search 100+ millions of products from taobao,1688,tmall"
                        value={this.state.searchBarValue}
                        onChange={this.handleChange}
                        name="searchBarValue"
                        className="nav-search nav-search-field"
                        aria-expanded="true"
                      />
                      <button
                        type="submit"
                        name="nav-submit-button"
                        className="btn-search"
                        style={{ width: "80px" }}
                      >
                        <i
                          className="fa fa-camera"
                          style={{ marginRight: "5px" }}
                        />
                        <i className="fa fa-search" />
                      </button>
                    </form>
                  </div>
                  <div className="menu-right pull-right">
                    <div>
                      <div className="icon-nav">
                        <ul>
                          <li className="onhover-div mobile-search">
                            <div>
                              <img
                                src={`${
                                  process.env.PUBLIC_URL
                                }/assets/images/icon/search.png`}
                                onClick={this.openSearch}
                                className="img-fluid"
                                alt=""
                              />
                              <i
                                className="fa fa-search"
                                onClick={this.openSearch}
                              />
                            </div>
                          </li>
                          <li className="onhover-div mobile-setting">
                            <div>
                              <img
                                src={`${
                                  process.env.PUBLIC_URL
                                }/assets/images/icon/setting.png`}
                                className="img-fluid"
                                alt=""
                              />
                              <i className="fa fa-cog" />
                            </div>
                            <div className="show-div setting">
                              {/* <h6>language</h6>
                                                            <ul>
                                                                <li><a href={null} onClick={() => this.changeLanguage('en')}>English</a> </li>
                                                                <li><a href={null} onClick={() => this.changeLanguage('fn')}>French</a> </li>
                                                            </ul> */}
                              <h6>currency</h6>
                              <ul className="list-inline">
                                <li>
                                  <a
                                    href={null}
                                    onClick={() =>
                                      this.props.changeCurrency("Tk")
                                    }
                                  >
                                    taka
                                  </a>{" "}
                                </li>
                                {/* <li><a href={null} onClick={() => this.props.changeCurrency('¥')}>yen</a> </li>
                                                                <li><a href={null} onClick={() => this.props.changeCurrency('$')}>doller</a> </li> */}
                              </ul>
                            </div>
                          </li>
                          {/*Header Cart Component */}
                          <CartContainer />
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="main-nav-center"
                  style={{ maxHeight: "3rem", justifyContent: "flex-end" }}
                >
                  <NavBar />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div id="search-overlay" className="search-overlay">
          <div>
            <span
              className="closebtn"
              onClick={this.closeSearch}
              title="Close Overlay"
            >
              ×
            </span>
            <div className="overlay-content">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <form>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Search a Product"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        <i className="fa fa-search" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps =(state)=>{
//   return {

//   }
// }
export default withRouter(
  connect(
    null,
    { changeCurrency, setSearchedProductsArray, setSearchedProductDetail }
  )(HeaderThree)
);
