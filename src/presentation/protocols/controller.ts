import { HttpResponse } from '../../presentation/protocols'

export interface Controller<T = any> {
  handler: (request: T) => Promise<HttpResponse>
}
