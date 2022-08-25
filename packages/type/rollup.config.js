import * as pkg from './package.json';
import config from '../../rollup.config';

config[0].output.name = 'wuiType';
config[1].external = Object.keys(pkg.dependencies);

export default config;