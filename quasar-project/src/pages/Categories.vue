<template>
  <q-page class="row items-start justify-between" style="max-width: 100%; max-height: 100%">
    <categories />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import categories from '../components/categories/Categories.vue'

export default defineComponent({
  name: 'categories-vue',
  components: { categories },
  data() {
    return {}
  },
  methods: {
  }
});
</script>
