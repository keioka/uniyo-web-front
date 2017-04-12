import { sagas } from 'uniyo-redux'
import localStorageSaga from './localStorage'

export default {
  ...sagas,
  ...localStorageSaga,
}
