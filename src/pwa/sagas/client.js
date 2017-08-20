import { fork, all, takeEvery } from 'redux-saga/effects';
import shareModalSagas from './shareModal';
import postSliderSagas from './postSlider';
import changeUrlOnSlideChange from './change-url-on-slide-change';
import * as types from '../types';
// import cookiesHaveBeenRequested from './cookies';

export default function* saturnSagas() {
  yield all([
    fork(shareModalSagas),
    fork(postSliderSagas),
    takeEvery(types.ACTIVE_POST_SLIDE_CHANGE_FINISHED, changeUrlOnSlideChange),
    // fork(cookiesHaveBeenRequested),
  ]);
}
