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
}
</script>
