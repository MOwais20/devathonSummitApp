<template>
  <section class="tw-h-full">
    <v-row class="tw-h-full">
      <v-col cols="5">
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
        <v-card
          flat
          class="pa-5"
          :width="$vuetify.breakpoint.mobile ? 'auto' : 400"
        >
          <v-form ref="registerForm">
            <h2>Register as</h2>
            <div class="d-flex justify-start align-center my-3 mb-7">
              <v-btn
                @click="userData.accountType = 'investor'"
                outlined
                class="mx-2"
                :class="
                  userData.accountType === 'investor'
                    ? 'primary white--text'
                    : 'blue lighten-4'
                "
              >
                Investor
              </v-btn>
              <v-btn
                @click="userData.accountType = 'productOwner'"
                outlined
                class="mx-2"
                :class="
                  userData.accountType === 'productOwner'
                    ? 'primary white--text'
                    : 'blue lighten-4'
                "
              >
                Product Owner
              </v-btn>
            </div>

            <v-text-field
              v-model="userData.email"
              :rules="emailRules"
              solo
              outlined
              label="Email"
            >
            </v-text-field>

            <template v-if="userData.accountType === 'investor'">
              <v-text-field
                v-model="userData.investorName"
                :rules="[() => !!userData.investorName || 'Name is required']"
                solo
                outlined
                label="Your Name"
              >
              </v-text-field>

              <v-text-field
                v-model="userData.investorField"
                :rules="[
                  () => !!userData.investorField || 'investorField is required',
                ]"
                solo
                outlined
                label="Field"
              >
              </v-text-field>
            </template>

            <v-text-field
              counter
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-2"
              v-model="userData.password"
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
        </v-card>
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
        accountType: null,
        investorName: null,
        investorField: null,
      },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  created() {
    console.log(this.$fire.firestore)
  },
  methods: {
    async register() {
      try {
        if (!this.userData.accountType) {
          // Show alert
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: 'top-end',
            icon: 'error',
            text: 'Select account type',
            width: 500,
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            },
          })
          return
        }

        if (this.$refs.registerForm.validate()) {
          await this.$fire.auth
            .createUserWithEmailAndPassword(
              this.userData.email,
              this.userData.password
            )
            .then((response) => {
              if (response?.user?.uid) {
                // set isAuth to true
                this.$store.commit('authenticate', true)

                // Store user data in Firestore with the user's UID as the document ID
                const user = response?.user
                const db = this.$fire.firestore
                db.collection('users')
                  .doc(user.uid)
                  .set({
                    accountType: this.userData.accountType,
                    investorField: this.userData.investorField,
                    investorName: this.userData.investorName,
                  })
                  .then(() => {
                    console.log('User data stored in Firestore')
                  })
                  .catch((error) => {
                    console.error('Error storing user data:', error)
                  })

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