<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <q-btn class="col-2" flat color="primary" icon="chevron_left" label="page précédent" @click="onPreviousPage" :disabled="!datas.previous" />
      <q-btn class="col-2" flat color="primary" icon="navigate_next" label="page suivante" @click="onNextPage" :disaabled="!datas.next" />
    </div>
    <div class="row justify-around">
      <itemarticle class="col-2" v-for="(itemarticle, i) in datas.results" :key="i" :itemarticle="itemarticle"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
      datas: {} as ItemArticlePagination
    }
  },
  mounted() {
    ItemArticleApi.getItemArticlePagination(null)
    .then((r) => {
      this.datas = r.data
    })
  },
  methods: {
    onPreviousPage() {
      if (this.datas.previous) {
        ItemArticleApi.getItemArticlePagination(this.datas.previous)
        .then((r) => {
          this.datas = r.data
        })
      }
    },
    onNextPage() {
      if (this.datas.next) {
        ItemArticleApi.getItemArticlePagination(this.datas.next)
        .then((r) => {
          this.datas = r.data
        })
      }
    }
  }
});
</script>
