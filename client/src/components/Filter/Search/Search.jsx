import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { mainSearch } from "../../../actions/mainSearch";
import { getNames } from "../../../actions/getNames";
import { searchAction } from "../../../actions/serchAction";
import AutoComplete from "material-ui/AutoComplete";

const style = {
  Search: {
    backgroundColor: "#fff",
    margin: 0,
    overflow: "hidden",
    width: 350,
    border: "1px solid #d3d3d3",
    padding: "0 20px",
    borderRadius: 10
  },
  Text: {
    fontSize: 16
  }
};

class Search extends Component {
  state = {
    names: []
  };

  componentWillMount() {
    this.props.getNames();
  }

  // handleSearchSubmit = (value, ind) => {
  //   this.props.searchAction(value);
  //   const { currentPage, activeTags, mainSearch } = this.props;
  //   const tags = _.map(activeTags, tag => tag);
  //   mainSearch(currentPage, value, tags.join(" "));
  // };

  handleSearchUpdate = (value, ind) => {
    this.props.searchAction(value);
    const { currentPage, activeTags, mainSearch } = this.props;
    const tags = _.map(activeTags, tag => tag);
    // console.log(tags);
    mainSearch(currentPage, value, tags.join(" "));
  };

  handleInputChange = e => {
    const value = this.refs.auto.refs.searchTextField.props.value;
    this.props.searchAction(value);
  };

  searchRenderHandler = () => {
    if (!_.isEmpty(this.props.names)) {
      const names = _.map(this.props.names, name => name);
      return (
        <AutoComplete
          // onNewRequest={(value, ind) => this.handleSearchSubmit(value, ind)}
          style={style.Search}
          hintText="Type 'name', of product"
          filter={AutoComplete.fuzzyFilter}
          dataSource={names}
          maxSearchResults={5}
          onUpdateInput={(value, ind) => this.handleSearchUpdate(value, ind)}
          floatingLabelStyle={style.Text}
          fullWidth={true}
          underlineShow={false}
          onClose={this.handleInputChange}
          ref={"auto"}
        />
      );
    }
    return <div>Loading....</div>;
  };

  render() {
    return (
      <div>
        <label htmlFor="search">{this.searchRenderHandler()}</label>
      </div>
    );
  }
}

const mapStateToProps = ({ names, activeTags, searchValue }) => {
  return {
    names,
    activeTags,
    searchValue
  };
};

export default connect(mapStateToProps, {
  mainSearch,
  getNames,
  searchAction
})(Search);
