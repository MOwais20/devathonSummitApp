<template>
  <v-app dark>
    <Header />
    <v-main>
      <v-container fluid class="tw-h-full pa-0">
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: 'auth',
  data() {
    return {
      fixed: false,
    }
  },
  mounted() {
    const userData = localStorage.getItem('userData')
    if (userData) {
      this.$store.commit('setUser', JSON.parse(userData))
    }

    // Check Token
    const token = localStorage.getItem('investor_hub_token')
    if (token) this.$store.commit('authenticate', true)
    else this.$store.commit('authenticate', false)
  },
}
</script>
