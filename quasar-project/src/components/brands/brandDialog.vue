<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <brand-crud style="width: 700px; max-width: 80vw;"
      @onOk="onOKClick" @onCancel="onCancelClick" :introduction_text="introduction_text"
      :brand="brand"
    />
  </q-dialog>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TDCBrand } from '../../models/models';
import brandCrud from './brandCrud.vue';

export default defineComponent({
  name: 'ItemArticleCrudDialog',
  components: { brandCrud },
  props: {
    readOnly: {
      type: Object as PropType<TDCBrand>,
      required: true
    },
    introduction_text: {
      type: String,
      required: false
    }
  },
  data () {
    return {
        brand: this.readOnly
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
      this.$emit('ok', this.brand);
      this.hide();
    },

    onCancelClick () {
      this.hide();
    }
  }
})
</script>