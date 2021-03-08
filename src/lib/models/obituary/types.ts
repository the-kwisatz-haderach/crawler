import { Optional } from '../../../utility-types'

export enum ObituaryType {
  IN_MEMORIAM = 'IN_MEMORIAM',
  OBITUARY = 'OBITUARY',
  GRATITUDE_DISPLAY = 'GRATITUDE_DISPLAY'
}

export type Obituary = {
  firstname: string
  middlename: string
  surname: string
  dateOfBirth: string | null
  dateOfDeath: string | null
  imgUrl: string
  type: ObituaryType
  description: string
  relative: string
}

export type ObituaryInput = Optional<
  Obituary,
  'description' | 'imgUrl' | 'type' | 'relative' | 'middlename'
>
