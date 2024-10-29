export interface Province {
  id: number;
  name: string;
}

export interface Amphur {
  id: number;
  name: string;
  province_id: number;
}

export interface Tambon {
  id: number;
  name: string;
  amphure_id: number;
}

export interface Address {
  place: string;
  province: string;
  amphur: string;
  tambon: string;
}
