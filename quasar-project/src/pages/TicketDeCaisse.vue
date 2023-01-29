<template>
   <div class="q-pa-md" v-if="datas">
    <div class="row justify-end">
      <q-btn class="col-2" flat color="red" icon="delete" label="Supprimer" @click="onDeleteTdc" />
    </div>
    <div class="row items-start justify-around">
      <div class="col-6 q-gutter-y-md column">
        <div class="row items-start justify-around">
          <q-input v-model="datas.shop.name" label="Shop" :dense="true" disable class="col-5" />
          <q-input v-model="datas.localisation.name" label="Localisation" :dense="true" disable class="col-5" />
          <q-input v-model="datas.date" label="Date" :dense="true" disable class="col-5" />
          <q-input v-model="datas.category.name" label="Catégorie" :dense="true" disable class="col-5" />
        </div>
        <TicketDeCaisseArticleDisplay v-for="(article, i) in datas.articles" :key="i" :article="article" :formDisabled="true" />
      </div>
      <q-card class="my-card col-5">
          <q-card-section class="col-5 flex flex-center ">
              <q-img :src="src" />
          </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TicketDeCaisse } from '../models/models';
import TicketDeCaisseArticleDisplay from '../components/TicketDeCaisseArticleDisplay.vue'

import ImageApi from '../api/imagesApi'
import TicketdecaisseApi from '../api/ticketdecaisseApi'

export default defineComponent({
  name: 'TicketDeCaisse',
  components: { TicketDeCaisseArticleDisplay },
  data() {
    return {
        src: '' as string,
        tdcId : '' as string,
        datas: { shop: {}, localisation: {}, category: {} } as TicketDeCaisse
    }
  },  
  created() {
    this.tdcId = new String(this.$route.params.tdcId).toString();
    this.getDatas()
  },
  methods: {
    getDatas() {
      if (this.tdcId) {
        TicketdecaisseApi.getTicketDeCaisse(this.tdcId)
        .then((r) => {
            console.log(r); 
            this.datas = r.data;
            this.src = ImageApi.getImage('tickets', this.datas.id as string);
        })
        .catch((r) => {
            console.log(r);
        })
      }
    },
    onDeleteTdc() {
      if (this.tdcId) {
        TicketdecaisseApi.deleteTicketDeCaisse(this.tdcId)
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch((r) => {
          alert(r);
          console.log(r);
        })
      }
    }
  }
});
</script>
