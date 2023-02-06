<template>
  <div id="chart">
    <apexchart type="line" height="350" :options="chart.chartOptions" :series="chart.series"></apexchart>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import { ChartLines } from '../../models/models'

export default defineComponent({
  name: 'GraphMultiLines',
  props: {
    chart: {
      type: Object as PropType<ChartLines>,
      required: true
    }
  }
});
</script>
