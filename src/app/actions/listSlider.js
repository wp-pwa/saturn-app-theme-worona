import * as types from '../types';

export const activeListSlideChangeRequested = ({ activeSlide, sliderAnimation, sliderLength }) => ({
  type: types.ACTIVE_LIST_SLIDE_CHANGE_REQUESTED,
  activeSlide,
  sliderAnimation,
  sliderLength,
});

export const activeListSlideChangeStarted = ({ activeSlide }) => ({
  type: types.ACTIVE_LIST_SLIDE_CHANGE_STARTED,
  activeSlide,
});

export const activeListSlideChangeFinished = ({ activeSlide, sliderAnimation, sliderLength }) => ({
  type: types.ACTIVE_LIST_SLIDE_CHANGE_FINISHED,
  activeSlide,
  sliderAnimation,
  sliderLength,
});
