<template>
  <v-container>
    <h1 class="tw-text-4xl tw-font-bold">Dashboard</h1>

    <!-- <v-row>
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
    </v-row> -->

    <div>
      <ProductOwnerSection v-if="user?.accountType === 'productOwner'" />
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  middleware: 'auth',
  data() {
    return {
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
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
}
</script>
