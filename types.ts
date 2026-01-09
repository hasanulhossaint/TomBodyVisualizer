
export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum UnitSystem {
  METRIC = 'metric',
  IMPERIAL = 'imperial'
}

export enum ViewMode {
  FRONT = 'front',
  SIDE = 'side'
}

export enum VisualType {
  TWO_D = '2d',
  THREE_D = '3d'
}

export interface BodyStats {
  height: number; // cm
  weight: number; // kg
  gender: Gender;
  age: number;
}

export interface HealthMetrics {
  bmi: number;
  category: string;
  categoryColor: string;
  bodyFatEstimate: number;
  idealWeightRange: [number, number];
}
