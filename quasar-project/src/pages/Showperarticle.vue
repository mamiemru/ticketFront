<template>
  <div>
    <div class="row justify-between">
      <article-crud v-if="selectedArticle && selectedArticle.tdc" class="col-4" 
        :categorie="selectedArticle.tdc.category.name" :localisation="selectedArticle.tdc.shop.localisation" 
        :shop="selectedArticle.tdc.shop.name" 
        :canCreate="false" :canEdit="false" :canDelete="false" :article="selectedArticle" 
      />
      <graph-pie class="col-5" :chart="shopChart" v-if="shopChartReady" />
    </div>
    <div class="row justify-around">
      <graph-multi-lines class="col-5" :chart="priceChart" v-if="priceChartReady" />
      <graph-multi-lines class="col-5" :chart="quantChart" v-if="quantChartReady" />
    </div>
    <pre>{{ datas }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'

import GraphMultiLines from '../components/charts/GraphMultiLines.vue'
import GraphPie from '../components/charts/GraphPie.vue'

import { Article, ChartSerie } from '../models/models'
import { ChartLines } from '../models/models'
import { ChartPie } from '../models/models'

import ArticleService from '../service/ArticleService'
import axiosErrorLayoutVue from '../layouts/axiosErrorLayout.vue';
import ArticleCrud from '../components/ticketdecaissecrud/articleCrud.vue';

export default defineComponent({
  name: 'showPerArticle',
  components: { GraphMultiLines, GraphPie, ArticleCrud},
  data() {
    return {
      ident: '' as string,
      datas: [] as Article[],
      selectedArticle: {} as Article,
      priceChart: {} as ChartLines,
      priceChartReady: false,
      quantChart: {} as ChartLines,
      quantChartReady: false,
      shopChart: {} as ChartPie,
      shopChartReady: false,
    }
  },
  setup() {
    const q = useQuasar();
    return { q }
  },
  mounted() {
    let ident = this.$route.params.ident as string;
    ArticleService.listArticleByIdent(ident)
    .then((r) => {
      this.datas = r.data;
      this.selectedArticle = this.datas[this.datas.length-1];
      this.ident = ident;
      this.initPriceChart();
      this.initQuantChart();
      this.initShopChart();
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
  },
  methods: {
    initPriceChart() {
      let priceChart = new ChartLines();
      priceChart.chartOptions.title.text = 'Prix de l\'article par magasin et date';
      priceChart.chartOptions.xaxis.title.text = 'Date';
      priceChart.chartOptions.yaxis.title.text = 'Prix';
      this.datas.forEach((article) => {
        let shopName = article.tdc.shop.name;
        let price = article.price;
        let xaxis = article.tdc.date;

        if (priceChart.series && priceChart.chartOptions) {
          let serie = priceChart.series.filter((s) => s.name === shopName);
          if (serie.length === 0) {
            priceChart.series.push({ name: shopName, data: [ price ] } as ChartSerie );
          } else {
            serie[0].data.push(price);
          }

          if (priceChart.chartOptions.xaxis.categories)
            priceChart.chartOptions.xaxis.categories.push(xaxis);
        }
      });
      this.priceChart = priceChart;
      this.priceChartReady = true;
    },
    initQuantChart() {
      let quantChart = new ChartLines();
      quantChart.chartOptions.title.text = 'Quantité de l\'article par magasin et date';
      quantChart.chartOptions.xaxis.title.text = 'Date';
      quantChart.chartOptions.yaxis.title.text = 'Quantité';
      this.datas.forEach((article) => {
        let shopName = article.tdc.shop.name;
        let quant = article.quantity;
        let xaxis = article.tdc.date;

        if (quantChart.series && quantChart.chartOptions) {
          let serie = quantChart.series.filter((s) => s.name === shopName);
          if (serie.length === 0) {
            quantChart.series.push({ name: shopName, data: [ quant ] } as ChartSerie );
          } else {
            serie[0].data.push(quant);
          }

          if (quantChart.chartOptions.xaxis.categories)
            quantChart.chartOptions.xaxis.categories.push(xaxis);
        }
      });
      this.quantChart = quantChart;
      this.quantChartReady = true;
    },
    initShopChart() {
      let shopChart = new ChartPie();
      let quant = [] as number[];
      let shops = [] as string[];
      this.datas.forEach((article) => {
        let shop = article.tdc.shop.name;
        let index = shops.indexOf(shop);
        if (0 <= index) {
          ++quant[index];
        } else {
          shops.push(shop);
          quant.push(1);
        }
      });
      shopChart.series = quant;
      shopChart.chartOptions.labels = shops;
      this.shopChart = shopChart;
      this.shopChartReady = true;
    }
  }
});
</script>
