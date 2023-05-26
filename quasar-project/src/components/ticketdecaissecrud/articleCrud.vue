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

          <q-input v-model="$attrs.article.item.ean13" label="EAN13" dense>
            <template v-slot:prepend><q-icon name="badge" /></template>
          </q-input>

          <q-input v-model="$attrs.article.item.name" label="Description article" dense>
            <template v-slot:prepend><q-icon name="badge" /></template>
          </q-input>

          <div class="row justify-between">
            <q-select label="Marque" dense class="col-10" :options="articleBrandOptions" @input-value="onChangeArticleBrand"
              :model-value="$attrs.article.item.brand.name" use-input fill-input input-debounce="0" hide-selected
            >
              <template v-slot:prepend><q-icon name="label" /></template>
            </q-select>
            <q-btn class="col-2" flat color="blue" icon="add" dense @click="addNewShop" :disabled="$attrs.article.item.brand && $attrs.article.item.brand.name"/>
          </div>

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

        <q-discount-view :total="$attrs.article.price" :remise_object="$attrs.article" :canEdit="true" />
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal" v-if="$attrs.canCreate">
          <q-btn flat label="OK" color="blue" type="submit" />
          <q-btn flat label="Cancel" color="red" type="reset" />
        </q-card-actions>
      </q-form>

      <q-card-section class="col-7" v-else>
        <q-card-section>
          <q-item-label>{{ $attrs.article.item.name }}</q-item-label>
          <q-item-label >(<small>{{ $attrs.article.item.ident }})</small></q-item-label>
          <q-item-label caption>{{ ($attrs.article.item.brand)? $attrs.article.item.brand.name : ''}} #<small>{{ $attrs.article.item.ean13 }}</small></q-item-label>
          <q-separator class="q-my-md" />
          <q-item-label>Groupe: {{ ($attrs.article.item.group)? $attrs.article.item.group.name : '<aucun>'}}</q-item-label>
          <q-item-label>Catégorie: {{ ($attrs.article.item.category)? $attrs.article.item.category.name : '<aucune>'}}</q-item-label>
          <q-separator class="q-my-md" />
          <q-item-label>Prix unitaire: {{ $attrs.article.price }}</q-item-label>
          <q-item-label>Quantitée: {{ $attrs.article.quantity }}</q-item-label>
          <q-item-label>Remise: {{ $attrs.article.remise }}</q-item-label>
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
import { defineComponent, PropType } from 'vue'
import { useQuasar } from 'quasar'

import AttachementForm from '../AttachementForm.vue'

import { Article, TDCAttachement, TDCBrand, TDCCategory, TDCGroup, TDCShop } from '../../models/models';

import CompletionService from '../../service/CompletionService';
import ItemArticleBrandService from '../../service/ItemArticleBrandService';
import QDiscountView from '../QDiscountView.vue';
import BrandDialogVue from '../brands/brandDialog.vue'

export default defineComponent({
  name: 'ArticleCrud',
  components: { AttachementForm, QDiscountView },
  props: {
      shop: {
        type: Object as PropType<TDCShop>,
        required: true
      },
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
        articleBrandOptions: [] as string[],
        articleGroupeOptions: [] as string[]
    }
  },
  mounted() {
      if (this.$attrs.canCreate && this.shop.id) {
        CompletionService.getCompletionOnChangedShopId(this.shop.id)
        .then((r) => {
            this.identOptions = r.data.item_ident;
            this.filteredIdentOptions = r.data.item_ident;
            this.articleCategoriesOptions = r.data.item_category;
            this.articleBrandOptions = r.data.item_brand;
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
      article.item.ean13 = 0;
      article.price = 0;
      article.quantity = 1;
      article.remise = 0.0;
      this.$emit('onCancel', this.$attrs.index);
    },
    onChangedArticleCategorie(category : string) {
        let article = this.$attrs.article as Article;
        article.item.category = {name: category} as TDCCategory;
    },
    onChangeArticleBrand(brand: string) {
        let article = this.$attrs.article as Article;
        if (brand) {
          article.item.brand = {name: brand} as TDCBrand;
        } else {
          article.item.brand = {} as TDCBrand;
        }
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
      if (article.item.ident && article.item.ident.length > 2) {
          CompletionService.getCompletionOnChangedArticleIdent(this.shop.name, article.item.ident)
          .then((r) => { 
                article.item.name = (r.data.item && r.data.item.name)? r.data.item.name : ident;
                article.item.ean13 = r.data.item.ean13;
                article.item.category = (r.data.item.category && r.data.item.category.name)? r.data.item.category : { name: '', id: 0, required: false} as TDCCategory;
                article.item.group = (r.data.item.group && r.data.item.group.name)? r.data.item.group : { name: '', id: 0 } as TDCGroup;
                article.item.attachement = (r.data.item.attachement)? r.data.item.attachement : {} as TDCAttachement;
                article.item.brand = (r.data.item.brand)? r.data.item.brand : {} as TDCBrand;
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
    },

    addNewShop() {
      let article = this.$attrs.article as Article;
      this.q.dialog({
        component: BrandDialogVue, 
        componentProps: { readOnly: article.item.brand, introduction_text: '' }
      }).onOk((r) => {
        ItemArticleBrandService.postBrand(r)
        .then((r) => { article.item.brand = r.data; this.articleBrandOptions.push(r.data.name); })
        .catch((r) => { console.log(r); alert(r); })
      }).onCancel(() => {
        article.item.brand = {} as TDCBrand;
        console.log('Cancel')
      })
    }
  }
})
</script>
