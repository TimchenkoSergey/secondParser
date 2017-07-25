import { getCarModel } from './models/carModel';

/**
 * @function
 * @name getTables
 * @description
 * Возвращает объект с объектом таблиц для большего удобства.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект с объектами таблиц.
 **/
export async function getTables(sequelize, Sequelize) {
    const car = await getCarModel(sequelize, Sequelize);

    return {
        car
    };
}