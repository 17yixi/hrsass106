import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {}
};
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null,
      removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo }
  },
  removeUserInfo(state) {
    state.userinfo = {}
  }
};
const actions = {
  async login(context, data) {
    const res = await login(data)
    context.commit('setToken', res)
    setTimeStamp()
  },
  async getUserInfo(context) {
    const res = await getUserInfo()
    const baseInfo = await getUserDetailById(res.userId)
    const baseRes = { ...res, ...baseInfo }
    context.commit('setUserInfo', baseRes)
    return res
  },
  logout(context) {
    context.commit('removeToken'),
      context.commit('removeUserInfo')
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

