<template>
  <div class="d-flex align-center">
    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            rounded
            height="45"
            plain
            :class="$vuetify.breakpoint.smAndUp ? 'white' : 'transparent'"
            color="white"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <div class="d-flex align-center">
              <v-avatar :style="{ border: `1px solid #061C68` }" :size="32">
                <v-icon color="primary">mdi-account-circle</v-icon>
              </v-avatar>
              <template v-if="$vuetify.breakpoint.smAndUp">
                <span
                  v-if="user?.displayName"
                  class="text-capitalize black--text mx-2"
                  >{{ user.displayName }}</span
                >
                <span v-else class="text-capitalize black--text mx-2"
                  >User
                </span>
              </template>
            </div>
          </v-btn>
        </template>
        <v-list class="py-1 pb-0" dense>
          <template v-if="user?.email">
            <v-list-item>
              <v-list-item-title class="text-lowercase">
                <v-chip small>
                  {{ user.email }}
                </v-chip>
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
          </template>

          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {
    console.log(this.$fire)
  },
  computed: {
    ...mapState(['user']),
    userData() {
      return this.$fire?.auth?.currentUser
    },
    userImage() {
      // if (this.$auth?.user?.account_type === 'patient') {
      //   return 'https://previsit.s3.amazonaws.com/279035391124904831690874747436patient.jpeg'
      // } else {
      //   return 'https://previsit.s3.amazonaws.com/68239508669518731690874772561doctor.jpeg'
      // }
    },
  },
  methods: {
    async logout() {
      await this.$fire.auth
        .signOut()
        .then(() => {
          // Successfully logged out

          // remove token from local storage
          localStorage.removeItem('investor_hub_token')
          localStorage.removeItem('userData')
          this.$router.push('/login')
        })
        .catch((error) => {
          // Handle logout error
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: 'top-end',
            icon: 'error',
            text: error?.message || 'Something went wrong!',
            showConfirmButton: false,
            width: 500,
            timer: 2000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            },
          })
        })
    },
  },
}
</script>
