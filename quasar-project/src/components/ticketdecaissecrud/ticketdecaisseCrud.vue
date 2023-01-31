<template>
    <div class="q-pa-md">
      {{ tdc }}
        <div class="row justify-between" v-if="$attrs.canEdit">
          <q-btn class="col-2" flat color="green" icon="save" @click="submitTicketDeCaisse" label="Sauver et Envoyer" :disabled="!isTdcFIlledIn()" />
          <q-btn class="col-2" flat color="red" icon="delete" label="Abandonner" @click="leaveTicketDeCaisse" />
        </div>
        <div class="row items-start justify-around">
            <div class="col-6 q-gutter-y-md column">
              <div class="row items-start justify-around" v-if="$attrs.canEdit">
                <q-select label="Shop" dense class="col-5" @input-value="onChangedShop" 
                  :options="filteredShopNameOptions"
                  :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
                  :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'"
                  :model-value="tdc.shop" use-input fill-input input-debounce="0" hide-selected @filter="filterFn"
                >
                    <template v-slot:prepend><q-icon name="store" /></template>
                </q-select>
                <q-select label="Localisation" dense class="col-5" @input-value="onChangedLocalisation" 
                    :options="informationsOptions.localisation" 
                    :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
                    :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'"
                    :model-value="tdc.localisation" use-input fill-input input-debounce="0" hide-selected
                >
                    <template v-slot:prepend><q-icon name="gps_fixed" /></template>
                </q-select>
                <q-date-time-picker :tdc="tdc" class="col-5"
                />
                <q-select label="Catégorie" dense class="col-5" @input-value="onChangedCategorie"
                  :options="categoriesNameOptions" 
                  :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
                  :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'"
                  :model-value="tdc.category" use-input fill-input input-debounce="0" hide-selected
                >
                    <template v-slot:prepend><q-icon name="category" /></template>
                </q-select>
              </div>
              <div class="row items-start justify-around" v-else>
                <q-input v-model="tdc.shop.name" label="Shop" :dense="true" disable class="col-5" />
                <q-input v-model="tdc.localisation.name" label="Localisation" :dense="true" disable class="col-5" />
                <q-input v-model="tdc.date" label="Date" :dense="true" disable class="col-5" />
                <q-input v-model="tdc.category.name" label="Catégorie" :dense="true" disable class="col-5" />
              </div>

              <div class="row justify-around" v-if="$attrs.canEdit">
                  <q-btn outline color="green" icon="add_shopping_cart" @click="addNewArticle" label="Ajouter un article manuellement" :disabled="!tdc.shop && !tdc.localisation"/>
                  <q-btn outline color="green" icon="add_photo_alternate" @click="addNewArticle" label="Ajouter un article via la galery" disabled />
              </div>
              <div :key="articlesListKey" >
              <article-crud v-for="(article, i) in tdc.articles" :key="i" 
                  :canCreate="false" :canEdit="$attrs.canEdit" :canDelete="true"
                  :index="i" @onDeleteItem="onDeleteItem" @onEditItem="onEditItem"
                  :shop="tdc.shop.name" :localisation="tdc.localisation.name" :categorie="tdc.category.name"
                  :article="article"
              />
            </div>
          </div>
          <q-card class="my-card col-5" v-if="tdc.attachement && tdc.attachement.image">
              <q-card-section class="col-5 flex flex-center ">
                  <q-img :src="tdc.attachement.image" />
              </q-card-section>
          </q-card>
        </div>
        <q-dialog persistent transition-show="scale" transition-hide="scale" v-model="showEditArticle"
            @before-hide="saveNewArticle"
        >
            <article-crud 
              :canCreate="true" :canEdit="false" :canDelete="false"
              :index="-1" @onDeleteItem="null" @onEditItem="null" 
              :shop="tdc.shop.name" :localisation="tdc.localisation.name" :categorie="tdc.category.name" 
              :article="editArticleField"
            />
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Article, ItemArticle, TDCAttachement, TDCCategory, TDCGroup, TDCLocalisation, TDCShop } from '../../models/models';
import { TicketDeCaisse } from '../../models/models';
import { OnChangedShopNameResponse } from '../../models/models'

import ImageApi from '../../api/imagesApi'
import TDCShopApi from '../../api/tdcshopsApi'
import CompletionApi from '../../api/completionApi'
import TDCCategoryApi from '../../api/tdcCategoryApi'
import TicketdecaisseApi from '../../api/ticketdecaisseApi'

import QDateTimePicker from '../QDateTimePicker.vue'
import ArticleCrud from './articleCrud.vue'

export default defineComponent({
  name: 'TicketDeCaisseCrud',
  components: { ArticleCrud, QDateTimePicker },
  data () {
    return {
      articlesListKey: 0,
      tdcId: '' as string,
      shopNameOptions: [] as TDCShop[],
      filteredShopNameOptions: [] as TDCShop[],
      categoriesNameOptions: [] as TDCCategory[],
      informationsOptions: {} as OnChangedShopNameResponse,
      showEditArticle: false,
      editArticleField: { item : { group: {} as TDCGroup, attachement: {} as TDCAttachement, category: {} as TDCCategory } as ItemArticle } as Article
    }
  },
  setup(props, context) {
    let tdc = context.attrs.tdc as TicketDeCaisse;
    if (tdc.shop === null) {
      tdc.shop = {} as TDCShop;
    }
    if (tdc.localisation === null) {
      tdc.localisation = {} as TDCLocalisation;
    }
    if (tdc.category === null) {
      tdc.category = {} as TDCCategory;
    }
    for (let article of tdc.articles) {
      if (article.item.group === null) {
        article.item.group = {} as TDCGroup;
      }
      if (article.item.category === null) {
        article.item.category = {} as TDCCategory;
      }
    }
    return {
      tdc
    }
  },
  mounted() {
    TDCShopApi.getShops().then((r) => { 
      this.shopNameOptions = r.data;
      this.filteredShopNameOptions = this.shopNameOptions; 
    });
    TDCCategoryApi.getCategories().then((r) => { 
      this.categoriesNameOptions = r.data 
    });
  },
  methods: {
    addNewArticle() {
      this.editArticleField = { item : { group: {} as TDCGroup, attachement: {} as TDCAttachement, category: {} as TDCCategory } as ItemArticle } as Article
      this.showEditArticle = true;
    },
    saveNewArticle() {
      if (this.editArticleField.item.ident) {
        this.tdc.articles.push(this.editArticleField);
        this.showEditArticle = false;
      }
    },
    ticketImage() {
      return (this.tdcId) ? ImageApi.getImage('tickets', this.tdcId as string) : '';
    },
    onEditItem(index : number) {
      let articles = this.tdc.articles as Array<Article>;
      this.editArticleField = articles.splice(index, 1)[0];
      this.showEditArticle = true;
    },
    onDeleteItem(index : number) {
      let articles = this.tdc.articles as Array<Article>;
      articles.splice(index, 1);
      this.tdc.articles = articles;
      this.articlesListKey += 1;
    },
    onChangedShop(shopName : string) {
      if (this.tdc.shop === null) {
        this.tdc.shop = {} as TDCShop;
      }
      this.tdc.shop.name = shopName;
      if (this.tdc.shop && this.tdc.shop.name && this.tdc.shop.name.length > 2 && this.filteredShopNameOptions.length > 0) {
          this.tdc.localisation.name = '';
          this.tdc.category.name = '';
          CompletionApi.getCompletionOnChangedShopName(this.tdc.shop.name)
          .then((r) => {
            this.informationsOptions = r.data;
            this.onChangedCategorie(this.informationsOptions.item_category[0]);
            this.onChangedLocalisation(this.informationsOptions.tdc_localisation[0]);
          })
      }
    },
    onChangedLocalisation(localisation : string) {
      if (this.tdc.localisation === null) {
        this.tdc.localisation = {} as TDCLocalisation;
      }
      this.tdc.localisation.name = localisation;
    },
    onChangedCategorie(categorieName : string) {
      if (this.tdc.category === null) {
        this.tdc.category = {} as TDCCategory;
      }
      this.tdc.category.name = categorieName;
    },
    // eslint-disable-next-line
    filterFn (val : string, update : any) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.filteredShopNameOptions = this.shopNameOptions.filter(v => v.name.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },
    isTdcFIlledIn() {
      return this.tdc.shop && this.tdc.localisation && this.tdc.date && this.tdc.category && this.tdc.articles && this.tdc.articles.length > 0;
    },
    leaveTicketDeCaisse() {
      this.$router.push({ path: '/' });
    },
    submitTicketDeCaisse () {
      if (this.tdc) {
          TicketdecaisseApi.postTicketDeCaisse(this.tdc)
          .then(() => {
            alert('ok')
          })
          .catch((r) => {
            console.log(r);
            alert(r);
          });
        }
      }
    }
  }
)
</script>
