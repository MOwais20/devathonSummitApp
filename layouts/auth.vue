<template>
  <v-app dark>
    <v-main>
      <v-container fluid class="tw-h-full">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
  
  <script>
export default {
  name: 'authGateLayout',
  data() {
    return {
      fixed: false,
    }
  },
}
</script>
  