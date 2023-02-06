<template>
  <q-card class="my-card" bordered square flat>
    <q-card-section class="row justify-center">
      <img :src="($attrs.itemarticle.attachement)? $attrs.itemarticle.attachement.image : null" class="col-5">
    </q-card-section>

    <q-list>
        <q-item clickable @click="onIdentClicked">
            <q-item-section avatar>
            <q-icon color="primary" name="fingerprint" />
            </q-item-section>

            <q-item-section>
            <q-item-label>{{ $attrs.itemarticle.ident }}</q-item-label>
            <q-item-label caption>{{ $attrs.itemarticle.name }}</q-item-label>
            </q-item-section>
        </q-item>

        <q-item>
            <q-item-section avatar>
            <q-icon color="red" name="label" />
            </q-item-section>

            <q-item-section>
            <q-item-label>{{ $attrs.itemarticle.category.name }}</q-item-label>
            <q-item-label caption>{{ ($attrs.itemarticle.group)? $attrs.itemarticle.group.name : '' }}</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ItemArticle } from '../../models/models'

export default defineComponent({
  name: 'ItemArticle',
  components: {},
  data() {
    return {}
  },
  methods: {
    onIdentClicked() {
      let itemarticle = this.$attrs.itemarticle as ItemArticle;
      this.$router.push({ name: 'display_articles_with_ident', params: { ident: itemarticle.ident} });
    }
  }
});
</script>
