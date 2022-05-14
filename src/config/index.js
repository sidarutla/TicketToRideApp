import * as DEV_CONFIG from './dev.js';
import * as PROD_CONFIG from './prod.js';

let CONFIG = process.env.REACT_APP_DEPLOY === "production" ? PROD_CONFIG : DEV_CONFIG
export default CONFIG;
