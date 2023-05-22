<template>
  <q-card class="text-grey" flat bordered square>
    <q-card-section>
      <div class="text-h6">{{ introduction_text }}</div>
      <div class="text-h6">Ajouter une marque</div>
    </q-card-section>

    <q-card-section horizontal clas="row">
      <q-form @submit="onSubmit" @reset="onReset" class="col-6">
        <q-card-section>

          <q-input v-model="$attrs.brand.name" label="Nom de la marque" dense >
            <template v-slot:prepend><q-icon name="badge" /></template>
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

import { TDCBrand } from '../../models/models';

export default defineComponent({
  name: 'ItemArticleCrud',
  components: {},
  props: {
    introduction_text: {
      type: String,
      required: false
    }
  },
  setup() {
    const q = useQuasar()
    return { q }
  },
  methods: {
    onSubmit () {
      let item = this.$attrs.brand as TDCBrand;
      if (item.name) {
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
      let item = this.$attrs.brand as TDCBrand;
      item.name = '';
      this.$emit('onCancel', this.$attrs.index);
    }
  }
})
</script>
