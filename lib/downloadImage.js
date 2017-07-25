import fs from 'fs';
import { sendRequest } from './sendRequest';
import { getFileName } from './getFileName';
import { isFileExists } from './isFileExists';
import { PATH_TO_IMAGES } from '../constants';

/**
 * @function
 * @name downloadImage
 * @description
 * Сохраняет изображение на диск.
 *
 * @param {string} imageUrl URL изображения.
 * @return {string | object} path Путь к изображению на диске,
 * или Promise при успешном выполнение которого будет возврашен тотже путь,
 * или при неуспешном выполнении - обьект ошибки.
 **/
export async function downloadImage(imageUrl) {
    try {
        const fileName = getFileName(imageUrl);
        const path     = PATH_TO_IMAGES + fileName;
        const exists   = await isFileExists(path);

        if (!exists) {
            //Получаем объект с изображением в бинарном виде.
            const response = await sendRequest({ url: imageUrl, encoding : 'binary', method: 'get' });

            return new Promise(function (resolve, reject) {
                fs.writeFile(path, response.res.body, { encoding : 'binary' }, function (err) {
                    if (err) {
                        reject(err);
                    }

                    resolve(path);
                });
            });
        }
        else {
            return path;
        }
    }
    catch (err) {
        console.error(err);
    }
}