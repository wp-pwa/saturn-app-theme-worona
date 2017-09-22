import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Iframe extends Component {
  componentDidMount() {
    const { children } = this.props;

    if (!children) return;

    this.iframe.setAttribute('src', '/');
    this.iframe.contentWindow.stop();
    this.iframe.contentWindow.document.open('text/html', 'replace');
    this.iframe.contentWindow.document.write(children);
    this.iframe.contentWindow.document.close();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { title, width, height } = this.props;
    return (
      <Container>
        <iframe
          title={title}
          width={width}
          height={height}
          ref={iframe => {
            this.iframe = iframe;
          }}
        />
      </Container>
    );
  }
}

Iframe.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.string,
};

Iframe.defaultProps = {
  children: '',
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
