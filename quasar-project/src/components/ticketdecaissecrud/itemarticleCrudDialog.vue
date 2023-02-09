<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <item-article-crud style="width: 700px; max-width: 80vw;"
      @onOk="onOKClick" @onCancel="onCancelClick"
      :item="itemarticle"
    />
  </q-dialog>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemArticle } from '../../models/models';
import ItemArticleCrud from './itemarticleCrud.vue'

export default defineComponent({
  name: 'ItemArticleCrudDialog',
  components: { ItemArticleCrud },
  props: {
    itemArticleReadOnly: {
      type: Object as PropType<ItemArticle>,
      required: true
    }
  },
  data () {
    return {
        itemarticle: this.itemArticleReadOnly
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
      this.$emit('ok', this.itemarticle);
      this.hide();
    },

    onCancelClick () {
      this.hide();
    }
  }
})
</script>