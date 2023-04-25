import { ObjectId } from 'mongodb'
import { Richtext } from 'storyblok-js-client'

export type ObituaryType =
  | 'in-memoriam'
  | 'obituary'
  | 'gratitude-display'
  | 'last-greetings'

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
  appreciations: number
  crawl_key: string
}
