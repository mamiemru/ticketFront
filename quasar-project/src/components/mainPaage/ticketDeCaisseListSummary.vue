<template>
  <div class="" style="max-width: 300px">
    <q-list dense bordered separator padding class="rounded-borders">
        <q-item @click="goToTdc(ticket)" clickable v-ripple v-for="ticket in ticketDeCaisses" :key="ticket.id">
            <q-item-section >
                <q-item-label class="row justify-between">
                  <small>{{ ticket.shop.name }} - {{ ticket.shop.localisation }}</small>
                  <small>{{ ticket.total }}€</small>
                </q-item-label>
                <q-item-label caption class="row justify-between">
                  <small>{{ ticket.category.name }}</small>
                  <small>{{ ticket.date }}</small>
                </q-item-label>
            </q-item-section>
        </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TicketDeCaisseHeaderResponse } from '../../models/models';

import TicketdecaisseApi from '../../api/ticketdecaisseApi'

export default defineComponent({
  name: 'TicketDeCaisseListSummary',
  props: {},
  data() {
    return {
      ticketDeCaisses: [] as TicketDeCaisseHeaderResponse[]
    }
  },
  mounted() {
      TicketdecaisseApi.getTicketDeCaisseList(21)
      .then((r) => {
          console.log(r);
          this.ticketDeCaisses = r.data;
      })
      .catch((r) => {
          console.log(r);
      })
  },
  methods: {
    goToTdc(tdc: TicketDeCaisseHeaderResponse) {
      this.$router.push({ path: '/tdc/' + tdc.id, params: { tdcId: tdc.id } });
    }
  }
});
</script>
