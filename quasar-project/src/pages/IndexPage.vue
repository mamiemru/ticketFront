<template>
  <q-page class="row items-start justify-between" style="max-height: 100%">
    <ticket-de-caisse-list-summary class="col-2" />
    <div class="col-7">
      <div class="q-pa-md q-gutter-sm row justify-between">
        <q-btn @click="pmonth" align="around" class="btn-fixed-width" color="primary" label="Mois précédant"></q-btn>
        <p>{{ feuille_id }}</p>
        <q-btn @click="nmonth" align="around" class="btn-fixed-width" color="primary" label="Mois suivant"></q-btn>
      </div>
      <table-of-the-month :feuille_id='feuille_id' />
    </div>
    <div class="col-3 q-pa-md q-gutter-sm">
      <summary-of-the-month :feuille_id='feuille_id' />
      <GraphOfTheMonth :feuille_id='feuille_id' />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

const GraphOfTheMonth = defineAsyncComponent(() => import('../components/GraphOfTheMonth.vue'))

import TicketDeCaisseListSummary from '../components/ticketDeCaisseListSummary.vue';
import SummaryOfTheMonth from '../components/summaryOfTheMonth.vue';
import TableOfTheMonth from '../components/tableOfTheMonth.vue';

import { FeuilleIds } from '../models/models';

import FeuilleApi from '../api/feuilleApi';

export default defineComponent({
  name: 'IndexPage',
  components: { TicketDeCaisseListSummary, TableOfTheMonth, SummaryOfTheMonth, GraphOfTheMonth },
  data() {
    return {
      feuille_id: 0,
      selectedIndex: 0,
      datas: [] as FeuilleIds[]
    }
  },
  mounted() {
    this.getDatas()
  },
  methods: {
    pmonth() {
      this.selectedIndex = Math.max(0, this.selectedIndex-1);
      this.changeYearMonth();
    },
    nmonth() {
      this.selectedIndex = Math.min(this.datas.length-1, this.selectedIndex+1);
      this.changeYearMonth();
    },
    changeYearMonth() {
      this.feuille_id = this.datas[this.selectedIndex].id;
    },
    getDatas() {
      FeuilleApi.getYearMonth()
      .then((r) => {
          console.log(r); 
          this.datas = r.data.reverse();
          this.selectedIndex = this.datas.length-1;
          this.changeYearMonth()
      })
      .catch((r) => {
          console.log(r);
      })
    }
  }
});
</script>
