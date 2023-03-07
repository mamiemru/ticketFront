<template>
  <q-page class="row items-start justify-between" style="max-width: 100%; max-height: 100%">
    <shopslist />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import shopslist from '../components/shops/shopslist.vue'

export default defineComponent({
  name: 'ItemArticles',
  components: { shopslist },
  data() {
    return {}
  },
  methods: {
  }
});
</script>
