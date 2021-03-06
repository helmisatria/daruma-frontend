import React, { Component } from 'react';
import faker from 'faker';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import HospitalAction from '../../reducers/HospitalRedux';

// Styles
import '../../dist/css/homepage.css';

// Components
import ListRumahSakit from './ListRumahSakit';
import Footer from './Footer';

class Home extends Component {
  state = {
    data: [],
    cari: ''
  };

  componentWillMount() {
    document.body.style.backgroundColor = '#ffffff';
    const tmp = [];
    for (let i = 0; i < 8; i++) {
      tmp.push({
        nama: faker.name.findName(),
        address: `${faker.address.city()} ${faker.address.secondaryAddress()} ${faker.address.streetAddress()}`,
        phone: faker.phone.phoneNumber(),
        image: faker.image.city(),
      });
    }
    this.setState({ data: tmp });

    this.props.getList({});
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps({ data }) {
    console.log({ data });
    if (data) {
      this.setState({ data });
    }
  }

  render() {
    return (
      <div>
        <header id="home_hero">
          <div id="home_herocontainer" className="ui grid container centered stackable">
            <div id="home_navwrapper">
              <div id="home_nav">
                <Link to="/">
                  <h2>DARUMA</h2>
                </Link>
                <div id="home_rightnav">
                  <Link to="/" className="hideMobile">
                    <h4>Home</h4>
                  </Link>
                  <h4 className="hideMobile">Navigation</h4>
                  <h4 className="hideMobile">Sitemap</h4>
                  <div id="header_navAuthItems">
                    <Link to="/signup">
                      <h4 id="header_registerBtn">REGISTER</h4>
                    </Link>
                    <Link to="/login">
                      <h4>LOGIN</h4>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div id="home_herocenter" className="eight wide column">
              <h2 id="home_heroTitle">Mencari kamar rawat inap dengan cepat dan pasti</h2>
              <div className="ui fluid huge left icon right action input" id="home_searchContainer">
                <i className="search icon" />
                <input id="home_heroSearch" type="text" placeholder="Masukan nama rumah sakit atau lokasi" value={this.state.cari} onChange={(event) => {this.setState({ cari: event.target.value })}} />
                <Link to={"/search/" + this.state.cari} className="ui button" id="home_searchBtn">
                  CARI
                </Link>
              </div>
              <p id="home_heroHelptext">
                Lanjutkan ke pencarian terakhir: <b>Rumah Sakit di Bandung</b>
              </p>
            </div>
            <div />
          </div>
        </header>
        <ListRumahSakit data={this.state.data} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.Hospital.fetching,
  error: state.Hospital.error,
  message: state.Hospital.message,
  data: state.Hospital.list,
});

const mapDispatchToProps = dispatch => ({
  getList: params => dispatch(HospitalAction.listRequest(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
