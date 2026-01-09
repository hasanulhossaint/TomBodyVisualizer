
import { Gender } from './types';

export const BMI_CATEGORIES = [
  { label: 'Underweight', min: 0, max: 18.5, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Normal', min: 18.5, max: 24.9, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Overweight', min: 25, max: 29.9, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { label: 'Obese', min: 30, max: 100, color: 'text-red-500', bg: 'bg-red-50' },
];

export const INITIAL_STATS = {
  height: 175,
  weight: 72,
  gender: Gender.MALE,
  age: 28
};
