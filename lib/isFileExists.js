import fs from 'fs';

/**
 * @function
 * @name isFileExists
 * @description
 * Проверяет существует ли файл по указанному пути.
 *
 * @param {string} path Путь к файлу.
 * @return {object} str Объект Promise в функцию успешного выполнения которого передается булево значение,
 * true если файл есть и false если нет.
 **/
export function isFileExists(path) {
    return new Promise(function (resolve) {
        fs.exists(path, function (exists) {
            resolve(exists);
        });
    });
}