<template>
  <div class="q-pa-md" style="width: 100%">
    <form @submit.prevent.stop="filterByContainsIdent" @reset.prevent.stop="onGoStartPage" class="row">
      <q-input ref="input_ident_ref" v-model="input_ident" class="col-3" dense label="filtrer par identifiant (case sensitive)" 
        :rules="[ val => val.length >= 3 || 'Please use minumum 3 characters']"
      >
        <template v-slot:prepend><q-icon name="search" /></template>
      </q-input>
      <q-btn label="chercher" dense type="submit" flat color="blue" class="col-1" />
      <q-btn label="reset" dense type="reset" flat color="red" class="col-1" />
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
import { defineComponent, ref } from 'vue';

import ItemArticleApi from '../../api/itemarticleApi'
import {ItemArticlePagination} from '../../models/models'

import itemarticle from './itemarticle.vue';

export default defineComponent({
  components: { itemarticle },
  name: 'articlesList',
  props: {},
  data() {
    return {
      page: 1,
      datas: {} as ItemArticlePagination,
      input_ident: '' as string
    }
  },
  setup() {
    const input_ident_ref = ref(null);
    return {
      input_ident_ref
    }
  },
  mounted() {
    ItemArticleApi.getItemArticlePagination(null)
    .then((r) => {this.datas = r.data; })
  },
  methods: {
    onGoStartPage() {
      ItemArticleApi.getItemArticlePagination(null)
        .then((r) => { this.datas = r.data; this.page = 1; })
    },
    onPreviousPage() {
      if (this.datas.previous) {
        ItemArticleApi.getItemArticlePagination(this.datas.previous)
        .then((r) => { this.datas = r.data; --this.page; })
      }
    },
    onNextPage() {
      if (this.datas.next) {
        ItemArticleApi.getItemArticlePagination(this.datas.next)
        .then((r) => { this.datas = r.data; ++this.page; })
      }
    },
    onGoLastPage() {
      if (this.datas) {
        ItemArticleApi.getItemArticlePaginationPerPage('last')
          .then((r) => {
            this.datas = r.data
            if (r.data.previous) 
              this.page = parseInt(r.data.previous.split('=')[1])+1;
        })
      }
    },
    filterByContainsIdent() {
      if (this.input_ident_ref) {
        ItemArticleApi.postfilterItemArticle(this.input_ident)
          .then((r) => { console.log(r.data); this.datas = r.data; this.page = 1; })
      }
    }
  }
});
</script>
