export interface Project {
  name: string;
  id: string;
  estimatedCost: number;
  currencyType: string;
  projectType: string;
  description: string;
  address: string;
  userId: string;
  photos: Photos;
  products: Products;
  createdAt: string;
}

export interface Photos {
  id: string;
  projectId: string;
  link: string;
  isMain: boolean;
}

export interface Products {
  name: string;
  id: string;
  projectId: string;
  amount: number;
  investments: Investment[];
}

export interface Investment {
  id: string;
  productId: string;
  userId: string;
  amount: number;
  createdAt: string;
}
