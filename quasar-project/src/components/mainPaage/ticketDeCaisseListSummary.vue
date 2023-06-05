<template>
  <div class="" style="max-width: 300px; height: 100vh">
    <q-circular-progress v-if="is_loading" indeterminate rounded size="50px" color="blue" class="q-ma-md flex flex-center" />
    <div v-else-if="datas && datas.length === 0" class="row justify-center" style="border-right: grey solid 1px; height: 100vh">
      Your ticket history is empty
    </div>
    <q-list v-else dense bordered separator padding class="rounded-borders">
        <q-item @click="goToTdc(ticket)" clickable v-ripple v-for="ticket in datas" :key="ticket.id">
            <q-item-section >
                <q-item-label class="row justify-between">
                  <small>{{ ticket.shop.name }} - {{ ticket.shop.city }}</small>
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
import { useQuasar } from 'quasar'

import { TicketDeCaisseHeaderResponse } from '../../models/models';

import axiosErrorLayoutVue from '../../layouts/axiosErrorLayout.vue';

import TicketdecaisseService from '../../service/TicketdecaisseService'

export default defineComponent({
  name: 'TicketDeCaisseListSummary',
  props: {},
  data() {
    return {
      is_loading: true,
      datas: [] as TicketDeCaisseHeaderResponse[]
    }
  },
  setup() {
    const q = useQuasar();
    return { q }
  },
  mounted() {
    TicketdecaisseService.getTicketDeCaisseList(21)
    .then((r) => { this.datas = r.data; this.is_loading = false; })
    .catch((error) => {
      this.q.dialog({
        component: axiosErrorLayoutVue,
        componentProps: { response: error.response }
      })
    })
  },
  methods: {
    goToTdc(tdc: TicketDeCaisseHeaderResponse) {
      this.$router.push({ path: '/tdc/' + tdc.id, params: { tdcId: tdc.id } });
    }
  }
});
</script>
