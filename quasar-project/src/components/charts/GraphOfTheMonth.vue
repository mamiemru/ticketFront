<template>
  <div id="chart">
    <apexchart type="line" height="200" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import FeuilleApi from '../../api/feuilleApi';

export default defineComponent({
  name: 'GraphOfTheMonth',
  props: {
    feuille_id: Number
  },
  data() {
    return {
      series: [{ name: 'Dépense', type: 'column', data: [] as number[] }],
      chartOptions: {
        chart: { height: 350, type: 'line', zoom: { enabled: false } },
        dataLabels: { enabled: false },
        stroke: { curve: 'straight' },
        title: { text: '', align: 'left' },
        grid: { row: { colors: ['#f3f3f3', 'transparent'],  opacity: 0.5 },},
        xaxis: {}
      },
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
        .then((r) => {
            console.log(r.data); 
            this.chartOptions.title.text = `Somme d'argent dépensée par jours au mois ${this.feuille_id}`;
            this.chartOptions.xaxis = r.data.x;
            this.series[0].data = r.data.xy;
        })
        .catch((r) => {
            console.log(r);
        })
      }
    }
  }
});
</script>
