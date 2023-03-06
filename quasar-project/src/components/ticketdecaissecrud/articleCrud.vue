<template>
  <q-card class="text-grey" flat bordered square>
    <q-card-section v-if="$attrs.canCreate">
      <div class="text-h6">Ajouter un article</div>
    </q-card-section>

    <q-card-section horizontal clas="row">
      <q-card-section class="col-5" v-if="$attrs.article.item.attachement && $attrs.article.item.attachement.image">
        <q-img :src="$attrs.article.item.attachement.image" style="max-height: 290px;" fit="scale-down" />
      </q-card-section>
      <q-card-section class="col-5" v-else-if="$attrs.article.item.ident && $attrs.canCreate">
        <attachement-form @submited="onUploadAttachementSubmited" @error="null" category="article" type="" :name="$attrs.article.item.ident" />
      </q-card-section>
      <q-card-section class="col-5" v-else>
      </q-card-section>

      <q-form @submit="onSubmit" @reset="onReset" class="col-6" v-if="$attrs.canCreate">
        <q-card-section>
          <q-select label="Identifiant article" dense class="col-5" @input-value="onChangedIdent" :options="filteredIdentOptions"
            :model-value="$attrs.article.item.ident" use-input fill-input input-debounce="0" hide-selected @filter="filterIdentFn"
          >
            <template v-slot:prepend><q-icon name="fingerprint" /></template>
          </q-select>

          <q-input v-model="$attrs.article.item.name" label="Description article" :dense="true" >
            <template v-slot:prepend><q-icon name="badge" /></template>
          </q-input>

          <q-select label="Categorie" dense class="col-5" :options="articleCategoriesOptions" @input-value="onChangedArticleCategorie"
            :model-value="$attrs.article.item.category.name" use-input fill-input input-debounce="0" hide-selected
          >
            <template v-slot:prepend><q-icon name="label" /></template>
          </q-select>

          <q-select label="Groupe" dense class="col-5" :options="articleGroupeOptions" @input-value="onChangedArticleGroupe"
            :model-value="$attrs.article.item.group.name" use-input fill-input input-debounce="0" hide-selected
          >
            <template v-slot:prepend><q-icon name="label" /></template>
          </q-select>

          <q-input v-model="$attrs.article.price" label="Prix" :dense="true"
            min="0.0"
          >
            <template v-slot:prepend><q-icon name="euro" /></template>
          </q-input>

          <q-input v-model="$attrs.article.quantity" label="Quantité" :dense="true" type="number" 
            :min="1"
          >
            <template v-slot:prepend><q-icon name="tag" /></template>
          </q-input>

          <q-input v-model="$attrs.article.remise" label="Remise" :dense="true" 
            min="0.0"
          >
            <template v-slot:prepend><q-icon name="discount" /></template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal" v-if="$attrs.canCreate">
          <q-btn flat label="OK" color="blue" type="submit" />
          <q-btn flat label="Cancel" color="red" type="reset" />
        </q-card-actions>
      </q-form>

      <q-card-section class="col-6" v-else>
        <q-card-section>
          <q-input v-model="$attrs.article.item.ident" label="Identifiant article" :dense="true" disable />
          <q-input v-model="$attrs.article.item.name" label="Description article" :dense="true" disable />
          <q-input v-model="$attrs.article.item.category.name" label="Categorie" :dense="true" disable />
          <q-input v-model="$attrs.article.item.group.name" label="Groupe" :dense="true" disable />
          <q-input v-model="$attrs.article.price" label="Prix" :dense="true" disable />
          <q-input v-model="$attrs.article.quantity" label="Quantité" :dense="true" disable />
          <q-input v-model="$attrs.article.remise" label="Remise" :dense="true" disable />
        </q-card-section>
        <q-card-actions horizontal align="right" class="justify-start q-px-md" v-if="$attrs.canEdit">
          <q-btn flat round color="blue" icon="edit" @click="$emit('onEditItem', $attrs.index)" />
          <q-btn flat round color="red" icon="delete" @click="$emit('onDeleteItem', $attrs.index)" />
        </q-card-actions>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import AttachementForm from '../AttachementForm.vue'

import { Article, TDCAttachement, TDCCategory, TDCGroup } from '../../models/models';

import CompletionApi from '../../api/completionApi';

export default defineComponent({
  name: 'EditArticle',
  components: { AttachementForm },
  props: {
      shop: String,
      localisation: String,
      categorie: String
  },
  setup() {
    const q = useQuasar()
    return { q }
  },
  data () {
    return {
        file: null,
        isFileUploading: false,
        identOptions: [] as string[],
        filteredIdentOptions: [] as string[],
        articleCategoriesOptions: [] as string[],
        articleGroupeOptions: [] as string[]
    }
  },
  mounted() {
      if (this.shop && this.$attrs.canCreate) {
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
    onSubmit () {
      let article = this.$attrs.article as Article;
      if (article.item.ident && article.item.category && article.price && article.quantity) {
        this.$emit('onOk', this.$attrs.index);
      }
      else {
        this.q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'some fields are empty'
        })
      }
    },
    onReset () {
      let article = this.$attrs.article as Article;
      article.item.ident = '';
      article.item.name = undefined;
      article.item.category = undefined;
      article.item.group = undefined;
      article.price = 0;
      article.quantity = 1;
      article.remise = 0.0;
      this.$emit('onCancel', this.$attrs.index);
    },
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
      if (article.item.ident != ident) {
        article.item.ident = ident;
      }
      if (this.shop && article.item.ident && article.item.ident.length > 2) {
          CompletionApi.getCompletionOnChangedArticleIdent(this.shop, article.item.ident)
          .then((r) => { 
                article.item.name = (r.data.item && r.data.item.name)? r.data.item.name : ident;
                article.item.category = (r.data.item.category && r.data.item.category.name)? r.data.item.category : { name: '', id: 0, required: false} as TDCCategory;
                article.item.group = (r.data.item.group && r.data.item.group.name)? r.data.item.group : { name: '', id: 0 } as TDCGroup;
                article.item.attachement = (r.data.item.attachement)? r.data.item.attachement : {} as TDCAttachement;
                article.quantity = (r.data.quantity)? r.data.quantity : 1;
                article.remise = (r.data.remise)? r.data.remise : 0.0;
                article.price = r.data.price;
          })
          .catch(() => {
            /*
            article.item.name = '';
            article.item.category = { name: '', id: 0, required: false} as TDCCategory;
            article.item.group = { name: '', id: 0 } as TDCGroup;
            article.item.attachement = {} as TDCAttachement;
            article.quantity = 0
            article.remise = 0.0
            article.price = 0.0
            */
          })
      }
    },
    // eslint-disable-next-line
    filterIdentFn (val : string, update : any) {
        update(() => {
          const needle = val.toLocaleLowerCase()
          this.filteredIdentOptions = this.identOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
        })
    },

    onUploadAttachementSubmited(r : TDCAttachement) {
      let article = this.$attrs.article as Article;
      article.item.attachement = r;
    }
  }
})
</script>
