<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <category-crud-vue style="width: 700px; max-width: 80vw;"
      @onOk="onOKClick" @onCancel="onCancelClick"
      :category="category"
    />
  </q-dialog>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TDCCategory } from '../../models/models';
import CategoryCrudVue from './CategoryCrud.vue';

export default defineComponent({
  name: 'CategoryDialog',
  components: { CategoryCrudVue },
  props: {
    categoryReadOnly: {
      type: Object as PropType<TDCCategory>,
      required: true
    }
  },
  data () {
    return {
        category: this.categoryReadOnly
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
      this.$emit('ok', this.category);
      this.hide();
    },

    onCancelClick () {
      this.hide();
    }
  }
})
</script>