import { combineReducers } from 'redux';
import * as types from '../types';

const temp = (state = { activeSlide: 0 }, action) => {
  switch (action.type) {
    case types.ACTIVE_POST_SLIDE_CHANGE_STARTED:
      return {
        activeSlide: action.activeSlide,
      };
    default:
      return state;
  }
};

const final = (state = { activeSlide: 0, sliderAnimation: null }, action) => {
  switch (action.type) {
    case types.ACTIVE_POST_SLIDE_CHANGE_FINISHED:
      return {
        activeSlide: action.activeSlide,
        sliderAnimation: action.sliderAnimation,
      };
    default:
      return state;
  }
};

const hiddenBars = (state = false, action) => {
  switch (action.type) {
    case types.BARS_HAVE_HIDDEN:
      return true;
    case types.BARS_HAVE_SHOWN:
      return false;
    default:
      return state;
  }
};

const postSlider = combineReducers({ temp, final, hiddenBars });

export default postSlider;
