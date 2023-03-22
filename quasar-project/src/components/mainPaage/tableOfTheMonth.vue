<template>
  <div class="row justify-center">
    <q-circular-progress v-if="is_loading" indeterminate rounded size="50px" color="blue" class="q-ma-md" />
    <div class="col-4 q-gutter-md column items-start">
      <table-card v-for="(tablefeuillebody, i) in datas_col1" :key="i" class="my-card flat bordered" style="width: 290px;" :datas="tablefeuillebody" />
    </div>    
    <div class="col-4 q-gutter-md column items-start">
      <table-card v-for="(tablefeuillebody, i) in datas_col2" :key="i" class="my-card flat bordered" style="width: 290px;" :datas="tablefeuillebody" />
    </div>    
    <div class="col-4 q-gutter-md column items-start">
      <table-card v-for="(tablefeuillebody, i) in datas_col3" :key="i" class="my-card flat bordered" style="width: 290px;" :datas="tablefeuillebody" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TableFeuilleCategory } from '../../models/models';

import tableCard from './tableCard.vue';

import FeuilleService from '../../service/FeuilleService';

export default defineComponent({
  components: { tableCard },
  name: 'TableOfTheMonth',
  props: {
    feuille_id: Number
  },
  data() {
    return {
      is_loading: true,
      datas_col1: [] as TableFeuilleCategory[],
      datas_col2: [] as TableFeuilleCategory[],
      datas_col3: [] as TableFeuilleCategory[]
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
        FeuilleService.getTableOfTheMonth(this.feuille_id)
        .then((r) => {
          this.datas_col1 = [];
          this.datas_col2 = [];
          this.datas_col3 = [];
          let elements = Object.values(r.data).sort((a, b) => b.header.price - a.header.price) as TableFeuilleCategory[];
          console.log(elements);
          while (elements.length > 3) {
            this.datas_col1.push(elements.shift() as TableFeuilleCategory);
            this.datas_col2.push(elements.shift() as TableFeuilleCategory);
            this.datas_col3.push(elements.shift() as TableFeuilleCategory);
          }
          this.datas_col1.push(elements.shift() as TableFeuilleCategory);
          if (elements.length) {
            this.datas_col2.push(elements.shift() as TableFeuilleCategory);
          }
          this.is_loading = false;
        })
        .catch((r) => {
            console.log(r);
        })
      }
    }
  }
});
</script>
