<template>
  <q-page class="row items-start justify-between" style="max-height: 100%">
    <itemarticlelist />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import itemarticlelist from '../components/articles/itemarticlelist.vue'

export default defineComponent({
  name: 'ItemArticles',
  components: { itemarticlelist },
  data() {
    return {}
  },
  methods: {
  }
});
</script>
