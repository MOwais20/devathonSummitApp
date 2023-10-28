var state = () => ({
  isAuthenticated: false,
  user: null,
})

const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated
  },
  user(state) {
    return state.user
  },
}

const mutations = {
  authenticate(state, payload) {
    state.isAuthenticated = payload
  },
  setUser(state, payload) {
    state.user = payload
  },
}

const actions = {
  authenticate({ commit }, payload) {
    commit('authenticate', payload)
  },
  setUser({ commit }, payload) {
    commit('setUser', payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
