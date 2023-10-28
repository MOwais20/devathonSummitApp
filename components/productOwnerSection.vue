<template>
  <section>
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

    <v-card
      class="pa-5"
      outlined
      flat
      color="grey lighten-4"
      height="150"
      rounded="lg"
    >
      <v-row class="tw-h-full">
        <v-col align-self="center">
          <h1 class="tw-text-2xl">
            Share Your Creative Insights: Submit Your Innovative Ideas Now!
          </h1>
        </v-col>
        <v-col align="right" align-self="center">
          <v-btn
            to="/product/ideas-submission"
            nuxt
            rounded
            height="45"
            depressed
            color="primary"
          >
            Submit Here
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-card flat class="pa-5 my-5" outlined>
      <h2>Submitted Ideas</h2>
      <v-data-table :items="submittedIdeas" :headers="headers"></v-data-table>
    </v-card>
  </section>
</template>

<script>
import { collection, query, where, getDocs } from 'firebase/firestore'
export default {
  data() {
    return {
      dataLoading: false,
      submittedIdeas: [],
      headers: [
        {
          text: 'Idea Title',
          align: 'start',
          value: 'title',
        },
        {
          text: 'Idea Stage',
          value: 'ideaStage',
        },
      ],
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
      investors: [],
      productOwners: [],
    }
  },
  computed: {
    user() {
      return this.$fire?.auth?.currentUser
    },
  },
  mounted() {
    this.getSubmittedIdeas()
    this.getInvestors()
    this.getProductOwners()
  },
  methods: {
    getProductOwners() {
      const q = query(
        collection(this.$fire.firestore, 'users'),
        where('accountType', '==', 'productOwner')
      )

      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.productOwners.push(doc.data())
          })

          // add investors length in dashboard data
          this.dashboardCards[2].value = this.productOwners.length
        })
        .catch((error) => {
          console.log('Error getting documents: ', error)
        })
    },
    getInvestors() {
      const q = query(
        collection(this.$fire.firestore, 'users'),
        where('accountType', '==', 'investor')
      )

      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.investors.push(doc.data())
          })

          // add investors length in dashboard data
          this.dashboardCards[1].value = this.investors.length
        })
        .catch((error) => {
          console.log('Error getting documents: ', error)
        })
    },
    moveTo() {
      this.$router.push('/product/ideas-submission')
    },
    async getSubmittedIdeas() {
      // // Access Firestore using this.$fire.firestore
      // const firestore = this.$fire.firestore
      // // Query the "your_collection" collection
      // const query = firestore.collection('startupIdeas')
      // // Apply a where clause to filter data
      // query = query.where('userId', '==', this.user?.uid) // Replace 'field_to_filter' and 'filter_value'
      // // Execute the query
      // const querySnapshot = await query.get()
      // // Iterate through the results
      // querySnapshot.forEach((doc) => {
      //   const data = doc.data()
      //   console.log('Filtered Data:', data)
      // })
      const userRef = this.$fire.firestore.collection('startupIdeas')
      // .doc(this.user?.uid)
      const userSnapshot = await userRef.get()
      // Iterate through the results
      userSnapshot.forEach((doc) => {
        const data = doc.data()
        console.log('Document ID:', doc.id, 'Data:', data)
        this.submittedIdeas.push({
          id: doc.id,
          ...data,
        })
      })

      // add length of submitted ideas to dashboard card
      this.dashboardCards[0].value = this.submittedIdeas.length

      if (userSnapshot.exists) {
        const userData = await userSnapshot.data()
        // Store data in state
        if (userData) {
          console.log(
            '🚀 ~ file: productOwnerSection.vue:59 ~ getSubmittedIdeas ~ userData:',
            userData
          )
        }
      } else {
        console.error('User data not found.')
      }
    },
  },
}
</script>

<style>
</style>