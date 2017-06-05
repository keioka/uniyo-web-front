import { regex } from '../'

export const extractHashtagFromText = text => text.match(regex.hashtag) || []
