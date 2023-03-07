<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <shop-crud-vue style="width: 700px; max-width: 80vw;"
      @onOk="onOKClick" @onCancel="onCancelClick"
      :shop="shop"
    />
  </q-dialog>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TDCShop } from '../../models/models';
import shopCrudVue from './shopCrud.vue';

export default defineComponent({
  name: 'ItemArticleCrudDialog',
  components: { shopCrudVue },
  props: {
    shopReadOnly: {
      type: Object as PropType<TDCShop>,
      required: true
    }
  },
  data () {
    return {
        shop: this.shopReadOnly
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
      this.$emit('ok', this.shop);
      this.hide();
    },

    onCancelClick () {
      this.hide();
    }
  }
})
</script>