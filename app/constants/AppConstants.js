'use strict';

import pkg from '../../package';

export const DEBUG = (process.env.NODE_ENV !== 'production');
export const DEBUG_PERF = DEBUG && false;
export const APP_TITLE = 'Echo JS';

export const ACTION_POSTS_GET = 'ACTION_POSTS_GET';
export const ACTION_POSTS_GET_SUCCESS = 'ACTION_POSTS_GET_SUCCESS';
export const ACTION_POSTS_GET_ERROR = 'ACTION_POSTS_GET_ERROR';

export const ACTION_SINGLE_POST_GET = 'ACTION_SINGLE_POST_GET';
export const ACTION_SINGLE_POST_GET_SUCCESS = 'ACTION_SINGLE_POST_GET_SUCCESS';
export const ACTION_SINGLE_POST_GET_ERROR = 'ACTION_SINGLE_POST_GET_ERROR';

export const POSTS_ERROR_MESSAGE = 'Sorry, there was an error loading the news. Please try again.';

export const SINGLE_POST_UPDATED = 'SINGLE_POST_UPDATED';
export const SINGLE_POST_GET_SUCCESS = 'SINGLE_POST_GET_SUCCESS';
export const SINGLE_POST_GET_ERROR = 'SINGLE_POST_GET_ERROR';
export const SINGLE_POST_GET_COMPLETE = 'SINGLE_POST_GET_COMPLETE';
export const SINGLE_POST_GET_ERROR_MESSAGE = 'Sorry, there was an error loading the comments. Please try again.';
export const SINGLE_POST_CLICK = 'SINGLE_POST_CLICK';

export const ACTION_REFRESH_NEWS = 'ACTION_REFRESH_NEWS';

export const API_ENDPOINT = 'http://echojs-api.proxima.cc';

export const BUG_REPORT_EMAIL = 'willis.rh@gmail.com';

export const BUG_REPORT_SUBJECT = 'EchoJS Android App Bug Report';

export const BUG_REPORT_BODY = [
  'Time: ' + Date.now(),
  'Version: ' + pkg.version
].join('\s\n');
