<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <pre>{{ response }}</pre>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AxiosErrorLayout',
  props: {
    response: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  emits: [ 'ok', 'hide' ],
  methods: {
    show () {
      switch (this.response.status) {
        case 403:
          this.$router.push({ path: '/login' });
          break;
        default:
          let dialog = this.$refs.dialog as HTMLFormElement;
          dialog.show();
      }
    },

    hide () {
      let dialog = this.$refs.dialog as HTMLFormElement;
      dialog.hide();
    },

    onDialogHide () {
      this.$emit('hide');
    },

    onOKClick () {
      this.$emit('ok', this.response);
      this.hide();
    },

    onCancelClick () {
      this.hide();
    }
  }
});
</script>