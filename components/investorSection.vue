<template>
  <section>
    <h1>Investors</h1>
    <v-row class="my-5" v-if="investors?.length">
      <v-col
        cols="2"
        v-for="(data, data_index) in investors"
        :key="`data_${data_index}`"
      >
        <v-card
          @click="viewInvestorDetails(data)"
          size="128"
          color="primary"
          class="white--text pa-5"
        >
          {{ data?.investorName || `U${data_index + 1}` }}
          <br />
          <v-chip small> Field: {{ data?.investorField || '-' }} </v-chip>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else class="my-5">
      <v-col v-for="data in 2" :key="data">
        <v-skeleton-loader
          class="ma-2"
          width="300"
          height="100"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { collection, query, where, getDocs } from 'firebase/firestore'
export default {
  data() {
    return {
      dataLoading: true,
      investors: [],
    }
  },
  mounted() {
    this.getInvestors()
  },
  methods: {
    viewInvestorDetails(val) {
      if (val) {
        this.$router.push({
          name: 'investors-details',
          query: {
            id: val.id,
          },
          params: {
            data: val,
          },
        })
      }
    },
    getInvestors() {
      const q = query(
        collection(this.$fire.firestore, 'users'),
        where('accountType', '==', 'investor')
      )
      this.dataLoading = true
      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.investors.push({
              id: doc.id,
              ...doc.data(),
            })
          })
          console.log(this.investors)
        })
        .catch((error) => {
          console.log('Error getting documents: ', error)
        })
        .finally(() => {
          this.dataLoading = false
        })
    },
  },
}
</script>

<style>
</style>
