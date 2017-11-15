import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import TagsItem from './TagsItem';
import * as selectorCreators from '../../../selectorCreators';

class TagList extends Component {
  constructor() {
    super();

    this.renderCategories = this.renderCategories.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  renderCategories(id) {
    const { siteId } = this.props;

    return <TagsItem key={id} siteId={siteId} type={'category'} id={id} />;
  }

  renderTags(id) {
    const { siteId } = this.props;

    return <TagsItem key={id} siteId={siteId} type={'tag'} id={id} />;
  }

  render() {
    return (
      <Container>
        {this.props.categoryList.map(this.renderCategories)}
        {this.props.tagList.map(this.renderTags)}
      </Container>
    );
  }
}

TagList.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.number).isRequired,
  tagList: PropTypes.arrayOf(PropTypes.number).isRequired,
  siteId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  categoryList: selectorCreators.post.getCategoryList(id)(state),
  tagList: selectorCreators.post.getTagList(id)(state),
  siteId: dep('settings', 'selectors', 'getSiteId')(state),
});

export default connect(mapStateToProps)(TagList);

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;
