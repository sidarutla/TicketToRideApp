import * as DEV_CONFIG from './dev.js';
import * as PROD_CONFIG from './prod.js';
import * as QA_CONFIG from './qa.js';

const env = process.env.REACT_APP_DEPLOY;

let CONFIG = env === "production" ? PROD_CONFIG : env === "qa" ? QA_CONFIG : DEV_CONFIG
export default CONFIG;
