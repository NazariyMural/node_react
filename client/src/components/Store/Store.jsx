import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData, putDataToCart } from '../../actions/index'
import map from 'lodash/map';
import styles from "./Store.css"

class Store extends Component {
  componentDidMount() {
    this.props.fetchData()
  }
  renderPhonesHandler = () => {
    let data = <p>Loading...</p>;
    if (!this.props.phones) {
      return data
    }
    else {
      let phones = this.props.phones;
      data = map(phones, (phone, key) => {
        console.log(phone);
        return (
          <li key={phone._id} className={styles.Prodoct_Item}>
            <span className={styles.Prodoct_Item_Desc}>{phone.category}</span>
            <img src={phone.img[0]} alt="phone" className={styles.Prodoct_Item_Desc} />
            <span className={styles.Prodoct_Item_Desc}>{phone.name}</span>
            <span className={styles.Prodoct_Item_Desc}>{phone.price}</span>
            {
              map(phone.comments, comment => {
                return <ul key={comment}><li key={comment}>{comment}</li></ul>
              })
            }
            <a className="waves-effect waves-light btn" onClick={() => this.props.putDataToCart(phone._id)}>Buy</a>
          </li>
        )
      })
    }
    return data;
  }
  render() {
    console.log()
    return (
      <div>
        <div>Store</div>
        <ul>
          {this.renderPhonesHandler()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ phones }) => {
  console.log(phones, "mapStateToProps Phones");
  return { phones };
};

export default connect(mapStateToProps, { fetchData, putDataToCart })(Store);
