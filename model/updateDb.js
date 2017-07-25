import { initial } from './initial';

/**
 * @function
 * @name updateDb
 * @description
 * Обновить базу данными.
 **/
export async function updateDb() {
    const models = await initial();
}