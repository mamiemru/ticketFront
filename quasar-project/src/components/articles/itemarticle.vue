<template>
  <q-card class="my-card" bordered square flat>
    <img :src="($attrs.itemarticle.attachement)? $attrs.itemarticle.attachement.image : null"  class="col-2">

    <q-list>
        <q-item clickable>
            <q-item-section avatar>
            <q-icon color="primary" name="fingerprint" />
            </q-item-section>

            <q-item-section>
            <q-item-label>{{ $attrs.itemarticle.ident }}</q-item-label>
            <q-item-label caption>{{ $attrs.itemarticle.name }}</q-item-label>
            </q-item-section>
        </q-item>

        <q-item clickable>
            <q-item-section avatar>
            <q-icon color="red" name="label" />
            </q-item-section>

            <q-item-section>
            <q-item-label>{{ $attrs.itemarticle.category.name }}</q-item-label>
            <q-item-label caption>{{ ($attrs.itemarticle.group)? $attrs.itemarticle.group.name : '' }}</q-item-label>
            </q-item-section>
        </q-item>

        <q-item clickable>
            <q-item-section avatar>
            <q-icon color="amber" name="euro" />
            </q-item-section>

            <q-item-section>
            <q-item-label>{{ $attrs.itemarticle.prix }}</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ItemArticle',
  components: {},
  data() {
    return {}
  },
  methods: {
  }
});
</script>
