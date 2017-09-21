/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const createNode = reactElement => {
  const { type } = reactElement;
  const { children, ...otherProps } = reactElement.props;
  const node = document.createElement(type);
  for (const prop in otherProps) { // eslint-disable-line
    node[prop] = otherProps[prop];
  }
  node.innerHTML = children || '';
  return node;
}

const appendChildren = (parent, name, base) => {
  if (!(parent && base && ['head', 'body'].includes(name))) return;

  let filtered;

  if (base instanceof Array) {
    filtered = base.filter(child => child.type === name)[0];
  } else if (base instanceof Object) {
    filtered = base.type === name && base;
  }

  if (!filtered) return;

  const children = filtered.props.children;
  if (children instanceof Array) {
    children.forEach(child => parent.appendChild(createNode(child)));
  } else {
    parent.appendChild(createNode(children));
  }
}

class Iframe extends Component {
  componentDidMount() {
    const { head, body } = this.iframe.contentDocument;
    const { children } = this.props;

    if(!children) return;
    appendChildren(head, 'head', children);
    appendChildren(body, 'body', children);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { title, width, height, sandbox } = this.props;
    return (
      <Container>
        <iframe
          title={title}
          width={width}
          height={height}
          sandbox={sandbox}
          src="about:blank"
          ref={iframe => {this.iframe = iframe}}
        />
      </Container>
    );
  }
}

Iframe.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  sandbox: PropTypes.string,
  children: PropTypes.shape({}),
};

Iframe.defaultProps = {
  sandbox: undefined,
  children: {},
};

export default Iframe;

const Container = styled.div`
  iframe {
    position: relative;
    border: none !important;
    display: block;
    margin: 0 auto !important;
  }
`;
