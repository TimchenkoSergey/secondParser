import config from './config';
import { FORM_MOCK_DATA } from './lib/formMockData';

export const SEARCH_URL = config.get('baseUrl');
export const PATH_TO_IMAGES = config.get('pathToImages');
export const LOCATIONS = config.get('locations');
export const REQUEST_CARS_OPTIONS = {
    url: SEARCH_URL,
    form: FORM_MOCK_DATA,
    method: 'post'
};