<template>
  <div class="q-pa-md row items-start q-gutter-md justify-center">
    <table-card v-for="(tablefeuillebody, i) in datas" :key="i" class="my-card flat bordered" style="width: 280px;" :datas="tablefeuillebody" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TableFeuilleResponse } from '../../models/models';

import tableCard from './tableCard.vue';

import FeuilleApi from '../../api/feuilleApi';

export default defineComponent({
  components: { tableCard },
  name: 'TableOfTheMonth',
  props: {
    feuille_id: Number
  },
  data() {
    return {
      datas: {} as TableFeuilleResponse
    }
  },
  mounted() {
    this.getDatas()
  },
  watch: {
    feuille_id() {
      this.getDatas();
    }
  },
  methods: {
    getDatas() {
      if (this.feuille_id) {
        FeuilleApi.getTableOfTheMonth(this.feuille_id)
        .then((r) => {
            console.log(r); 
            this.datas = r.data;
        })
        .catch((r) => {
            console.log(r);
        })
      }
    }
  }
});
</script>
