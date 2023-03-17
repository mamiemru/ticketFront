<template>
  <ticket-de-caisse-crud v-if="tdcId" :tdc="tdc" :canEdit="false" :canDelete="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TicketDeCaisse } from '../models/models';
import TicketDeCaisseCrud from '../components/ticketdecaissecrud/ticketdecaisseCrud.vue'

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
  created() {
    let tdcId = this.$route.params.tdcId as string;
    TicketdecaisseService.getTicketDeCaisse(tdcId)
      .then((r) => {
        this.tdc = r.data;
        this.tdcId = this.tdc.id;
      })
      .catch((r) => {
        alert(r);
      })
  }
});
</script>
