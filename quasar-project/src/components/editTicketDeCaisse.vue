<template>
    <div class="q-pa-md">
        <div class="row justify-between">
          <q-btn class="col-2" flat color="green" icon="save" @click="submitTicketDeCaisse" label="Sauver et Envoyer" :disabled="!isTdcFIlledIn()" />
          <q-btn class="col-2" flat color="red" icon="delete" label="Abandonner" @click="leaveTicketDeCaisse" />
        </div>
        <div class="row items-start justify-around">
            <div class="col-6 q-gutter-y-md column">
                <div class="row items-start justify-around">
                <q-select label="Shop" dense class="col-5" @input-value="onChangedShop" :options="filteredShopNameOptions"
                    :model-value="tdc.shop.name" use-input fill-input input-debounce="0" hide-selected @filter="filterFn"
                >
                    <template v-slot:prepend>
                    <q-icon name="store" />
                    </template>
                </q-select>
                <q-select label="Localisation" dense class="col-5" @input-value="onChangedLocalisation" :options="informationsOptions.localisation" 
                    :model-value="tdc.localisation.name" use-input fill-input input-debounce="0" hide-selected
                >
                    <template v-slot:prepend><q-icon name="gps_fixed" /></template>
                </q-select>
                <q-date-time-picker :tdc="tdc" class="col-5"
                />
                <q-select label="Catégorie" dense class="col-5" :options="categoriesNameOptions" @input-value="onChangedCategorie"
                    :model-value="tdc.categorie.name" use-input fill-input input-debounce="0" hide-selected
                >
                    <template v-slot:prepend>
                    <q-icon name="category" />
                    </template>
                </q-select>
                </div>
                <div class="row justify-around">
                    <q-btn outline color="green" icon="add_shopping_cart" @click="addNewArticle" label="Ajouter un article manuellement" :disabled="!tdc.shop && !tdc.localisation"/>
                    <q-btn outline color="green" icon="add_photo_alternate" @click="addNewArticle" label="Ajouter un article via la galery" disabled />
                </div>
                <div :key="articlesListKey" >
                <TicketDeCaisseArticleDisplay v-for="(article, i) in tdc.articles" :key="i" 
                    :article="article" :formDisabled="false" :index="i" 
                    @onDeleteItem="onDeleteItem" @onEditItem="onEditItem"
                />
                </div>
            </div>
            <q-card class="my-card col-5" v-if="ticketImage()">
                <q-card-section class="col-5 flex flex-center ">
                    <q-img :src="ticketImage()" />
                </q-card-section>
            </q-card>
        </div>
        <q-dialog persistent transition-show="scale" transition-hide="scale" v-model="showEditArticle"
            @before-hide="saveNewArticle"
        >
            <edit-article
                :shop="tdc.shop" :localisation="tdc.localisation" :categorie="tdc.categorie" :editArticleField="editArticleField"
            />
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Article, ItemArticle } from '../models/models';
import { TicketDeCaisse } from '../models/models';
import { OnChangedShopNameResponse } from '../models/models'

import TicketDeCaisseArticleDisplay from '../components/TicketDeCaisseArticleDisplay.vue'
import QDateTimePicker from '../components/QDateTimePicker.vue'
import EditArticle from './editArticle.vue';

import ImageApi from '../api/imagesApi';
import CompletionApi from '../api/completionApi';
import TicketdecaisseApi from '../api/ticketdecaisseApi';

export default defineComponent({
  name: 'EditdTicketDeCaisse',
  components: { TicketDeCaisseArticleDisplay, QDateTimePicker, EditArticle },
  data () {
    return {
      articlesListKey: 0,
      tdc: { articles: [] as Article[] } as TicketDeCaisse,
      tdcId: '' as string,
      shopNameOptions: [] as string[],
      categoriesNameOptions: [] as string[],
      filteredShopNameOptions: [] as string[],
      informationsOptions: {} as OnChangedShopNameResponse,
      showEditArticle: false,
      editArticleField: { item : {} as ItemArticle } as Article
    }
  },
  mounted() {
    if (this.$attrs.tdc) {
      this.tdc = this.$attrs.tdc as TicketDeCaisse;
    }
    CompletionApi.getCompletionShopName()
    .then((r) => {
      this.shopNameOptions = r.data.shop;
      this.categoriesNameOptions = r.data.categorie;
      this.filteredShopNameOptions = this.shopNameOptions;
    })
  },
  methods: {
    getTdc(tdcId: string) {
      TicketdecaisseApi.getTicketDeCaisse(tdcId)
      .then((r) => {
          this.tdc = r.data;
      })
    },
    addNewArticle() {
        this.editArticleField = { item : {} as ItemArticle } as Article;
        this.showEditArticle = true;
    },
    saveNewArticle() {
        this.tdc.articles.push(this.editArticleField);
        this.showEditArticle = false;
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
      this.tdc.shop.name = shopName;
      if (this.tdc.shop && this.tdc.shop.name && this.tdc.shop.name.length > 2 && this.filteredShopNameOptions.length > 0) {
          this.tdc.localisation.name = '';
          this.tdc.category.name = '';
          CompletionApi.getCompletionOnChangedShopName(this.tdc.shop.name)
          .then((r) => {
            this.informationsOptions = r.data;
            this.tdc.category.name = this.informationsOptions.categorie;
          })
      }
    },
    onChangedLocalisation(localisation : string) {
      this.tdc.localisation.name = localisation;
    },
    onChangedCategorie(categorieName : string) {
      this.tdc.category.name = categorieName;
    },
    // eslint-disable-next-line
    filterFn (val : string, update : any) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.filteredShopNameOptions = this.shopNameOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
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
        if (this.tdcId) {
          TicketdecaisseApi.putTicketDeCaisse(this.tdc, this.tdcId)
          .then(() => {
            this.$router.push({ path: '/' })
          })
          .catch((r) => {
            console.log(r);
            alert(r);
          });
        } else {
          TicketdecaisseApi.postTicketDeCaisse(this.tdc)
          .then(() => {
            this.$router.push({ path: '/' })
          })
          .catch((r) => {
            console.log(r);
            alert(r);
          });
        }
      }
    }
  }
})
</script>
