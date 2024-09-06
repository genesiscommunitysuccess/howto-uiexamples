import { CardItem } from '../routes/list-item-detail/list-item-detail';
import { convertSnakeToCamel } from './util';

export const createCardConfig = (entity, keys: string[]): CardItem[] =>
  keys.map((label) => ({
    label: convertSnakeToCamel(label),
    value: entity[label],
  }));
