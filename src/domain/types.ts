import { Richtext } from 'storyblok-js-client'

export type ObituaryType =
  | 'in-memoriam'
  | 'obituary'
  | 'gratitude-display'
  | 'last-greetings'

export type FaithType = 'christian' | 'muslim'

export interface IAppreciation {
  _id: string
  quantity: number
}

export interface IObituary extends Record<string, unknown> {
  firstname: string
  surname: string
  name_misc?: string
  date_of_birth: string
  date_of_death: string
  image?: string
  type: ObituaryType
  long_text?: Richtext | string
  relative?: string
  city?: string
  size?: 'regular' | 'large'
  additional_information?: string
  preamble?: string
  date_created: string
  date_updated?: string
  faith?: FaithType
  is_crawled: boolean
}

export interface IObituaryInput extends Record<string, unknown> {
  firstname: string
  name_misc?: string
  surname: string
  date_of_birth: string
  date_of_death: string
  relative?: string
  long_text?: string
  image?: string
  type?: ObituaryType
  faith?: FaithType
}
