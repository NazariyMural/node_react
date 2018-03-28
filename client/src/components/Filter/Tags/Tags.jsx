import React, { Component } from "react";
import { connect } from "react-redux";
import { getTags } from "../../../actions/getTags";
import _ from "lodash";
import Checkbox from "material-ui/Checkbox";
import { handlePaginationLists } from "../../../actions/paginationList";
import { activeTags } from "../../../actions/getTags";

class Tags extends Component {
  state = {
    checked: []
  };

  componentWillMount() {
    this.props.getTags();
  }

  updateCheck = e => {
    let tags = [...this.state.checked];
    if (e.target.checked) {
      if (!tags.includes(e.target.id)) {
        tags.push(e.target.id);
      }
    } else {
      _.pull(tags, e.target.id);
    }
    this.setState({ checked: tags });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.checked !== this.state.checked) {
      this.props.activeTags(this.state.checked);
      this.props.handlePaginationLists(
        this.props.currentPage,
        " ",
        this.state.checked
      );
    }
  }

  getTagsHandler = () => {
    if (!_.isEmpty(this.props.tags)) {
      const { tags } = this.props;
      const arr = [];
      _.map(tags, (tag, key) => {
        _.map(tag, item => {
          arr.push(...item);
        });
      });
      const unTags = _.uniq(arr);
      return this.renderTagsHendler(unTags);
    } else {
      return <div>Loading....</div>;
    }
  };
  renderTagsHendler = tagsArr => {
    return _.map(tagsArr, (tag, key) => {
      return (
        <Checkbox key={key} label={tag} id={tag} onCheck={this.updateCheck} />
      );
    });
  };
  render() {
    return (
      <div>
        Tags...
        {this.getTagsHandler()}
      </div>
    );
  }
}

const mapStateToProps = ({ tags }) => {
  return { tags };
};

export default connect(mapStateToProps, {
  getTags,
  handlePaginationLists,
  activeTags
})(Tags);
