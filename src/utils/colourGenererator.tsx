
import {colours} from '../config/colours';

export const getColourForIndex = (index: number): string => {
  if ( index < colours.length ) {
    return colours[index];
  } else {
    return '#000000';
  }
};

export const getRandomColour = () => {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getRandomColourForCount = (count: number) => {
  const data =[];
  for (let i = 0; i < count; i++) {
    data.push(getRandomColour());
  }
  return data;
};
