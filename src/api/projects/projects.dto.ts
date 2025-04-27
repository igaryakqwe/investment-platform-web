export interface CreateProjectDto {
  name: string;
  description: string;
  address: string;
  userId: string;
  photos: {
    link: string;
    isMain: boolean;
  }[];
  product: {
    name: string;
    amount: number;
  }[];
}

export interface CreateInvestmentDto {
  userId: string;
  amount: number;
  productId: string;
}
