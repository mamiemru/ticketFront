<template>
    <q-card class="my-card">
      <q-card-section horizontal>
        <q-card-section class="col-5">
            <q-img :src="$attrs.article.item.attachement.image" style="max-height: 290px;" fit="scale-down" v-if="$attrs.article.item.attachement" />
        </q-card-section>
        <q-card-section class="col-6">
          <q-input v-model="$attrs.article.item.ident" label="Identifiant article" :dense="true" disable />
          <q-input v-model="$attrs.article.item.name" label="Description article" :dense="true" disable />
          <q-input v-model="$attrs.article.item.category.name" label="Categorie" :dense="true" disable />
          <q-input v-model="$attrs.article.item.group.name" label="Groupe" :dense="true" disable />
          <q-input v-model="$attrs.article.item.prix" label="Prix" :dense="true" disable />
          <q-input v-model="$attrs.article.quantity" label="Quantité" :dense="true" disable />
          <q-input v-model="$attrs.article.remise" label="Remise" :dense="true" disable />
        </q-card-section>

        <q-card-actions vertical class="justify-start q-px-md" v-if="!$attrs.formDisabled">
          <q-btn flat round color="blue" icon="edit" @click="$emit('onEditItem', $attrs.index)" v-if="!$attrs.formDisabled" />
          <q-btn flat round color="red" icon="delete" @click="$emit('onDeleteItem', $attrs.index)" />
        </q-card-actions>

      </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Article } from '../models/models';
import ImageApi from '../api/imagesApi';

export default defineComponent({
  name: 'TicketDeCaisseArticleDisplay',
  data() {
    return {
        src: '' as string
    }
  },
  mounted() {
    let article = this.$attrs.article as Article;
    if (article) {
      this.src = String(ImageApi.getImage('articles', article.item.ident));
    }
  },
  methods : {
    saveItem() {
      console.log('dave');
    },
  }
});
</script>
