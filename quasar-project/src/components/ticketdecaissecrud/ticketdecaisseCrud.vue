<template>
    <div class="q-py-md">
      {{ tdc }}
      <div class="row justify-between q-py-md" v-if="$attrs.canEdit">
        <q-btn class="col-2" flat color="green" icon="save" @click="submitTicketDeCaisse" label="Sauver et Envoyer" :disabled="!isTdcFIlledIn()" />
        <q-btn class="col-2" flat color="red" icon="delete" label="Abandonner" @click="leaveTicketDeCaisse" />
      </div>
      <div class="row justify-end q-py-md" v-else-if="$attrs.canDelete">
        <q-btn class="col-2" flat color="red" icon="delete" label="Supprimer" @click="onDeleteTdc" />
      </div>
      <div class="row items-start justify-around q-py-md" style="width: 100%;">

        <div class="col-7 column justify-between">
          <div class="row">
            <div class="col-10">
              <div class="row items-start justify-around" v-if="$attrs.canEdit">
                <q-select label="Shop" dense class="col-5" @input-value="onChangedShop" 
                  :options="filteredShopNameOptions"
                  :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
                  :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"
                  :model-value="tdc.shop" use-input fill-input input-debounce="0" hide-selected @filter="filterShops"
                >
                    <template v-slot:prepend><q-icon name="store" /></template>
                </q-select>
                <q-select label="Localisation" dense class="col-5" @input-value="onChangedLocalisation" :key="tdcKey"
                    :options="filteredLocalisationNameOptions" 
                    :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
                    :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"
                    :model-value="tdc.localisation" use-input fill-input input-debounce="0" hide-selected @filter="filterLocalisations"
                >
                    <template v-slot:prepend><q-icon name="gps_fixed" /></template>
                </q-select>
                <q-date-time-picker :tdc="tdc" class="col-5"
                />
                <q-select label="Catégorie" dense class="col-5" @input-value="onChangedCategorie" :key="tdcKey"
                  :options="filteredCategoriesNameOptions" 
                  :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
                  :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"
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
            </div>
            <div class="col-2">
              <q-input v-model="tdc.total" label="Total" :dense="true" disable class="col-5" />
            </div>
          </div>

          <div class="row justify-around q-py-md" v-if="$attrs.canEdit">
            <q-btn outline color="green" icon="add_shopping_cart" @click="addNewArticle" label="Ajouter un article manuellement" 
              :disabled="!tdc.shop || !tdc.shop.name"
            />
            <q-btn outline color="green" icon="add_photo_alternate" @click="addNewArticle" label="Ajouter un article via la galery" disabled />
          </div>
          <div :key="articlesListKey" class="row q-py-md">
            <article-crud class="col-6" v-for="(article, i) in tdc.articles" :key="i" 
                :canCreate="false" :canEdit="$attrs.canEdit" :canDelete="true"
                :index="i" @onDeleteItem="onDeleteItem" @onEditItem="onEditItem"
                :shop="tdc.shop.name" :localisation="tdc.localisation.name" :categorie="tdc.category.name"
                :article="article"
            />
          </div>
        </div>
        <q-card class="my-card col-4" flat bordered v-if="tdc.attachement && tdc.attachement.image">
          <q-img :src="tdc.attachement.image" />
        </q-card>
        <q-card class="my-card col-4" flat bordered v-else>
          <div class="column" v-if="isFileUploading">
            <q-inner-loading
              :showing="isFileUploading"
              label="Please wait..."
              label-class="text-teal"
              label-style="font-size: 1.1em"
            />
          </div>
          <div class="column" v-else>
            <div class="col-4 row justify-around">
              <h5>Importer une pièce jointe (optionel)</h5>
            </div> 
            <div class="col-4 items-center justify-around">  
              <div class="col-2 q-gutter-y-md column">
                <q-file filled v-model="file" label="Choise file" stack-label />
              </div>
              <div class="col-2 q-gutter-y-md column">
                <q-btn color="black" class="full-width" label="Envoyer"
                  @click="uploadLateAttachementFile" 
                /> 
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import { TDCAttachement, TDCCategory, TDCGroup, TDCLocalisation, TDCShop } from '../../models/models';
import { TicketDeCaisse, Article, ItemArticle } from '../../models/models';
import { OnChangedShopNameResponse } from '../../models/models'

import ImageApi from '../../api/imagesApi'
import TDCShopApi from '../../api/tdcshopsApi'
import CompletionApi from '../../api/completionApi'
import TDCCategoryApi from '../../api/tdcCategoryApi'
import TicketdecaisseApi from '../../api/ticketdecaisseApi'
import TDCLocalisationApi from '../../api/tdcLocalisationApi'

import ArticleCrud from './articleCrud.vue'
import QDateTimePicker from '../QDateTimePicker.vue'
import articleCrudDialogVue from './articleCrudDialog.vue';

export default defineComponent({
  name: 'TicketDeCaisseCrud',
  components: { ArticleCrud, QDateTimePicker },
  data () {
    return {
      file: null,
      isFileUploading: false,
      tdcKey: 0,
      articlesListKey: 0,
      tdcId: '' as string,
      shopNameOptions: [] as TDCShop[],
      categoriesNameOptions: [] as TDCCategory[],
      localisationsNameOptions: [] as TDCLocalisation[],
      filteredShopNameOptions: [] as TDCShop[],
      filteredCategoriesNameOptions: [] as TDCCategory[],
      filteredLocalisationNameOptions: [] as TDCLocalisation[],
      informationsOptions: {} as OnChangedShopNameResponse
    }
  },
  setup(props, context) {
    const q = useQuasar()
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
    if (tdc.articles === null) {
      tdc.articles = [] as Article[];
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
      tdc, q
    }
  },
  mounted() {
    TDCShopApi.getShops().then((r) => { 
      this.shopNameOptions = r.data;
      console.log(this.shopNameOptions)
      this.filteredShopNameOptions = this.shopNameOptions as TDCShop[]; 
    });
    TDCCategoryApi.getCategories().then((r) => { 
      this.categoriesNameOptions = r.data;
      this.filteredCategoriesNameOptions = this.categoriesNameOptions as TDCCategory[];
    });
    TDCLocalisationApi.getLocalisations().then((r) => {
      this.localisationsNameOptions = r.data;
      this.filteredLocalisationNameOptions = this.localisationsNameOptions as TDCLocalisation[];
    })
  },
  methods: {
    updateTotal() {
      let total = 0;
      this.tdc.articles.forEach((article) => total += ((article.price * article.quantity) - article.remise));
      this.tdc.total = total;
    },
    addNewArticle() {
      this.openArticleCrudDialog(
        { item : { group: {} as TDCGroup, attachement: {} as TDCAttachement, category: {} as TDCCategory } as ItemArticle } as Article
      );
    },
    onEditItem(index : number) {
      let articles = this.tdc.articles as Array<Article>;
      let article = articles.splice(index, 1)[0];
      console.log(article);
      this.openArticleCrudDialog(article);
    },
    openArticleCrudDialog(article : Article) {
      this.q.dialog({
        component: articleCrudDialogVue,
        componentProps: { tdc: this.tdc, articleReadonly: article }
      }).onOk((r) => {
        this.tdc.articles.push(r);
        this.updateTotal();
      }).onCancel(() => {
        console.log('Cancel')
      })
    },
    onDeleteItem(index : number) {
      let articles = this.tdc.articles as Array<Article>;
      articles.splice(index, 1);
      this.tdc.articles = articles;
      this.updateTotal();
      this.articlesListKey += 1;
    },
    onDeleteTdc() {
      this.q.dialog({
        title: 'Confirmation',
        message: `Confirmation de suppresion du tdc ${this.tdc.id}`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        TicketdecaisseApi.deleteTicketDeCaisse(this.tdc.id)
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch((r) => { alert(r); console.log(r); })
      })
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

          // let cetegoriesNeedle = this.informationsOptions.tdc_category.map(v => v.toLowerCase());
          // let localisationNeedle = this.informationsOptions.tdc_localisation.map(v => v.toLowerCase());

          // this.filteredCategoriesNameOptions = this.categoriesNameOptions.filter(v => v.name.toLocaleLowerCase() in cetegoriesNeedle);
          // this.filteredLocalisationNameOptions = this.localisationsNameOptions.filter(v => v.name.toLocaleLowerCase() in localisationNeedle);

          this.onChangedCategorie(this.informationsOptions.item_category[0]);
          this.onChangedLocalisation(this.informationsOptions.tdc_localisation[0]);
          this.tdcKey += 1;
        })
        .catch((r) => {
          console.log(r);
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
    filterShops (val : string, update : any) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.filteredShopNameOptions = this.shopNameOptions.filter(v => v.name.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },
    // eslint-disable-next-line
    filterLocalisations (val : string, update : any) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.filteredLocalisationNameOptions = this.localisationsNameOptions.filter(v => v.name.toLocaleLowerCase().indexOf(needle) > -1)
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
    },
    uploadLateAttachementFile() {
      if (this.file) {
        let formData = new FormData();
        formData.append('image', this.file);
        formData.append('category', 'ticket');
        formData.append('type', 'ticket');
        formData.append('name', '');
        this.isFileUploading = true;
        ImageApi.uploadAttachment(formData)
        .then((r) => {
          this.tdc.attachement = r.data;
          this.isFileUploading = false;
        })
        .catch((r) => {
          this.isFileUploading = false;
          alert(r);
          console.log(r);
        })
      }
    },
  }
})
</script>
