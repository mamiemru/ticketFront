<template>
  <ticket-de-caisse-crud v-if="tdcId" :tdc="tdc" :canEdit="false" :canDelete="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'

import { TicketDeCaisse } from '../models/models';

import TicketDeCaisseCrud from '../components/ticketdecaissecrud/ticketdecaisseCrud.vue'
import axiosErrorLayoutVue from '../layouts/axiosErrorLayout.vue';

import TicketdecaisseService from '../service/TicketdecaisseService'

export default defineComponent({
  name: 'TicketDeCaisse',
  components: { TicketDeCaisseCrud },
  data() {
    return {
        tdcId: '' as string,
        tdc: {} as TicketDeCaisse
    }
  },  
  setup() {
    const q = useQuasar();
    return { q }
  },
  created() {
    let tdcId = this.$route.params.tdcId as string;
    TicketdecaisseService.getTicketDeCaisse(tdcId)
      .then((r) => {
        this.tdc = r.data;
        this.tdcId = this.tdc.id;
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
  }
});
</script>
