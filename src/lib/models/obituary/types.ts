export type ObituaryType =
  | 'in-memoriam'
  | 'obituary'
  | 'gratitude-display'
  | 'last-greetings'

export type FaithType = 'christian' | 'muslim'

export interface IObituary extends Record<string, any> {
  firstname: string
  surname: string
  middlename?: string
  date_of_birth: string
  date_of_death: string
  image?: string
  type: ObituaryType
  long_text?: string
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

export interface IObituaryInput {
  firstname: string
  middlename?: string
  surname: string
  date_of_birth: string
  date_of_death: string
  relative?: string
  long_text?: string
  image?: string
  type?: ObituaryType
  faith?: FaithType
}
