<template>
  <div id="chart">
    <apexchart v-if="apexchart_depense.series && apexchart_depense.chartOptions" 
      type="line" max-height="200" :options="apexchart_depense.chartOptions" :series="apexchart_depense.series"
    ></apexchart>
    <apexchart v-if="apexchart_shops.series && apexchart_shops.chartOptions" 
      type="line" max-height="200" :options="apexchart_shops.chartOptions" :series="apexchart_shops.series"
    ></apexchart>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import FeuilleApi from '../../api/feuilleApi';
import { IChartLines } from '../../models/models'

export default defineComponent({
  name: 'GraphOfTheMonth',
  props: {
    feuille_id: Number
  },
  data() {
    return {
      apexchart_depense: {} as IChartLines,
      apexchart_shops: {} as IChartLines
      }
  },
  watch: {
    feuille_id() {
      this.getDatas();
    }
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    getDatas() {
      if (this.feuille_id) {
        FeuilleApi.getGraphOfTheMonth(this.feuille_id)
        .then((r) => { this.apexchart_depense = r.data; })
        .catch((r) => { console.log(r); })
        FeuilleApi.getGraphOfTheMonthShop(this.feuille_id)
        .then((r) => { this.apexchart_shops = r.data; })
        .catch((r) => { console.log(r); })
      }
    }
  }
});
</script>
