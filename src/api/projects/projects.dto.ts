export interface CreateProjectDto {
  name: string
  description: string
  address: string
  images: {
    link: string,
    isMain: boolean
  }[]
  product: {
    name: string
    amount: number
  }[]
}