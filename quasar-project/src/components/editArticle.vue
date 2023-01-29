<template>
    <q-card class="text-grey" style="width: 500px">

    <q-card-section>
        <div class="text-h6">Ajouter un article</div>
    </q-card-section>

    <q-card-section horizontal clas="row">
        <q-card-section class="col-5">
            <q-img :src="src" style="max-height: 290px;" fit="scale-down" v-if="src" />
        </q-card-section>
        <q-card-section class="col-6">

            <q-select label="Identifiant article" dense class="col-5" @input-value="onChangedIdent" :options="filteredIdentOptions"
                :model-value="$attrs.editArticleField.item.id" use-input fill-input input-debounce="0" hide-selected @filter="filterIdentFn"
            >
                <template v-slot:prepend><q-icon name="fingerprint" /></template>
            </q-select>

            <q-input v-model="$attrs.editArticleField.item.name" label="Description article" :dense="true">
                <template v-slot:prepend><q-icon name="badge" /></template>
            </q-input>

            <q-select label="Categorie" dense class="col-5" :options="articleCategoriesOptions" @input-value="onChangedArticleCategorie"
                :model-value="$attrs.editArticleField.item.categorie" use-input fill-input input-debounce="0" hide-selected
            >
                <template v-slot:prepend><q-icon name="label" /></template>
            </q-select>
    
            <q-select label="Groupe" dense class="col-5" :options="articleGroupeOptions" @input-value="onChangedArticleGroupe"
                :model-value="$attrs.editArticleField.item.groupe" use-input fill-input input-debounce="0" hide-selected
            >
                <template v-slot:prepend><q-icon name="label" /></template>
            </q-select>

            <q-input v-model="$attrs.editArticleField.item.prix" label="Prix" :dense="true">
                <template v-slot:prepend><q-icon name="euro" /></template>
            </q-input>

            <q-input v-model="$attrs.editArticleField.quantity" label="Quantité" :dense="true" type="number">
                <template v-slot:prepend><q-icon name="tag" /></template>
            </q-input>

            <q-input v-model="$attrs.editArticleField.remise" label="Remise" :dense="true">
                <template v-slot:prepend><q-icon name="discount" /></template>
            </q-input>
            
        </q-card-section>
    </q-card-section>

    <q-card-actions align="right" class="bg-white text-teal" v-if="$attrs.formDisabled">
        <q-btn flat label="OK" v-close-popup />
    </q-card-actions>
    <q-card-actions vertical class="justify-start q-px-md" v-else>
        <q-btn flat round color="blue" icon="edit" @click="$emit('onEditItem', $attrs.index)" v-if="!$attrs.formDisabled" />
        <q-btn flat round color="red" icon="delete" @click="$emit('onDeleteItem', $attrs.index)" />
    </q-card-actions>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Article, TDCCategory, TDCGroup } from '../models/models';

import ImageApi from '../api/imagesApi';
import CompletionApi from '../api/completionApi';

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
      if (this.shop) {
        CompletionApi.getCompletionOnChangedShopName(this.shop)
        .then((r) => {
            this.identOptions = r.data.articleId;
            this.filteredIdentOptions = r.data.articleId;
            this.articleCategoriesOptions = r.data.articleCategorie;
            this.articleGroupeOptions = r.data.groupeId;
        })
      }
  },
  methods: {
    onChangedArticleCategorie(category : string) {
        let article = this.$attrs.editArticleField as Article;
        article.item.category = {name: category} as TDCCategory;
    },
    onChangedArticleGroupe(group : string) {
        let article = this.$attrs.editArticleField as Article;
        article.item.group = {name: group} as TDCGroup;
    },
    onChangedIdent(ident : string) {
      let article = this.$attrs.editArticleField as Article;
      article.item.id = ident;
      if (this.shop && article.item.id && article.item.id.length > 2 && this.filteredIdentOptions.length > 0) {
          CompletionApi.getCompletionOnChangedArticleIdent(this.shop, article.item.id)
          .then((r) => {
                article.item.prix = r.data.articlePrix;
                article.item.name = r.data.articleName;
                article.item.category = {name: r.data.articleCategorie} as TDCCategory;
                article.item.group = { name: r.data.groupeId } as TDCGroup;
                article.quantity = r.data.articleQuant;
                article.remise = r.data.articleRemise;
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
