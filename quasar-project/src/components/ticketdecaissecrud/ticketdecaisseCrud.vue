<template>
  <div class="q-py-md" style="width: 100%;">
    <div class="row justify-between q-py-md" v-if="$attrs.canEdit">
      <q-btn class="col-4" flat color="green" icon="save" @click="submitTicketDeCaisse" label="Sauver et Envoyer" :disabled="!isTdcFIlledIn()" />
      <q-btn class="col-4" flat color="red" icon="delete" label="Abandonner" @click="leaveTicketDeCaisse" />
    </div>
    <div class="row justify-end q-py-md" v-else-if="$attrs.canDelete">
      <q-btn class="col-2" flat color="red" icon="delete" label="Supprimer" @click="onDeleteTdc" />
    </div>
    <div class="row items-start justify-around q-py-md" style="width: 100%;">
      <div class="col-7 column justify-between">
        <div class="row justify-between">
          <div class="col-2 justify-center">
            <q-img v-if="tdc.shop.enseigne" :src="tdc.shop.enseigne.icon" style="max-height: 290px;" fit="scale-down" />
          </div>
          <div class="col-4">
            <q-select label="Shop" dense class="col-6" @update:model-value="onChangedShop" :disable="!$attrs.canEdit"
              :options="filteredShopNameOptions" emit-value map-options @filter="filterShops"
              :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
              :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"
              v-model="tdc.shop" use-input fill-input input-debounce="0" hide-selected
            >
                <template v-slot:prepend><q-icon name="store" /></template>
            </q-select>
            <div class="row">
              <q-input label="Adresse" dense class="col-6" :key="tdcKey" :disable="!$attrs.canEdit"
                v-model="tdc.shop.localisation" @change="removeTdcShopId"
              >
                  <template v-slot:prepend><q-icon name="gps_fixed" /></template>
              </q-input>
              <q-input label="Ville" dense class="col-4" :key="tdcKey" :disable="!$attrs.canEdit"
                v-model="tdc.shop.city" @change="removeTdcShopId"
              >
              </q-input>
              <q-input label="CP" dense class="col-2" :key="tdcKey" :disable="!$attrs.canEdit"
                v-model="tdc.shop.postal_code" @change="removeTdcShopId"
              >
              </q-input>
            </div>
          </div>
          <div class="col-3">
            <q-date-time-picker :tdc="tdc" class="col-4" :canEdit="$attrs.canEdit"
            />
            <q-select label="Catégorie" dense class="col-4" @input-value="onChangedCategorie" :key="tdcKey"
              :options="filteredCategoriesNameOptions"  :disable="!$attrs.canEdit"
              :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
              :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"
              :model-value="tdc.category" use-input fill-input input-debounce="0" hide-selected
            >
                <template v-slot:prepend><q-icon name="category" /></template>
            </q-select>
          </div>
          <div class="col-2">
              <q-input v-model="tdc.total" label="Total" :dense="true" disable class="col-5"
              >
                <template v-slot:prepend><q-icon name="euro_symbol" /></template>
              </q-input>
            <q-discount-view :total="tdc.total" :remise_object="tdc" :canEdit="$attrs.canEdit" />
          </div>
        </div>

        <div class="row justify-around q-py-md" v-if="$attrs.canEdit">
          <q-btn outline color="green" icon="add_shopping_cart" @click="addNewArticle" label="Ajouter un article manuellement" 
            :disabled="!tdc.shop || !tdc.shop.name"
          />
          <q-btn outline color="green" icon="tag" @click="openEAn13Gs1FormDialog" label="Ajouter via EAN13 GS1"
          />
          <q-btn outline color="green" icon="add_photo_alternate" @click="addNewArticle" label="Ajouter via la galery" disabled
          />
        </div>
        <div :key="articlesListKey" class="row q-py-md" v-if="tdc.type != 'recepiece'">
          <article-crud class="col-6" v-for="(article, i) in tdc.articles" :key="i" 
              :canCreate="false" :canEdit="$attrs.canEdit" :canDelete="true"
              :index="i" @onDeleteItem="onDeleteItem" @onEditItem="onEditItem"
              :shop="tdc.shop" :article="article"
          />
        </div>
      </div>
      <q-card class="my-card col-4" flat bordered v-if="tdc.attachement && tdc.attachement.image">
        <q-img :src="tdc.attachement.image" />
      </q-card>
      <q-card class="my-card col-4" flat bordered v-else-if="$attrs.canEdit">
        <attachement-form @submited="onUploadAttachementSubmited" @error="null" category="ticket" type="ticket" />
      </q-card>
    </div>
    <pre>{{ tdc }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import { TDCAttachement, TDCBrand, TDCCategory, TDCGroup, TDCShop } from '../../models/models';
import { TicketDeCaisse, Article, ItemArticle } from '../../models/models';
import { OnChangedShopNameResponse } from '../../models/models'

import TDCShopService from '../../service/TDCShopService'
import CompletionService from '../../service/CompletionService'
import TDCCategoryService from '../../service/TDCCategoryService'
import TicketdecaisseService from '../../service/TicketdecaisseService'

import AttachementForm from '../AttachementForm.vue'
import ArticleCrud from './articleCrud.vue'
import QDateTimePicker from '../QDateTimePicker.vue'
import articleCrudDialogVue from './articleCrudDialog.vue';
import ShopDialogVue from '../shops/shopDialog.vue'
import QDiscountView from '../QDiscountView.vue';
import ArticleService from '../../service/ArticleService';

export default defineComponent({
  name: 'TicketDeCaisseCrud',
  components: { ArticleCrud, QDiscountView, QDateTimePicker, AttachementForm },
  data () {
    return {
      file: null,
      isFileUploading: false,
      tdcKey: 0,
      articlesListKey: 0,
      tdcId: '' as string,
      shopNameOptions: [] as TDCShop[],
      categoriesNameOptions: [] as TDCCategory[],
      localisationsNameOptions: [] as string[],
      filteredShopNameOptions: [] as TDCShop[],
      filteredCategoriesNameOptions: [] as TDCCategory[],
      filteredLocalisationNameOptions: [] as string[],
      informationsOptions: {} as OnChangedShopNameResponse
    }
  },
  setup(props, context) {
    const q = useQuasar()
    let tdc = context.attrs.tdc as TicketDeCaisse;
    if (tdc.shop === null) {
      tdc.shop = { valide: false } as TDCShop;
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
      if (article.item.brand === null) {
        article.item.brand = {} as TDCBrand;
      }
    }
    return {
      tdc, q
    }
  },
  mounted() {
    if (this.$attrs.canEdit) {
      TDCShopService.getShops().then((r) => { 
        this.shopNameOptions = r.data;
        console.log(this.shopNameOptions)
        this.filteredShopNameOptions = this.shopNameOptions as TDCShop[]; 
      });
      TDCCategoryService.getCategories().then((r) => { 
        this.categoriesNameOptions = r.data;
        this.filteredCategoriesNameOptions = this.categoriesNameOptions as TDCCategory[];
      });
    }

    if (this.tdc.shop && this.tdc.shop.valide === false) {
      this.q.dialog({
        component: ShopDialogVue,
        componentProps: { shopReadOnly: this.tdc.shop, introduction_text: 'Nous avons pas trouvé l\'enseigne dans notre base' }
      }).onOk((r) => {
        this.tdc.shop = Object.assign(this.tdc.shop, r);
      }).onCancel(() => {
        console.log('Cancel')
      })
    }
  },
  methods: {
    removeTdcShopId() {
      this.tdc.shop.id = undefined;
    },

    updateTotal() {
      let total = 0;
      for (let article of this.tdc.articles) {
        total += ((article.price * article.quantity) - article.remise)
      }
      this.tdc.total = total;
    },

    addNewArticle() {
      let article = { 
        item : { 
          group: {} as TDCGroup, attachement: {} as TDCAttachement, category: {} as TDCCategory, brand : {} as TDCBrand
        } as ItemArticle 
      } as Article;
      this.openArticleCrudDialog(article, false);
    },

    onEditItem(index : number) {
      let articles = this.tdc.articles as Array<Article>;
      let article = articles.splice(index, 1)[0];
      this.openArticleCrudDialog(article, true);
    },

    openArticleCrudDialog(article : Article, update: boolean) {
      this.q.dialog({
        component: articleCrudDialogVue,
        componentProps: { tdc: this.tdc, articleReadonly: article }
      }).onOk((r) => {
        this.tdc.articles.push(r);
        this.updateTotal();
      }).onCancel(() => {
        if (update) {
          this.tdc.articles.push(article);
        }
        console.log('Cancel')
      });
    },

    openEAn13Gs1FormDialog() {
      this.q.dialog({
        title: 'Prompt',
        message: 'EAN13 ou GS1 du produit',
        prompt: {
          model: '',
          isValid: val => val.length > 6,
          type: 'text'
        },
        cancel: true,
        persistent: true
      }).onOk((productCode) => {
        ArticleService.getArticleByEan13Gs1(productCode)
        .then((r) => {
          this.tdc.articles.push(r.data);
          this.updateTotal();
        }).catch((r) => {
          console.log(r);
          alert(r);
        })
      }).onCancel(() => {
        console.log('Cancel')
      });
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
        TicketdecaisseService.deleteTicketDeCaisse(this.tdc.id)
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch((r) => { alert(r); console.log(r); })
      })
    },

    onChangedShop(shop_id : number) {
      if (shop_id) {
        let selected_shops = this.shopNameOptions.filter((shop : TDCShop) => shop.id === Number(shop_id));
        if (selected_shops && selected_shops[0]) {
          this.tdc.shop = selected_shops[0];
          if (this.tdc.shop.id) {
            CompletionService.getCompletionOnChangedShopId(this.tdc.shop.id)
            .then((r) => {
              this.informationsOptions = r.data;
              this.onChangedCategorie(this.informationsOptions.item_category[0]);
              if (r.data.tdc.valide) {
                this.tdc.shop = r.data.tdc;
              }
              this.tdcKey += 1;
            })
            .catch((r) => {
              console.log(r);
            })
          }
        }
      }
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
        this.filteredLocalisationNameOptions = this.localisationsNameOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },

    isTdcFIlledIn() {
      return this.tdc.shop && this.tdc.shop.localisation && this.tdc.date && this.tdc.category && this.tdc.articles && this.tdc.articles.length > 0;
    },

    leaveTicketDeCaisse() {
      this.$router.push({ path: '/' });
    },

    submitTicketDeCaisse () {
      TicketdecaisseService.postTicketDeCaisse(this.tdc)
      .then(() => {
        alert('ok TODO')
      })
      .catch((r) => {
        console.log(r);
        alert(r);
      });
    },

    onUploadAttachementSubmited(r : TDCAttachement) {
          this.tdc.attachement = r;
    }
  }
})
</script>
