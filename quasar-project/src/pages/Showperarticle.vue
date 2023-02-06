<template>
  <div>
    <div class="row justify-start">
      <article-crud v-if="selectedArticle && selectedArticle.tdc" class="col-4" 
        :categorie="selectedArticle.tdc.category.name" :localisation="selectedArticle.tdc.localisation.name" 
        :shop="selectedArticle.tdc.shop.name" 
        :canCreate="false" :canEdit="false" :canDelete="false" :article="selectedArticle" 
      />
    </div>
    <div class="row justify-around">
      <graph-multi-lines class="col-5" :chart="shopNameChart" v-if="shopNameChartReady" />
      <graph-multi-lines class="col-5" :chart="quantChart" v-if="quantChartReady" />
    </div>
    <pre>{{ datas }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import GraphMultiLines from '../components/charts/GraphMultiLines.vue'

import { Article, ChartSerie } from '../models/models'
import { ChartLines } from '../models/models'

import ArticleApi from '../api/articleApi'
import ArticleCrud from '../components/ticketdecaissecrud/articleCrud.vue';

export default defineComponent({
  name: 'showPerArticle',
  components: { GraphMultiLines, ArticleCrud},
  data() {
    return {
      ident: '' as string,
      datas: [] as Article[],
      selectedArticle: {} as Article,
      shopNameChart: {} as ChartLines,
      shopNameChartReady: false,
      quantChart: {} as ChartLines,
      quantChartReady: false
    }
  },
  mounted() {
    let ident = this.$route.params.ident as string;
    if (ident) {
      ArticleApi.listArticleByIdent(ident)
      .then((r) => {
        this.datas = r.data;
        this.selectedArticle = this.datas[this.datas.length-1];
        this.ident = ident;
        this.initShopNameChart();
        this.initQuantChart();

      })
    }
  },
  methods: {
    initShopNameChart() {
      let shopNameChart = new ChartLines();
      shopNameChart.chartOptions.title.text = "Prix de l'article par magasin et date";
      shopNameChart.chartOptions.xaxis.title.text = "Date";
      shopNameChart.chartOptions.yaxis.title.text = "Prix";
      this.datas.forEach((article) => {
        let shopName = article.tdc.shop.name;
        let price = article.price;
        let xaxis = article.tdc.date;

        if (shopNameChart.series && shopNameChart.chartOptions) {
          let serie = shopNameChart.series.filter((s) => s.name === shopName);
          if (serie.length === 0) {
            shopNameChart.series.push({ name: shopName, data: [ price ] } as ChartSerie );
          } else {
            serie[0].data.push(price);
          }

          if (shopNameChart.chartOptions.xaxis.categories)
            shopNameChart.chartOptions.xaxis.categories.push(xaxis);
        }
      });
      this.shopNameChart = shopNameChart;
      this.shopNameChartReady = true;
    },
    initQuantChart() {
      let quantChart = new ChartLines();
      quantChart.chartOptions.title.text = "Quantité de l'article par magasin et date";
      quantChart.chartOptions.xaxis.title.text = "Date";
      quantChart.chartOptions.yaxis.title.text = "Quantité";
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
    }
  }
});
</script>
