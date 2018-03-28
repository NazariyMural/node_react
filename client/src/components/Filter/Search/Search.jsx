import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { handlePaginationLists } from "../../../actions/paginationList";
import { getNames } from "../../../actions/getNames";
import AutoComplete from "material-ui/AutoComplete";

const style = {
  Search: {
    backgroundColor: "#fff"
  }
};

class Search extends Component {
  state = {
    names: []
  };

  componentWillMount() {
    this.props.getNames();
  }

  handleSearchSubmit = (value, ind) => {
    console.log(value);
    const { currentPage, activeTags } = this.props;
    const tags = _.map(activeTags, tag => tag);
    console.log(tags);
    this.props.handlePaginationLists(currentPage, value, tags.join(" "));
  };

  searchRenderHandler = () => {
    if (!_.isEmpty(this.props.names)) {
      const names = _.map(this.props.names, name => name);
      return (
        <AutoComplete
          onNewRequest={(value, ind) => this.handleSearchSubmit(value, ind)}
          style={style.Search}
          floatingLabelText="Type 'name', of product"
          filter={AutoComplete.fuzzyFilter}
          dataSource={names}
          maxSearchResults={5}
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

const mapStateToProps = ({ names, activeTags }) => {
  return {
    names,
    activeTags
  };
};

export default connect(mapStateToProps, {
  handlePaginationLists,
  getNames
})(Search);
