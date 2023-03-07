<template>
  <q-card class="text-grey" flat bordered square>
    <q-card-section>
      <div class="text-h6">Editer une enseigne</div>
    </q-card-section>

    <q-card-section horizontal clas="row">
      <q-form @submit="onSubmit" @reset="onReset" class="col-6">
        <q-card-section>
          <q-input label="Identifiant unique" dense class="col-5" v-model="$attrs.shop.ident"
          >
            <template v-slot:prepend><q-icon name="fingerprint" /></template>
          </q-input>

          <q-input v-model="$attrs.shop.name" label="Nom" dense >
            <template v-slot:prepend><q-icon name="badge" /></template>
          </q-input>          
          
          <q-input v-model="$attrs.shop.city" label="Ville" dense >
            <template v-slot:prepend><q-icon name="label" /></template>
          </q-input>   
          
          <q-input v-model="$attrs.shop.localisation" label="Localisation" dense >
            <template v-slot:prepend><q-icon name="label" /></template>
          </q-input>

        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" color="blue" type="submit" />
          <q-btn flat label="Cancel" color="red" type="reset" />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import { TDCShop } from '../../models/models';

export default defineComponent({
  name: 'ItemArticleCrud',
  components: {},
  setup() {
    const q = useQuasar()
    return { q }
  },
  methods: {
    onSubmit () {
      let item = this.$attrs.shop as TDCShop;
      if (item.ident && item.name && item.city && item.localisation) {
        this.$emit('onOk', this.$attrs.index);
      }
      else {
        this.q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'some fields are empty'
        })
      }
    },
    onReset () {
      let item = this.$attrs.shop as TDCShop;
      item.name = '';
      item.city = '';
      item.localisation = '';
      this.$emit('onCancel', this.$attrs.index);
    }
  }
})
</script>
