var state = () => ({
  isAuthenticated: false,
})

const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated
  },
}

const mutations = {
  authenticate(state, payload) {
    state.isAuthenticated = payload
  },
}

const actions = {
  authenticate({ commit }, payload) {
    commit('authenticate', payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
