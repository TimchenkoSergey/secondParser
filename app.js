import { sendRequest } from './lib/sendRequest';
import { fillDB } from './model/fillDb';
import { downloadImage } from './lib/downloadImage';
import {
    REQUEST_CARS_OPTIONS,
    LOCATIONS
} from './constants';

start();

async function start() {
    const { res } = await sendRequest(REQUEST_CARS_OPTIONS);
    const pars = JSON.parse(res.body);
    const cars = pars.data.results.content.filter((item) => LOCATIONS.includes(item['syn']));

    for (let i = 0; i < cars.length; i++) {
        cars[i].imageSmall = await downloadImage(cars[i]['tims']);
    }

    await fillDB(cars);
}