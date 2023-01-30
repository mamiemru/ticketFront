<template>
  <ticket-de-caisse-crud :tdc="tdc" :canEdit="false" :canDelete="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TicketDeCaisse } from '../models/models';
import TicketDeCaisseCrud from '../components/ticketdecaissecrud/ticketdecaisseCrud.vue'

import TicketdecaisseApi from '../api/ticketdecaisseApi'

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
    this.tdcId = this.$route.params.tdcId as string;
    TicketdecaisseApi.getTicketDeCaisse(this.tdcId)
      .then((r) => {
        this.tdc = r.data;
      })
      .catch((r) => {
        alert(r);
      })
  }
});
</script>
