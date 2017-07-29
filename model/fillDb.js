import { initial } from './initial';
import model from './model';

/**
 * @function
 * @name fillDB
 * @description
 * Заполняет базу данными.

 **/
export async function fillDB(cars, maxId = 0) {
    const models = await initial();

    for (let i = 0; i < cars.length; i++) {
        const car = cars[i]['data'] ? cars[i]['data']['lotDetails'] : cars[i];
        try {
            if (car['lotNumberStr']) {
                await model.save(models.car, {
                    car_id: i + maxId + 1,
                    lot_id:           car['lotNumberStr'] ? '' + car['lotNumberStr'] : '',
                    name:             car['ld']           ? '' + car['ld']           : '',
                    year:             car['lcy']          ? '' + car['lcy']          : '',
                    highlights:       car['lcd']          ? '' + car['lcd']          : '',
                    primary_damage:   car['dd']           ? '' + car['dd']           : '',
                    secondary_damage: car['sdd']          ? '' + car['sdd']          : '',
                    est_retail_value: car['la']           ? '' + car['la']           : '',
                    vin:              car['fv']           ? '' + car['fv']           : '',
                    body_style:       car['bstl']         ? '' + car['bstl']         : '',
                    engine_type:      car['egn']          ? '' + car['egn']          : '',
                    drive:            car['drv']          ? '' + car['drv']          : '',
                    transmission:     car['tmtp']         ? '' + car['tmtp']         : '',
                    cylinders:        car['cy']           ? '' + car['cy']           : '',
                    fuel:             car['ft']           ? '' + car['ft']           : '',
                    keys:             car['hk']           ? '' + car['hk']           : '',
                    current_bid:      car['hb']           ? '' + car['hb']           : '',
                    notes:            car['bndc']         ? '' + car['bndc']         : '',
                    buy_it_now:       car['bnp']          ? '' + car['bnp']          : '',
                    location:         car['syn']          ? '' + car['syn']          : '',
                    path_to_image:    car['imageSmall']   ? '' + car['imageSmall']   : '',
                    currency:         car['cuc']          ? '' + car['cuc']          : '',
                    color:            car['clr']          ? '' + car['clr']          : '',
                    sale_date:        car['ad']           ? '' + car['ad']           : '',

                    doc_type:         `${car['ts']} - ${car['td']}`,
                    odometer:         `${car['orr']} mi (${car['ord']})`,
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}