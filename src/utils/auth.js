import Cookies from 'js-cookie'

const TokenKey = 'hrsaas_ihrm_token'
const timeKey = 'hrsaas_timestamp_key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getTimeStamp() {
  return Cookies.get(timeKey)
}

export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}