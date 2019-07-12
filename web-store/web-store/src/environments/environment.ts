import { base } from './environment.base';

base.production = false;
base.API.BASE_URL = 'http://localhost:8080/api/';

export const environment = base;
