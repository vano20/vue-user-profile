import AuthRepository from './AuthRepository'
import UserRepository from './UserRepository'

const repositories = {
  'auth': AuthRepository,
  'user': UserRepository
}

export default {
    get: name => repositories[name]
}