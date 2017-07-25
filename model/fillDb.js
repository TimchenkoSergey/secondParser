import { initial } from './initial';
import model from './model';

/**
 * @function
 * @name fillDB
 * @description
 * Заполняет базу данными.

 **/
export async function fillDB(cars) {
    const models = await initial();

    for (let i = 0; i < cars.length; i++) {
        try {
            await model.save(models.car, {
                car_id: i,
                lot_id: '' + cars[i]['lotNumberStr'],
                name: '' + cars[i]['ld'],
                year: '' + cars[i]['lcy'],
                doc_type: `${cars[i]['ts']} - ${cars[i]['td']}`,
                odometer: `${cars[i]['orr']} mi (${cars[i]['ord']})`,
                highlights: '' + cars[i]['lcd'],
                primary_damage: '' + cars[i]['dd'],
                secondary_damage: '' + cars[i]['sdd'],
                est_retail_value: '' + cars[i]['la'],
                vin: '' + cars[i]['fv'],
                body_style: '' + cars[i]['bstl'],
                engine_type: '' + cars[i]['egn'],
                drive: '' + cars[i]['drv'],
                transmission: '' + cars[i]['tmtp'],
                cylinders: '' + cars[i]['cy'],
                fuel: '' + cars[i]['ft'],
                keys: '' + cars[i]['hk'],
                current_bid: '' + cars[i]['hb'],
                notes: '' + cars[i]['bndc'],
                buy_it_now: '' + cars[i]['bnp'],
                location: '' + cars[i]['syn'],
                path_to_image: '' + cars[i]['imageSmall'],
                currency: '' + cars[i]['cuc']
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}