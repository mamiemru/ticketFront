<template>
  <div class="" style="max-width: 500px">
    <div class="column items-between">
      <div class="row">
        <div class="col-6">
          <small>Minima théorique {{ datas.tttheorique_v }}</small>
        </div>
        <div class="col-6 column">
          <small>Total dépensé: {{ datas.ttdepense }}</small>
          <small>Epargne théorique {{ datas.tteparge }}</small>
        </div>
      </div>
      <div class="row">
        <small class="col-6" >Dépenses non factures: {{ datas.dep }}</small>
        <small class="col-6" >Dépenses only factures: {{ datas.factures }}</small>
      </div>
      <div class="row">
        <div class="column col-6">
          <small class="col" >Dépenses de vie: {{ datas.ttevitable }}</small>
          <small class="col" >Dépenses moyen journalier: {{ datas.mj }}</small>
        </div>
        <div class="column col-6">
          <small class="col" >Dépenses de conforts: {{ datas.ttconfort }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TableFeuilleSummary } from '../../models/models';

import FeuilleService from '../../service/FeuilleService';

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
        FeuilleService.getSummaryOfTheMonth(this.feuille_id)
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
