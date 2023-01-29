import VueApexCharts from 'vue3-apexcharts'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.config.globalProperties.$apexcharts = VueApexCharts;
  app.use(VueApexCharts)
});