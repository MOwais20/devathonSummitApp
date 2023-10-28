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

            <!-- <v-card color="white" height="100" width="200"> </v-card> -->
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="d-flex flex-column align-center justify-center">
        <v-form ref="loginForm">
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
            Don't have an account?
            <nuxt-link to="/register">Sign Up</nuxt-link>
          </div>

          <v-btn
            @click="submit"
            :loading="loading"
            depressed
            height="45"
            color="primary"
            max-width="300"
            rounded
          >
            Sign In
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
      loading: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    showToast(type, text) {
      this.$swal.fire({
        toast: true,
        timerProgressBar: true,
        position: 'top-end',
        icon: type,
        text: text,
        showConfirmButton: false,
        timer: 2000,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', this.$swal.stopTimer)
          toast.addEventListener('mouseleave', this.$swal.resumeTimer)
        },
      })
    },
    submit() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true
        this.$fire.auth
          .signInWithEmailAndPassword(
            this.userData.email,
            this.userData.password
          )
          .then(async (userCredential) => {
            if (userCredential?.user?.uid) {
              const user = this.$fire.auth.currentUser
              if (user) {
                const token = await user.getIdToken()
                //  set token
                localStorage.setItem('investor_hub_token', token)

                const userRef = this.$fire.firestore
                  .collection('users')
                  .doc(user?.uid)
                console.log(
                  '🚀 ~ file: default.vue:31 ~ created ~ userRef:',
                  userRef
                )
                const userSnapshot = await userRef.get()
                if (userSnapshot.exists) {
                  const userData = await userSnapshot.data()
                  console.log('User Data:', userData)
                  // Store data in state
                  if (userData) {
                    this.$store.commit('setUser', userData)
                    // save in local storage
                    localStorage.setItem('userData', JSON.stringify(userData))
                  }
                } else {
                  console.error('User data not found.')
                }

                this.$router.push('/')
              }
            }
          })
          .catch((error) => {
            console.log('🚀 ~ file: index.vue:96 ~ submit ~ error:', error)

            this.showToast('error', error?.message || 'Something went wrong!')
            // Handle login error
            console.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>

<style>
</style>