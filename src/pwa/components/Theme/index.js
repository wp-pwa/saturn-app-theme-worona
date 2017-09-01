/* eslint-disable react/no-danger, no-nested-ternary */
/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import { Transition } from 'react-transition-group';
import dynamic from '@worona/next/dynamic';
import Head from '@worona/next/head';
import { dep } from 'worona-deps';
import mini from '../mini.css';
import { blackOrWhite } from '../../libs';
import Header from '../Header';
import Menu from '../Menu';
import Share from '../Share';
import ShareBar from '../ShareBar';
// import Performance from '../../elements/Performance';
// import whyDidYouUpdate from 'why-did-you-update';
// import Cookies from '../Cookies';

injectGlobal`${mini}`; // eslint-disable-line

// if (process.env.NODE_ENV !== 'production') {
//   // eslint-disable-next-line no-unused-vars,react/no-deprecated
//   let createClass = React.createClass;
//   Object.defineProperty(React, 'createClass', {
//     set: nextCreateClass => {
//       createClass = nextCreateClass;
//     }
//   });
//   // eslint-disable-next-line global-require
//   whyDidYouUpdate(React);
// }

const DynamicList = dynamic(import('../List'));
const DynamicPost = dynamic(import('../Post'));
const DynamicPage = dynamic(import('../Page'));

const duration = 0;

const defaultStyle = { display: 'block' };

const transitionStyles = {
  entered: { display: 'block' },
  exited: { display: 'none' },
};

class Theme extends Component {
  constructor(props) {
    super(props);

    this.theme = {
      color: blackOrWhite(props.mainColor),
      bgColor: props.mainColor,
      titleSize: '56px',
      navbarSize: '30px',
      logoSize: '1.3em',
      menuPaddingLeft: '20px',
      shadowColor: '#999',
      postListLight: '#FFF',
      postListGrey: '#AAA',
      postListDark: '#333',
      shareSize: '44px',
      postLight: '#FFF',
      postGrey: '#AAA',
      postDark: '#333',
      shareBarHeight: '56px',
      shareBarButtonSize: '40px',
    };
  }

  render = () => {
    const { type, currentList, currentSingle } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        <Container>
          {/* <Performance /> */}
          <Head>
            <script src="//ced.sascdn.com/tag/620/smart.js" type="text/javascript" async />
          </Head>
          <Header />
          <Menu />
          {currentList &&
            <Transition
              in={['latest', 'category', 'tag', 'author'].includes(type)}
              timeout={duration}
              enter={false}
              exit={false}
            >
              {state =>
                <div
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }}
                >
                  <DynamicList />
                </div>}
            </Transition>}
          {currentSingle &&
            <Transition
              in={type === 'post' || type === 'page'}
              timeout={duration}
              enter={false}
              exit={false}
            >
              {state =>
                <div
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }}
                >
                  {currentSingle.wpType === 'posts' && <DynamicPost />}
                  {currentSingle.wpType === 'pages' && <DynamicPage />}
                </div>}
            </Transition>}
          <Share />
          {type === 'post' && <ShareBar />}
        </Container>
      </ThemeProvider>
    );
  };
}

Theme.propTypes = {
  mainColor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  currentList: PropTypes.bool.isRequired,
  currentSingle: PropTypes.shape({
    wpType: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({
  mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
  type: dep('router', 'selectors', 'getType')(state),
  currentList: !!state.connection.names.currentList,
  currentSingle: state.connection.names.currentSingle,
});

export default connect(mapStateToProps)(Theme);

const Container = styled.div`
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  *:focus,
  *:hover {
    opacity: 1;
  }
`;
