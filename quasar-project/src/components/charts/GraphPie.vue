<template>
  <div id="chart">
    <apexchart type="pie" height="350" :options="chart.chartOptions" :series="chart.series"></apexchart>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import { ChartLines } from '../../models/models'

export default defineComponent({
  name: 'GraphPie',
  props: {
    chart: {
      type: Object as PropType<ChartLines>,
      required: true
    }
  }
});
</script>
