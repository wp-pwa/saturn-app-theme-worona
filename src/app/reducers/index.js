import { combineReducers } from 'redux';
import shareModal from './shareModal';
import comments from './comments';
import listSlider from './listSlider';
import postSlider from './postSlider';
import menu from './menu';
import cookies from './cookies';

export default () =>
  combineReducers({
    menu,
    listSlider,
    postSlider,
    shareModal,
    comments,
    cookies,
  });
