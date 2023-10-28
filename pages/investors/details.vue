<template>
  <v-container>
    <h1 class="tw-text-2xl">Investor Details</h1>
    <v-card outlined class="pa-5 my-5">
      <v-row>
        <v-col cols="6">
          <v-card-title>
            <h2 class="tw-text-2xl">{{ $route.params.data?.investorName }}</h2>
          </v-card-title>
          <v-card-text>
            <p>
              <strong>Investor Type:</strong>
              {{ $route.params.data?.investorType }}
              <v-text-field dense hide-details></v-text-field>
            </p>
            <p>
              <strong>Investor Email:</strong>
              {{ $route.params.data?.email }}
            </p>
            <p>
              <strong>Investor Phone:</strong>
              {{ $route.params.data?.phone }}
            </p>
            <p>
              <strong>Investor Address:</strong>
              {{ $route.params.data?.address }}
            </p>
            <p>
              <strong>Investor City:</strong>
              {{ $route.params.data?.city }}
            </p>
            <p>
              <strong>Investor State:</strong>
              {{ $route.params.data?.state }}
            </p>
            <p>
              <strong>Investor Country:</strong>
              {{ $route.params.data?.country }}
            </p>
            <p>
              <strong>Investor Zip:</strong>
              {{ $route.params.data?.zip }}
            </p>
          </v-card-text>
        </v-col>
        <v-col cols="6">
          <v-card-title>
            <h2 class="tw-text-2xl">Investor Interests</h2>
          </v-card-title>
          <v-card-text>
            <p>
              <strong>Investor Industry:</strong>
              {{ $route.params.data?.industry }}
            </p>
            <p>
              <strong>Investor Investment Type:</strong>
              {{ $route.params.data?.investmentType }}
            </p>
            <p>
              <strong>Investor Investment Amount:</strong>
              {{ $route.params.data?.investmentAmount }}
            </p>
            <p>
              <strong>Investor Investment Stage:</strong>
              {{ $route.params.data?.investmentStage }}
            </p>
            <p>
              <strong>Investor Investment Location:</strong>
              {{ $route.params.data?.investmentLocation }}
            </p>
            <p>
              <strong>Investor Investment Timeframe:</strong>
              {{ $route.params.data?.investmentTimeframe }}
            </p>
            <p>
              <strong>Investor Investment Description:</strong>
              {{ $route.params.data?.investmentDescription }}
            </p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
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
    // Get investor details from userID
    const q = query(
      collection(this.$fire.firestore, 'users'),
      where('accountType', '==', 'investor')
    )
    this.dataLoading = true
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.investors.push({
          id: doc.id,
          ...doc.data(),
        })
      })
    })
  },
}
</script>

<style>
</style>