/**
 * @function
 * @name getBetModel
 * @description
 * Модель описывающая таблицу ставок букмекеров на игры.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
export async function getCarModel(sequelize, Sequelize) {
    const car = sequelize.define('car', {
        car_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        lot_id           : Sequelize.TEXT,
        name             : Sequelize.TEXT,
        year             : Sequelize.TEXT,
        doc_type         : Sequelize.TEXT,
        odometer         : Sequelize.TEXT,
        highlights       : Sequelize.TEXT,
        primary_damage   : Sequelize.TEXT,
        secondary_damage : Sequelize.TEXT,
        est_retail_value : Sequelize.TEXT,
        vin              : Sequelize.TEXT,
        body_style       : Sequelize.TEXT,
        engine_type      : Sequelize.TEXT,
        drive            : Sequelize.TEXT,
        transmission     : Sequelize.TEXT,
        cylinders        : Sequelize.TEXT,
        fuel             : Sequelize.TEXT,
        keys             : Sequelize.TEXT,
        current_bid      : Sequelize.TEXT,
        notes            : Sequelize.TEXT,
        buy_it_now       : Sequelize.TEXT,
        location         : Sequelize.TEXT,
        path_to_image    : Sequelize.TEXT,
        currency         : Sequelize.TEXT
    });

    await car.sync();

    return car;
}