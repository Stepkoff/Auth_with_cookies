export interface User {
  createdAt: string
  deletedAt: null | string
  email: string
  firstName: string
  id: number
  lastName: string
  photo: null | string
  provider: string
  role: {
    id: number
    name: string
    __entity: string
  }
  socialId: null | string
  status: {
    id: number
    name: string
    __entity: string
  }
  updatedAt: string
  __entity: string
}