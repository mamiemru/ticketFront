<template>
  <div class="q-pa-md" style="width: 100%">
    <form @submit.prevent.stop="filterByArticle" @reset.prevent.stop="onGoStartPage" class="column justify-around">
      <div class="row justify-around">
        <q-input v-model="article_filter.item.ident" class="col-2" dense label="filtrer par identifiant" />   
        <q-input v-model="article_filter.item.category.name" class="col-2" dense label="filtrer par article category" /> 
        <q-input v-model="article_filter.item.group.name" class="col-2" dense label="filtrer par article group" /> 
        <q-input v-model="article_filter.tdc.shop.name" class="col-2" dense label="filtrer par magasin" /> 
        <q-input v-model="article_filter.tdc.category.name" class="col-2" dense label="filtrer par type de magasin" /> 
      </div>
      <div class="row justify-center">
        <q-btn label="chercher" icon="search" dense type="submit" flat color="blue" class="col-1" />
        <q-btn label="reset" icon="cancel" dense type="reset" flat color="red" class="col-1" />
      </div>
    </form>
    <hr>
    <div class="row justify-between">
      <q-btn class="col-2" flat color="red" icon="chevron_left" label="au début" @click="onGoStartPage" :disabled="!datas.previous" />
      <q-btn class="col-2" flat color="primary" icon="chevron_left" label="page précédent" @click="onPreviousPage" :disabled="!datas.previous" />
      <p caption>page: {{ page }}</p>
      <q-btn class="col-2" flat color="primary" icon="navigate_next" label="page suivante" @click="onNextPage" :disabled="!datas.next" />
      <q-btn class="col-2" flat color="red" icon="navigate_next" label="à la fin" @click="onGoLastPage" :disabled="!datas.next" />
    </div>
    <div class="row justify-start">
      <itemarticle class="col-2" v-for="(itemarticle, i) in datas.results" :key="i" :itemarticle="itemarticle"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ItemArticleService from '../../service/ItemArticleService'
import {ItemArticlePagination, AArticle} from '../../models/models'

import itemarticle from './itemarticle.vue';

export default defineComponent({
  components: { itemarticle },
  name: 'articlesList',
  props: {},
  data() {
    return {
      page: 1,
      datas: {} as ItemArticlePagination,
      article_filter: new AArticle()
    }
  },
  mounted() {
    ItemArticleService.getItemArticlePagination(null)
    .then((r) => {this.datas = r.data; })
  },
  methods: {
    onGoStartPage() {
      ItemArticleService.getItemArticlePagination(null)
        .then((r) => { this.datas = r.data; this.page = 1; })
    },
    onPreviousPage() {
      if (this.datas.previous) {
        ItemArticleService.getItemArticlePagination(this.datas.previous)
        .then((r) => { this.datas = r.data; --this.page; })
      }
    },
    onNextPage() {
      if (this.datas.next) {
        ItemArticleService.getItemArticlePagination(this.datas.next)
        .then((r) => { this.datas = r.data; ++this.page; })
      }
    },
    onGoLastPage() {
      if (this.datas) {
        ItemArticleService.getItemArticlePaginationPerPage('last')
          .then((r) => {
            this.datas = r.data
            if (r.data.previous) 
              this.page = parseInt(r.data.previous.split('=')[1])+1;
        })
      }
    },
    filterByArticle() {
      ItemArticleService.postfilterItemArticle(this.article_filter)
        .then((r) => { console.log(r.data); this.datas = r.data; this.page = 1; });
    }
  }
});
</script>
