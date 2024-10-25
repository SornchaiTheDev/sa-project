export interface Province {
  id: number;
  name: string;
}

export interface Amphure {
  id: number;
  name: string;
  province_id: number;
}

export interface Tambon {
  id: number;
  name: string;
  amphure_id: number;
}
