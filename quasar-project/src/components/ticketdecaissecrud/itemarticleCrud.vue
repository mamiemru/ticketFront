<template>
  <q-card class="text-grey" flat bordered square>
    <q-card-section>
      <div class="text-h6">Editer un item article</div>
    </q-card-section>

    <q-card-section horizontal clas="row">
      <q-card-section class="col-5" v-if="$attrs.item.attachement && $attrs.item.attachement.image">
        <q-img :src="$attrs.item.attachement.image" style="max-height: 290px;" fit="scale-down" />
      </q-card-section>
      <q-card-section class="col-5" v-else-if="$attrs.item.ident">
        <attachement-form @submited="onUploadItemAttachementSubmited" @error="null" category="article" type="" :name="$attrs.item.ident" />
      </q-card-section>
      <q-card-section class="col-5" v-else>
      </q-card-section>

      <q-form @submit="onSubmit" @reset="onReset" class="col-6">
        
        <q-card-section>
          <q-input label="Identifiant article" dense class="col-5" v-model="$attrs.item.ident"
          >
            <template v-slot:prepend><q-icon name="fingerprint" /></template>
          </q-input>

          <q-input label="EAN13" dense class="col-5" v-model="$attrs.item.ean13"
          >
            <template v-slot:prepend><q-icon name="fingerprint" /></template>
          </q-input>

          <q-input v-model="$attrs.item.name" label="Description article" :dense="true" >
            <template v-slot:prepend><q-icon name="badge" /></template>
          </q-input>

          <div class="row justify-between">
            <q-select label="Marque" dense class="col-10" :options="articleBrandOptions" @input-value="onChangeArticleBrand"
              :model-value="$attrs.item.brand.name" use-input fill-input input-debounce="0" hide-selected
            >
              <template v-slot:prepend><q-icon name="label" /></template>
            </q-select>
            <q-btn class="col-2" flat color="blue" icon="add" dense @click="addNewShop" :disabled="$attrs.item.brand && $attrs.item.brand.name"/>
          </div>

          <q-select label="Categorie" dense class="col-5" :options="articleCategoriesOptions" @input-value="onChangedItemArticleCategory"
            :model-value="$attrs.item.category.name" use-input fill-input input-debounce="0" hide-selected
          >
            <template v-slot:prepend><q-icon name="label" /></template>
          </q-select>

          <q-select label="Groupe" dense class="col-5" :options="articleGroupOptions" @input-value="onChangedItemArticleGroup"
            :model-value="$attrs.item.group.name" use-input fill-input input-debounce="0" hide-selected
          >
            <template v-slot:prepend><q-icon name="label" /></template>
          </q-select>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" color="blue" type="submit" />
          <q-btn flat label="Cancel" color="red" type="reset" />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import BrandDialogVue from '../brands/brandDialog.vue'
import AttachementForm from '../AttachementForm.vue'

import { ItemArticle, TDCAttachement, TDCBrand, TDCCategory, TDCGroup } from '../../models/models';
import ItemArticleCategoryService from '../../service/ItemArticleCategoryService';
import ItemArticleGroupService from '../../service/ItemArticleGroupService';
import ItemArticleBrandService from '../../service/ItemArticleBrandService';

export default defineComponent({
  name: 'ItemArticleCrud',
  components: { AttachementForm },
  setup(props, context) {
    const q = useQuasar()
    let item = context.attrs.item as ItemArticle;
    if (!item.category) {
      item.category = {name: ''} as TDCCategory;
    }
    if (!item.group) {
      item.group = { name: ''} as TDCGroup;
    }
    if (!item.brand) {
      item.brand = {} as TDCBrand;
    }
    return { q }
  },
  data () {
    return {
      articleCategoriesOptions: [] as string[],
      articleGroupOptions: [] as string[],
      articleBrandOptions: [] as string[]
    }
  },
  mounted() {
    let item = this.$attrs.item as ItemArticle;

    if (!item.name) {
      item.name = item.ident.toUpperCase();
    }

    ItemArticleCategoryService.getCategories()
    .then((r) => { this.articleCategoriesOptions = r.data.map((c) => c.name); }).catch((r) => { console.log(r); })
    ItemArticleGroupService.getGroups()
    .then((r) => { this.articleGroupOptions = r.data.map((g) => g.name); }).catch((r) => { console.log(r); })
    ItemArticleBrandService.getBrands()
    .then((r) => { this.articleBrandOptions = r.data.map((g) => g.name); }).catch((r) => { console.log(r); })

  },
  methods: {
    onSubmit () {
      let item = this.$attrs.item as ItemArticle;
      if (item.ident && item.category && item.name && item.group) {
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
      let item = this.$attrs.item as ItemArticle;
      item.name = undefined;
      item.category = undefined;
      item.group = undefined;
      item.attachement = undefined;
      this.$emit('onCancel', this.$attrs.index);
    },
    onChangedItemArticleCategory(category : string) {
        let item = this.$attrs.item as ItemArticle;
        item.category = {name: category} as TDCCategory;
    },
    onChangedItemArticleGroup(group : string) {
        let item = this.$attrs.item as ItemArticle;
        item.group = {name: group} as TDCGroup;
    },
    onChangeArticleBrand(brand: string) {
      let item = this.$attrs.item as ItemArticle;
      item.brand = {name: brand} as TDCBrand;
    },
    onUploadItemAttachementSubmited(r : TDCAttachement) {
      let item = this.$attrs.item as ItemArticle;
      item.attachement = r;
    },
    addNewShop() {
      let item = this.$attrs.item as ItemArticle;
      this.q.dialog({
        component: BrandDialogVue, 
        componentProps: { readOnly: item.brand, introduction_text: '' }
      }).onOk((r) => {
        ItemArticleBrandService.postBrand(r)
        .then((r) => { item.brand = r.data; this.articleBrandOptions.push(r.data.name); })
        .catch((r) => { console.log(r); alert(r); })
      }).onCancel(() => {
        item.brand = {} as TDCBrand;
        console.log('Cancel')
      })
    }
  }
})
</script>
