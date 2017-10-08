import fs from 'fs';
import config from './config';
import { sendRequest } from './lib/sendRequest';
import { fillDB } from './model/fillDb';
import { updateDb } from './model/updateDb';
import { downloadImage } from './lib/downloadImage';
import { filterCars } from './lib/filterCars';
import {
    REQUEST_CARS_OPTIONS,
    LOCATIONS
} from './constants';

start();

async function start() {
    const { res } = await sendRequest(REQUEST_CARS_OPTIONS);
    const pars = JSON.parse(res.body);
    const cars = pars.data.results.content.filter((item) => LOCATIONS.includes(item['syn']));
    const filtredCars = cars.filter(filterCars);

    if (config.get('fillDb')) {
        let carsWithFullInfo = JSON.parse(fs.readFileSync('result.json'));

        for (let i = 0; i < carsWithFullInfo.length; i++) {
            carsWithFullInfo[i]['data']['lotDetails']['imageSmall'] = await downloadImage(carsWithFullInfo[i]['data']['lotDetails']['tims']);
        }

        await fillDB(carsWithFullInfo);
    }
    else {
        await updateDb(filtredCars);
    }
}


