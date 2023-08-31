import { ObjectId } from 'mongodb'

export type ObituaryType =
  | 'in-memoriam'
  | 'obituary'
  | 'gratitude-display'
  | 'last-greetings'
  | 'thank-you'

export type FaithType = 'christian' | 'muslim'

export interface IObituary {
  _id?: ObjectId
  storyId?: number
  firstname: string
  surname: string
  name_misc?: string
  prefix?: string
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
  appreciations: number
  crawl_key: string
}
