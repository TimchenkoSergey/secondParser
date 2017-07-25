import request from 'request';

/**
 * @function
 * @name sendRequest
 * @description
 * Отправляет запрос.
 *
 * @param {object} options Объект с конфигурациями для отправки запроса, указывается свойства method, url, encoding...
 * @return {object} request Объект Promise в функцию успешного выполнения которого передается объект с ответом,
 * а в функцию неуспешного выполнения которого передается объект ошибки.
 **/
export async function sendRequest(options) {
    return new Promise(function (resolve, reject) {
        request[options.method](options, function (err, res, body) {
            if (err) {
                reject(err);
            }
            
            resolve({ res, body });
        });
    });
}