<template>
  <div class="" style="max-width: 500px">
    <div class="row justify-evenly">
      <div class="col-6">
        <p>Minima théorique {{ datas.tttheorique_v }}</p>
        <p>Total dépensé: {{ datas.ttdepense }}</p>
        <p>Dépenses non factures: {{ datas.dep }}</p>
        <p>Dépenses only factures: {{ datas.factures }}</p>
      </div>
      <div class="col-6">
        <p>Epargne théorique {{ datas.tteparge }}</p>
        <p>Dépenses de vie: {{ datas.ttevitable }}</p>
        <p>Dépenses de conforts: {{ datas.ttconfort }}</p>
        <p>Dépenses moyen journalier: {{ datas.mj }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TableFeuilleSummary } from '../../models/models';

import FeuilleApi from '../../api/feuilleApi';

export default defineComponent({
  name: 'SummaryOfTheMonth',
  props: {
    feuille_id: Number
  },
  data() {
    return {
        datas: {} as TableFeuilleSummary
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
        FeuilleApi.getSummaryOfTheMonth(this.feuille_id)
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
