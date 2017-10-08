import { isVolumeLess } from './isVolumeLess';
import { isYearMoreThen } from './isYearMoreThen';

export const filterCars = (car) =>
    (isVolumeLess(car) && isYearMoreThen(car) && car.hk === 'YES') ||
    (isYearMoreThen(car) && car.hk === 'YES' && car['ft'] === 'ELECTRIC');