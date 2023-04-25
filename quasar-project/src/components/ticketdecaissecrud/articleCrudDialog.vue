<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <article-crud style="width: 700px; max-width: 85vw;"
        :canCreate="true" :canEdit="false" :canDelete="false"
        :index="-1" @onDeleteItem="null" @onEditItem="null" @onOk="onOKClick" @onCancel="onCancelClick"
        :shop="tdc.shop" :article="article"
    />
  </q-dialog>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TicketDeCaisse, Article } from '../../models/models';
import ArticleCrud from './articleCrud.vue'

export default defineComponent({
  name: 'ArticleCrudDialog',
  components: { ArticleCrud },
  props: {
    tdc: {
      type: Object as PropType<TicketDeCaisse>,
      required: true
    },
    articleReadonly: {
      type: Object as PropType<Article>,
      required: true
    }
  },
  data () {
    return {
        article: this.articleReadonly
    }
  },
  emits: [ 'ok', 'hide' ],
  methods: {
    show () {
      let dialog = this.$refs.dialog as HTMLFormElement;
      dialog.show();
    },

    hide () {
      let dialog = this.$refs.dialog as HTMLFormElement;
      dialog.hide();
    },

    onDialogHide () {
      this.$emit('hide');
    },

    onOKClick () {
      this.$emit('ok', this.article);
      this.hide();
    },

    onCancelClick () {
      this.hide();
    }
  }
})
</script>