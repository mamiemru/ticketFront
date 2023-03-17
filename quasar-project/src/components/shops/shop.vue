<template>
  <q-card class="my-card" bordered square flat>
    <q-card-section class="row justify-center">
      <img :src="$attrs.shop.attachement.image" v-if="$attrs.shop.attachement && $attrs.shop.attachement.image" class="col-5">
      <q-btn v-else flat round color="blue" icon="edit" disable @click="openItemArticleCrudDialog" />
    </q-card-section>

    <q-list>
      <q-item clickable @click="onIdentClicked">
        <q-item-section avatar><q-icon color="primary" name="fingerprint" /></q-item-section>
        <q-item-section>
          <q-item-label>{{ $attrs.shop.ident }}</q-item-label>
          <q-item-label caption>{{ $attrs.shop.name }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar><q-icon color="red" name="label" /></q-item-section>
        <q-item-section>
          <q-item-label>{{ $attrs.shop.city }}</q-item-label>
          <q-item-label caption>{{ $attrs.shop.localisation }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'
import ItemArticleService from '../../service/ItemArticleService'
import { ItemArticle } from '../../models/models'
import itemarticleCrudDialogVue from '../ticketdecaissecrud/itemarticleCrudDialog.vue';

export default defineComponent({
  name: 'ItemArticle',
  components: {},
  data() {
    return {}
  },
  setup() {
    const q = useQuasar()
    return { q }
  },
  methods: {
    onIdentClicked() {
      let itemarticle = this.$attrs.itemarticle as ItemArticle;
      this.$router.push({ name: 'display_articles_with_ident', params: { ident: itemarticle.ident} });
    },
    openItemArticleCrudDialog() {
      this.q.dialog({
        component: itemarticleCrudDialogVue,
        componentProps: { itemArticleReadOnly: this.$attrs.itemarticle }
      }).onOk((r) => {
        this.onUploadAttachementSubmited(r);
      }).onCancel(() => {
        console.log('Cancel')
      })
    },
    onUploadAttachementSubmited(itemArticle: ItemArticle) {
      ItemArticleService.putItemArticle(itemArticle)
      .then((r) => {
        this.$attrs.itemarticle = r.data;
      })
      .catch((r) => { this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: r.data
        })
      })
    }
  }
});
</script>
