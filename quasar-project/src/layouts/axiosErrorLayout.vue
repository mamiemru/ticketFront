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
      required: false,
      default: () => { status: 403 }
    }
  },
  data() {
    return {}
  },
  emits: [ 'ok', 'hide' ],
  methods: {
    show () {
      console.log(this.response)
      if (this.response) {
        switch (this.response.status) {
          case 403:
            this.$router.push({ path: '/login' });
            break;
          default:
            let dialog = this.$refs.dialog as HTMLFormElement;
            dialog.show();
        }
      } else {
        this.$router.push({ path: '/login' });
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