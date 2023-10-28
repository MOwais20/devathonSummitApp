<template>
  <v-container class="tw-h-full">
    <v-row>
      <v-col
        cols="12"
        md="3"
        lg="3"
        xl="3"
        v-for="(card, card_index) in dashboardCards"
        :key="card_index"
      >
        <v-card
          v-if="!dataLoading"
          rounded="md"
          class="my-2 outlined"
          color="secondary"
          flat
          height="100"
          @click="$router.push(card.route)"
        >
          <v-card-text class="black--text">
            <span class="font-weight-bold">{{ card.text }}</span>
            <h1 class="py-1 display-2 font-weight-bold">
              {{ card.value }}
            </h1>
          </v-card-text>
        </v-card>

        <v-skeleton-loader
          v-else
          class="ma-2"
          width="300"
          height="100"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row class="tw-h-full">
      <v-col>
        <v-form ref="productForm">
          <v-card
            max-width="600"
            class="pa-5 mx-auto my-5"
            color="grey lighten-5"
            flat
            rounded="xl"
          >
            <v-img
              contain
              class="rounded-xl my-3"
              height="200"
              src="/images/startup_banner.png"
              lazy-src="/images/startup_banner.png"
            ></v-img>

            <div>
              <label for="productName">Startup Idea Title</label>
              <v-text-field
                v-model="ideaData.title"
                :rules="[(v) => !!v || 'Title is required']"
                placeholder="Idea Name"
                background-color="white"
                outlined
                dense
              >
              </v-text-field>
            </div>

            <div>
              <label for="productName">Describe Your Idea </label>
              <v-select
                v-model="ideaData.ideaStage"
                :rules="[(v) => !!v || 'Idea Stage is required']"
                :items="startUpStages"
                background-color="white"
                placeholder="Choose your Startup/Idea stage"
                outlined
                dense
              >
              </v-select>
            </div>

            <div>
              <label for="productName">Describe Your Idea </label>
              <v-textarea
                v-model="ideaData.idea"
                :rules="[(v) => !!v || 'Idea is required']"
                auto-grow
                rows="5"
                placeholder="Tell us about your idea briefly..."
                background-color="white"
                outlined
                dense
              >
              </v-textarea>
            </div>

            <div>
              <label for="productName">Business Model: </label>
              <v-textarea
                :rules="[(v) => !!v || 'Business Model is required']"
                v-model="ideaData.businessModel"
                auto-grow
                rows="3"
                placeholder="Explain your business model in detail..."
                background-color="white"
                outlined
                dense
              >
              </v-textarea>
            </div>

            <v-card-actions>
              <v-btn
                :loading="loader"
                @click="submitIdea"
                block
                height="45"
                rounded
                color="primary"
                depressed
                dark
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-col align="center" align-self="center">
        <v-avatar size="128" class="my-5">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <h1 class="tw-text-2xl text-center">
          <span class="tw-text-6xl primary--text">"</span>We believe that
          innovation can come from anywhere, and we're excited to hear your
          unique ideas. By submitting your startup concept, you'll have the
          chance to be a part of the next big thing. Whether you have a fully
          developed plan or just a spark of inspiration, we're here to help
          bring your vision to life. Let's get started!
          <span class="tw-text-4xl primary--text">"</span>
          <br /><small class="primary--text tw-text-2xl">~ Nelson Mark</small>
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loader: false,
      dataLoading: false,
      dashboardCards: [
        {
          text: 'Ideas',
          value: 0,
          route: '#',
        },
        {
          text: 'Investors',
          value: 0,
          route: '#',
        },
        {
          text: 'Product Owners',
          value: 0,
          route: '#',
        },
      ],
      startUpStages: [
        'Concept / Idea Stage',
        'Planning Research',
        'Seed Stage',
        'Early Stage',
        'Mid Stage',
      ],
      ideaData: {
        title: null,
        idea: null,
        ideaStage: null,
        businessModel: null,
        userId: null,
      },
    }
  },
  computed: {
    user() {
      return this.$fire?.auth?.currentUser
    },
  },
  methods: {
    async submitIdea() {
      this.loader = true
      const db = await this.$fire.firestore
      db.collection('startupIdeas')
        .doc(this.user.uid)
        .set({
          ...this.ideaData,
          userId: this.user?.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then((response) => {
          // show toast
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: 'top-end',
            icon: 'success',
            text: 'Idea submitted.',
            width: 500,
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            },
          })

          this.$router.push('/')
        })
        .catch((error) => {
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: 'top-end',
            icon: 'error',
            text: error?.message || 'Error',
            width: 500,
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            },
          })
        })
        .finally(() => {
          this.loader = false
        })
    },
  },
}
</script>

<style>
</style>