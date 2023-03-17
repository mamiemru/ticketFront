<template>
  <div class="" style="max-width: 500px">
    <q-circular-progress v-if="is_loading" indeterminate rounded size="50px" color="blue" class="q-ma-md" />
    <div class="column items-between" v-else>
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
        is_loading: true,
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
            this.datas = r.data;
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
