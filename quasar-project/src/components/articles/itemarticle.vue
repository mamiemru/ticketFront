<template>
  <q-card class="my-card" bordered square flat dense>
    <q-card-section class="row justify-center">
      <img :src="$attrs.itemarticle.attachement.image" v-if="$attrs.itemarticle.attachement && $attrs.itemarticle.attachement.image" class="col-5">
      <q-btn flat round color="blue" icon="edit" @click="openItemArticleCrudDialog" />
    </q-card-section>

    <q-list>
      <q-item clickable @click="onIdentClicked" dense>
        <q-item-section avatar><q-icon color="primary" /></q-item-section>
        <q-item-section>
          <q-item-label v-if="$attrs.itemarticle.brand">{{ $attrs.itemarticle.brand.name }}</q-item-label>
          <q-item-label>{{ $attrs.itemarticle.name }}</q-item-label>
          <q-item-label caption>{{ $attrs.itemarticle.ident }}</q-item-label>
          <q-item-label caption><small># {{ $attrs.itemarticle.ean13 }}</small></q-item-label>
        </q-item-section>
      </q-item>

      <q-item dense>
        <q-item-section avatar><q-icon color="red" /></q-item-section>
        <q-item-section>
          <q-item-label>{{ ($attrs.itemarticle.category)? $attrs.itemarticle.category.name : '' }}</q-item-label>
          <q-item-label caption>{{ ($attrs.itemarticle.group)? $attrs.itemarticle.group.name : '' }}</q-item-label>
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
