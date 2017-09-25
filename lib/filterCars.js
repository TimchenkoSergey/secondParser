import { isVolumeLess } from './isVolumeLess';
import { isYearMoreThen } from './isYearMoreThen';

export const filterCars = (car) =>
    isVolumeLess(car) &&
    isYearMoreThen(car) &&
    car.hk === 'YES';