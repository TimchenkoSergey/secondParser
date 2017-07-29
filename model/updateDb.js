import { initial } from './initial';
import { fillDB } from './fillDb';
import { sendRequest } from '../lib/sendRequest';
import { getMaxId } from '../lib/getMaxId';
import { downloadImage } from '../lib/downloadImage';
import model from './model';

/**
 * @function
 * @name updateDb
 * @description
 * Обновить базу данными.
 **/
export async function updateDb(cars) {
    const models = await initial();
    const carsInDb = await model.findAll(models.car, {});
    const maxId = getMaxId(carsInDb, 'car_id') + 1;

    //update
    carsInDb.forEach(async function(itemInDb) {
        if (cars.some((item) => itemInDb['lot_id'] === item['lotNumberStr'])) {
            const inPars = cars.find(item => item['lotNumberStr'] === itemInDb['lot_id']);
            if (itemInDb['current_bid'] != inPars['hb']) {
                await model.update(models.car, { lot_id : itemInDb['lot_id'] }, { current_bid : '' + inPars['hb'] });
            }
        }
    });


    //delete
    let forDelete = [];
    carsInDb.forEach((itemInDb) => {
        if (!cars.some((item) => itemInDb['lot_id'] === item['lotNumberStr'])) {
            forDelete.push(itemInDb['lot_id']);
        }
    });

    for (let i = 0; i < forDelete.length; i++) {
        await model.destroy(models.car, { 'lot_id': forDelete[i] });
    }

    //add
    let forAdd = [];
    cars.forEach((item) => {
        if (!carsInDb.some((itemInDb) => itemInDb['lot_id'] === item['lotNumberStr'])) {
            forAdd.push(item['lotNumberStr']);
        }
    });

    let addedElements = [];
    for (let i = 0; i < forAdd.length; i++) {
        const parsinData = await sendRequest({
            method : 'get',
            url : `https://www.copart.com/public/data/lotdetails/solr/${forAdd[i]}`,
            headers : {
                'accept':'application/json, text/plain, *!/!*',
                'accept-language':'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
                'cache-control':'no-cache',
                'cookie':'visid_incap_242093=FlY+KR1MQs6wff6+6lWqPUfKb1kAAAAAQUIPAAAAAACfE8L8Km7jceSGXXtJjpIh; OAGEO=UA%7C%7C%7C%7C%7C%7C%7C%7C%7C%7C; __gads=ID=3ebc2d451cdf6f20:T=1500498631:S=ALNI_Mb0rO7afMrNpGb0x_7vnxMeGFncgg; __cfduid=d228faef0f853614da666a770f4dd4ebc1500498650; g2app.searchResultsPageLength=100; incap_ses_585_242093=KqApZayaHX2glXi5rlYeCFHkdlkAAAAAgLpRdDjhiaczOHgOXFopMg==; G2JSESSIONID=7E91F1B6FB7171BE7730FABE44809939-n2; incap_ses_586_242093=IdwiQK/0LirQ6F5eLeQhCLjUeFkAAAAAPkUfABIwqB511WiuVsZinQ==; incap_ses_583_242093=kez3PHncaAOnK35tsTsXCD3YeFkAAAAAjniwcOmT5+i/xrW3p1OhEw==; _ga=GA1.2.1628767040.1500498597; _gid=GA1.2.1970864806.1501095671; _uetsid=_uet6badf7cf; s_ppv=77; s_cc=true; s_depth=1; s_pv=public%3Alotdetails; s_nr=1501099607594-Repeat; s_vnum=1503090630871%26vn%3D9; s_invisit=true; s_lv=1501099607598; s_lv_s=Less%20than%201%20day; s_sq=%5B%5BB%5D%5D; s_vi=[CS]v1|2CB7E56285310B45-6000010AA000102F[CE]; usersessionid=1e4a3cac16ebec272c21cc19ed4e1f1e; OAID=27f2fbb14febfbe23bf282a8baf4d610; userLang=en_NULL; copartTimezonePref=%7B%22displayStr%22%3A%22EEST%22%2C%22offset%22%3A3%2C%22dst%22%3Atrue%2C%22windowsTz%22%3A%22Europe%2FHelsinki%22%7D; timezone=Europe%2FHelsinki; g2usersessionid=023c5fb0412f4eeeabb81f3a16fe981a; MemberServerPool=G2M',
                'if-modified-since':'Mon, 26 Jul 1997 05:00:00 GMT',
                'pragma':'no-cache',
                'referer':`https://www.copart.com/lot/${forAdd[i]}`,
                'user-agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                'x-requested-with':'XMLHttpRequest'
            }
        });

        if (parsinData.body.indexOf('<') === -1) {
            const carInPA = JSON.parse(parsinData.body);
            carInPA['data']['lotDetails']['imageSmall'] = await downloadImage(carInPA['data']['lotDetails']['tims']);
            addedElements.push(carInPA);

        }
        else {
            const car = cars.find((item) => item['lotNumberStr'] === forAdd[i]);
            car['imageSmall'] = await downloadImage(car['tims']);
            addedElements.push(car);
        }
    }

    await fillDB(addedElements, maxId);
}