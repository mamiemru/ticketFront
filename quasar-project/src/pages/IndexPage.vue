<template>
  <q-page class="row items-start justify-between" style="max-height: 100%">
    <ticket-de-caisse-list-summary class="col-2" />
    <div class="col-7 justify-center">
      <div class="q-pa-md q-gutter-sm row justify-between items-center">
        <q-btn @click="pmonth" align="left" class="btn-fixed-width" color="primary" label="Mois précédant"></q-btn>
        <small caption>{{ feuille_date }}</small>
        <q-btn @click="nmonth" align="right" class="btn-fixed-width" color="primary" label="Mois suivant"></q-btn>
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
import { useQuasar } from 'quasar'

const GraphOfTheMonth = defineAsyncComponent(() => import('../components/charts/GraphOfTheMonth.vue'))

import TicketDeCaisseListSummary from '../components/mainPaage/ticketDeCaisseListSummary.vue';
import SummaryOfTheMonth from '../components/mainPaage/summaryOfTheMonth.vue';
import TableOfTheMonth from '../components/mainPaage/tableOfTheMonth.vue';
import axiosErrorLayoutVue from '../layouts/axiosErrorLayout.vue';

import { FeuilleIds } from '../models/models';

import FeuilleService from '../service/FeuilleService';

export default defineComponent({
  name: 'IndexPage',
  components: { TicketDeCaisseListSummary, TableOfTheMonth, SummaryOfTheMonth, GraphOfTheMonth },
  data() {
    return {
      feuille_id: 0,
      feuille_date: '' as string,
      selectedIndex: 0,
      datas: [] as FeuilleIds[]
    }
  },
  setup() {
    const q = useQuasar();
    return { q }
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
      
      let date = new Date(this.datas[this.selectedIndex].date * 1000);
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      this.feuille_date = `${months[date.getMonth()]} ${date.getFullYear()}`;
    },
    getDatas() {
      FeuilleService.getYearMonth()
      .then((r) => {
          console.log(r); 
          this.datas = r.data.reverse();
          this.selectedIndex = this.datas.length-1;
          this.changeYearMonth()
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
  }
});
</script>
