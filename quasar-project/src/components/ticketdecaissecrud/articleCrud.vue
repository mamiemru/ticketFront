<template>
    <q-card class="text-grey" style="width: 90%">

    <q-card-section v-if="$attrs.editMode">
        <div class="text-h6">Ajouter un article</div>
    </q-card-section>

    <q-card-section horizontal clas="row">

        <q-card-section class="col-5">
            <q-img :src="$attrs.article.item.attachement.image" style="max-height: 290px;" fit="scale-down" v-if="$attrs.article.item.attachement" />
        </q-card-section>

        <q-card-section class="col-6" v-if="$attrs.editMode">
            <q-select label="Identifiant article" dense class="col-5" @input-value="onChangedIdent" :options="filteredIdentOptions"
                :model-value="$attrs.article.item.ident" use-input fill-input input-debounce="0" hide-selected @filter="filterIdentFn"
            >
                <template v-slot:prepend><q-icon name="fingerprint" /></template>
            </q-select>

            <q-input v-model="$attrs.article.item.name" label="Description article" :dense="true">
                <template v-slot:prepend><q-icon name="badge" /></template>
            </q-input>

            <q-select label="Categorie" dense class="col-5" :options="articleCategoriesOptions" @input-value="onChangedArticleCategorie"
                :model-value="$attrs.article.item.categorie" use-input fill-input input-debounce="0" hide-selected
            >
                <template v-slot:prepend><q-icon name="label" /></template>
            </q-select>
    
            <q-select label="Groupe" dense class="col-5" :options="articleGroupeOptions" @input-value="onChangedArticleGroupe"
                :model-value="$attrs.article.item.groupe" use-input fill-input input-debounce="0" hide-selected
            >
                <template v-slot:prepend><q-icon name="label" /></template>
            </q-select>

            <q-input v-model="$attrs.article.item.prix" label="Prix" :dense="true">
                <template v-slot:prepend><q-icon name="euro" /></template>
            </q-input>

            <q-input v-model="$attrs.article.quantity" label="Quantité" :dense="true" type="number">
                <template v-slot:prepend><q-icon name="tag" /></template>
            </q-input>

            <q-input v-model="$attrs.article.remise" label="Remise" :dense="true">
                <template v-slot:prepend><q-icon name="discount" /></template>
            </q-input>
        </q-card-section>

        <q-card-section class="col-6" v-else>
          <q-input v-model="$attrs.article.item.ident" label="Identifiant article" :dense="true" disable />
          <q-input v-model="$attrs.article.item.name" label="Description article" :dense="true" disable />
          <q-input v-model="$attrs.article.item.category.name" label="Categorie" :dense="true" disable />
          <q-input v-model="$attrs.article.item.group.name" label="Groupe" :dense="true" disable />
          <q-input v-model="$attrs.article.item.prix" label="Prix" :dense="true" disable />
          <q-input v-model="$attrs.article.quantity" label="Quantité" :dense="true" disable />
          <q-input v-model="$attrs.article.remise" label="Remise" :dense="true" disable />
        </q-card-section>

    </q-card-section>

    <q-card-actions align="right" class="bg-white text-teal" v-if="$attrs.editMode">
        <q-btn flat label="OK" v-close-popup />
    </q-card-actions>
    <q-card-actions horizontal align="right" class="justify-start q-px-md" v-else>
        <q-btn flat round color="blue" icon="edit" @click="$emit('onEditItem', $attrs.index)" v-if="!$attrs.formDisabled" />
        <q-btn flat round color="red" icon="delete" @click="$emit('onDeleteItem', $attrs.index)" />
    </q-card-actions>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Article, TDCCategory, TDCGroup } from '../../models/models';

import ImageApi from '../../api/imagesApi';
import CompletionApi from '../../api/completionApi';

export default defineComponent({
  name: 'EditArticle',
  props: {
      shop: String,
      localisation: String,
      categorie: String
  },
  data () {
    return {
        src: '' as string,
        identOptions: [] as string[],
        filteredIdentOptions: [] as string[],
        articleCategoriesOptions: [] as string[],
        articleGroupeOptions: [] as string[]
    }
  },
  mounted() {
      if (this.shop && this.$attrs.editMode) {
        CompletionApi.getCompletionOnChangedShopName(this.shop)
        .then((r) => {
            this.identOptions = r.data.item_ident;
            this.filteredIdentOptions = r.data.item_ident;
            this.articleCategoriesOptions = r.data.item_category;
            this.articleGroupeOptions = r.data.item_group;
        })
      }
  },
  methods: {
    onChangedArticleCategorie(category : string) {
        let article = this.$attrs.article as Article;
        article.item.category = {name: category} as TDCCategory;
    },
    onChangedArticleGroupe(group : string) {
        let article = this.$attrs.article as Article;
        article.item.group = {name: group} as TDCGroup;
    },
    onChangedIdent(ident : string) {
      let article = this.$attrs.article as Article;
      article.item.ident = ident;
      if (this.shop && article.item.ident && article.item.ident.length > 2 && this.filteredIdentOptions.length > 0) {
          CompletionApi.getCompletionOnChangedArticleIdent(this.shop, article.item.ident)
          .then((r) => {
                article.item.prix = r.data.prix;
                article.item.name = r.data.name;
                article.item.category = r.data.category;
                article.item.group = r.data.group;
                article.quantity = r.data.quant;
                article.remise = r.data.remise;
                this.src = ImageApi.getImage('articles', ident);
          })
      }
    },
    // eslint-disable-next-line
    filterIdentFn (val : string, update : any) {
        update(() => {
          const needle = val.toLocaleLowerCase()
          this.filteredIdentOptions = this.identOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
        })
    }
  }
})
</script>
