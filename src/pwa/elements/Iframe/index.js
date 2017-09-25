/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Iframe extends Component {
  componentDidMount() {
    const { children } = this.props;

    if (!children) return;

    // this.iframe.setAttribute('src', 'https://www8.smartadserver.com');
    // this.iframe.contentWindow.stop();
    const { title, width, height, sandbox } = this.props;

    const iframe = document.createElement('iframe');
    iframe.title = title;
    iframe.width = width;
    iframe.height = height;
    iframe.src = '/';
    iframe.sandbox = 'allow-scripts allow-same-origin';

    this.container.append(iframe);

    iframe.contentWindow.document.open('text/html', 'replace');
    iframe.contentWindow.document.write(`
      <head></head>
      <body>
        <script>
          var iframe = document.createElement('iframe');
          iframe.title = ${title};
          iframe.width = ${width};
          iframe.height = ${height};
          iframe.src = 'https://www8.smartadserver.com';
          iframe.sandbox = 'allow-scripts allow-same-origin';

          document.body.append(iframe);

          iframe.contentWindow.document.open('text/html', 'replace');
          iframe.contentWindow.document.write('${children
            .replace(/(\r\n|\n|\r)/gm, '')
            .replace(/\s+/g, ' ')}');
          iframe.contentWindow.document.close();
        </script>
      </body>
    `);
    iframe.contentWindow.document.close();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Container
        innerRef={container => {
          this.container = container;
        }}
      />
    );
  }
}

Iframe.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  sandbox: PropTypes.string,
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
