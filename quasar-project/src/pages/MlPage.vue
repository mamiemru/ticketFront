<template>
  <q-page class="row items-start justify-between">
    <div class="col-3 justify-between" v-if="!is_loaded" >
      <div class="row justify-between item-center">
        <q-btn class="col-auto" flat color="red" icon="chevron_left" label="0" @click="onGoStartPage" :disabled="!datas.previous" />
        <q-btn class="col-auto" flat color="primary" icon="chevron_left" label="-1" @click="onPreviousPage" :disabled="!datas.previous" />
        <p class="text-subtitle2 vertical-middle" >page: {{ page }}</p>
        <q-btn class="col-auto" flat color="primary" icon="navigate_next" label="+1" @click="onNextPage" :disabled="!datas.next" />
        <q-btn class="col-auto" flat color="red" icon="navigate_next" label="-1" @click="onGoLastPage" :disabled="!datas.next" />
      </div>
      <q-list bordered separator>
        <q-item v-for="mla in datas.results" :key="mla.id" clickable @click="retrieveDataRow(mla)" >
          <q-item-section>
            <q-item-label>{{ getParsedShopAndLocalisation(mla.tdc) }}</q-item-label>
            <q-item-label caption><small>{{ getParsedDateAndCategory(mla.tdc) }}</small></q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-badge v-if="mla.valide" color="green" label="Valided" />
            <q-badge v-else color="red" label="Unvalided" />
            <small caption>{{ mla.tdc?.total }}€</small>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-9">
      <div class="row justify-between q-pa-md">
        <q-btn class="col-" flat color="green" icon="save" @click="saveMlAttachementTicket" label="Sauver et Envoyer" :disabled="!data.id" />
        <q-checkbox class="col-2" flat color="green" label="les labels sont validés" v-model="data.valide" :disabled="!data.id || data.valide"/>
        <q-btn class="col-3" flat color="warning" icon="delete" label="Abandonner" @click="data = {}" :disabled="!data.id" />
        <q-btn class="col-3" flat color="red" icon="delete" label="Supprimer" @click="deleteMlAttachementTicket" :disabled="!data.id" />
      </div>
      <div class="row justify-between" v-if="data.id">
        <div class="q-px-md col-6">
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>Named Entities Tags</q-toolbar-title>
          </q-toolbar>
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title class="row justify-between" >
              <q-btn outline @click="generateNerFromGcpDatas(false)">Créer le NER via les données</q-btn>
              <q-btn outline color="orange" @click="generateNerFromGcpDatas(true)">Créer le NER via l'image</q-btn>
            </q-toolbar-title>
          </q-toolbar>
          <q-list bordered dense separator v-if="is_loaded_ner">
            <q-item dense v-for="(json_ner_row, id) in data.json_datas" :key="id" clickable >
              <q-item-section dense>
                <q-item-label>{{ json_ner_row[0] }}</q-item-label>
              </q-item-section>

              <q-item-section side dense>
                <q-select dense v-model="json_ner_row[1]" :options="ner_options" />
              </q-item-section>
            </q-item>
          </q-list>
          <q-inner-loading
              :showing="!is_loaded_ner"
              label="Please wait..."
              label-class="text-teal"
              label-style="font-size: 1.1em"
          />
        </div>
        <div class="q-px-md col-6">
          <q-img :src="data.attachement.image" style="max-width: 100%" fit="scale-down" />
        </div>
      </div>
    </div>
    <pre>{{ data }}</pre>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'

import { MlAttachementTicket, MlAttachementTicketPagginationResult, TicketDeCaisseHeaderResponse } from '../models/models';

import MlAttachementTicketService from '../service/MLAttachementTicketService'
import MLNerService from '../service/MlNerService'
import MlNerService from '../service/MlNerService';

export default defineComponent({
  name: 'MlPage',
  components: {},
  data() {
    return {
      is_loaded: true,
      is_loaded_ner: true,
      page: 0,
      ner_options: [] as string[],
      datas: {} as MlAttachementTicketPagginationResult,
      data: {} as MlAttachementTicket
    }
  },

  setup() {
    const q = useQuasar();
    return { q }
  },

  mounted() {
    MlNerService.get_tokens()
    .then((r) => {  this.ner_options = r.data; })
    .catch((r) => { alert(r); console.log(r); })

    MlAttachementTicketService.list()
    .then((r) => { this.datas = r.data; this.is_loaded = false; })
    .catch((r) => { alert(r); console.log(r); })
  },

  methods: {

    onGoStartPage() {
      MlAttachementTicketService.list_per_page('1')
        .then((r) => { this.datas = r.data; this.page = 1; })
    },

    onPreviousPage() {
      if (this.datas.previous) {
        MlAttachementTicketService.list(this.datas.previous)
        .then((r) => { this.datas = r.data; --this.page; })
      }
    },
    onNextPage() {
      if (this.datas.next) {
        MlAttachementTicketService.list(this.datas.next)
        .then((r) => { this.datas = r.data; ++this.page; })
      }
    },

    onGoLastPage() {
      if (this.datas) {
        MlAttachementTicketService.list_per_page('last')
          .then((r) => {
            this.datas = r.data
            if (r.data.previous) {
              this.page = parseInt(r.data.previous.split('=')[1])+1;
            }
        })
      }
    },

    retrieveDataRow(mla: MlAttachementTicket) {
      MlAttachementTicketService.get(mla.id)
      .then((r) => { this.data = r.data })
      .catch((r) => { alert(r); console.log(r); })
    },

    getParsedShopAndLocalisation(ticket: TicketDeCaisseHeaderResponse) {
      if (ticket) {
        let str = `${ticket.shop.name} - ${ticket.shop.city}`;
        if (str.length < 50) {
          return str;
        }
        return `${str.slice(0, 47)}...`;
      }
      return '<no datas>';
    },

    getParsedDateAndCategory(ticket: TicketDeCaisseHeaderResponse) {
      if (ticket) {
        let str = `${ticket.category.name} - ${ticket.date}`;
        if (str.length < 50) {
          return str;
        }
        return `${str.slice(0, 47)}...`;
      }
      return '<no datas>';
    },

    generateNerFromGcpDatas(reset: boolean) {
      this.is_loaded_ner = false;
      MLNerService.generate_ner_from_gcp_or_image(this.data.id, reset)
      .then((r) => { this.data = r.data; this.is_loaded_ner=true; })
      .catch((r) => { console.log(r); alert(r); this.is_loaded_ner=true; })
    },

    saveMlAttachementTicket() {
      MlAttachementTicketService.put(this.data.id, this.data)
      .then((r) => { 
        this.data = r.data;
        let index_data = this.datas.results.findIndex((d: MlAttachementTicket) => d.id === r.data.id);
        if (index_data) {
          this.datas.results[index_data].valide = r.data.valide;
        }
        alert('ok'); 
      })
      .catch((r) => { console.log(r); alert(r); })
    },

    deleteMlAttachementTicket() {
      this.q.dialog({
        title: 'Confirm',
        message: `Would you like to delete ${this.data.id}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {  
        MlAttachementTicketService.delete(this.data.id)
        .then((r) => {
          this.datas.results = this.datas.results.filter((d: MlAttachementTicket) => d.id !== r.data.id);
          this.data = {} as MlAttachementTicket;
        })
      })
      .onCancel(() => {
        console.log('Cancel')
      })
    }
  }
});
</script>
