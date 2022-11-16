export interface Data {
  info: Info
  exp: number
  iat: number	
}

interface Info {
  id: number
  name: string
  user: string
  userType: number
  type: Type | null
  level: number
}

interface Type {
  id: number
  status: boolean
  createdAt: string
  user?: Object
  updatedAt: string
  userId: number
}