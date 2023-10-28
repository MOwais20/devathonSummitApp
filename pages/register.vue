<template>
  <section class="tw-h-full">
    <v-row class="tw-h-full">
      <v-col>
        <v-card height="100%" color="primary" outlined flat>
          <v-card-text
            class="d-flex flex-column justify-space-between align-center tw-h-full"
          >
            <h1
              class="align-self-start tw-text-white tw-capitalize tw-text-2xl"
            >
              InvestHub
            </h1>

            <h1
              class="align-self-start tw-text-white tw-capitalize tw-text-4xl"
            >
              Where Visions Take Flight
            </h1>

            <v-card color="white" height="100" width="200"> </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="d-flex flex-column align-center justify-center">
        <v-form ref="registerForm">
          <v-text-field
            v-model="userData.email"
            :rules="emailRules"
            solo
            outlined
            label="Email"
            dense
          >
          </v-text-field>

          <v-text-field
            counter
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-2"
            v-model="userData.password"
            dense
            outlined
            @keyup.enter="submit"
            :rules="[(v) => !!v || 'Password is required']"
            hint="At least 12 characters"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>

          <div class="my-5">
            Already have an account?
            <nuxt-link to="/login">Sign In</nuxt-link>
          </div>

          <v-btn
            @click="register"
            depressed
            height="45"
            color="primary"
            max-width="300"
            rounded
          >
            Register
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      showPassword: false,
      userData: {
        email: null,
        password: null,
      },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    async register() {
      try {
        if (this.$refs.registerForm.validate()) {
          await this.$fire.auth
            .createUserWithEmailAndPassword(
              this.userData.email,
              this.userData.password
            )
            .then((response) => {
              console.log(
                '🚀 ~ file: register.vue:99 ~ .then ~ response:',
                response,
                response.data
              )

              if (response?.user?.uid) {
                // set isAuth to true
                this.$store.commit('authenticate', true)

                // show a toast that account created
                this.$swal.fire({
                  toast: true,
                  timerProgressBar: true,
                  position: 'top-end',
                  icon: 'success',
                  text: 'Account created.',
                  width: 500,
                  showConfirmButton: false,
                  timer: 2000,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                  },
                })

                // move to login page
                this.$router.push('/login')
              }
            })
        }
      } catch (e) {
        // console.log('🚀 ~ file: register.vue:113 ~ register ~ e:', e)
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: 'top-end',
          icon: 'error',
          text: e?.message || 'Something went wrong!',
          showConfirmButton: false,
          width: 500,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
          },
        })
      }
    },
  },
}
</script>

<style>
</style>