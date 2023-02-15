<template>
  <div class="row justify-center">
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

import FeuilleApi from '../../api/feuilleApi';

export default defineComponent({
  components: { tableCard },
  name: 'TableOfTheMonth',
  props: {
    feuille_id: Number
  },
  data() {
    return {
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
        FeuilleApi.getTableOfTheMonth(this.feuille_id)
        .then((r) => {
          let elements = Object.values(r.data) as TableFeuilleCategory[];
          let size_col = Math.ceil(elements.length / 3);
          this.datas_col1 = elements.splice(0, size_col);
          this.datas_col2 = elements.splice(0, size_col);
          this.datas_col3 = elements as TableFeuilleCategory[];
        })
        .catch((r) => {
            console.log(r);
        })
      }
    }
  }
});
</script>
