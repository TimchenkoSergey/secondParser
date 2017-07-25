import Sequelize from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(
    config.get('db:name'),
    config.get('db:userName'),
    config.get('db:password'),
    { logging: true }
);

/**
 * @function
 * @name dbInit
 * @description
 * Создаем соединение с базой.
 **/
export async function dbInit() {
    try {
        await sequelize.authenticate();
        
        return { Sequelize, sequelize };
    }
    catch (err) {
        console.log(err);
    }
}