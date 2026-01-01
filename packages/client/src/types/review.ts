export type Review = {
  id: number
  title: string
  content: string
  published: boolean
  rating: number
  productId: number
  createdAt: string
  updatedAt: string
  author: Author
}

export type Author = {
  name: string
  email: string
}
