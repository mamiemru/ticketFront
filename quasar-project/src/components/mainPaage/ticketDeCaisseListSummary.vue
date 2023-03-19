<template>
  <div class="" style="max-width: 300px">
    <q-circular-progress v-if="is_loading" indeterminate rounded size="50px" color="blue" class="q-ma-md flex flex-center" />
    <q-list v-else dense bordered separator padding class="rounded-borders">
        <q-item @click="goToTdc(ticket)" clickable v-ripple v-for="ticket in ticketDeCaisses" :key="ticket.id">
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
      ticketDeCaisses: [] as TicketDeCaisseHeaderResponse[]
    }
  },
  setup() {
    const q = useQuasar();
    return { q }
  },
  mounted() {
    TicketdecaisseService.getTicketDeCaisseList(21)
    .then((r) => {
      this.ticketDeCaisses = r.data;
      this.is_loading = false;
    })
    .catch((error) => {
      this.q.dialog({
        component: axiosErrorLayoutVue,
        componentProps: { response: error.response }
      }).onOk((r) => {
        console.log(r);
      }).onCancel(() => {
        console.log('Cancel');
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
