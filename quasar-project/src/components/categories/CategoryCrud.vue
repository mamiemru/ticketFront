<template>
  <q-card class="text-grey" flat bordered square>
    <q-card-section>
      <div class="text-h6">Edit Category</div>
    </q-card-section>

    <q-card-section vertical>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-card-section>

          <div class="row">
            <q-input v-model="$attrs.category.name" label="Nom"  class="col-6">
              <template v-slot:prepend><q-icon name="label" /></template>
            </q-input>          
            
            <q-list class="col-6">
              <q-item tag="label" v-ripple>
                <q-item-section avatar top>
                  <q-checkbox v-model="$attrs.category.required" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Count as mandatory</q-item-label>
                  <q-item-label caption>
                    If selected, items in this category cannot be avoided (like food, healt, ...)
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

          </div>

          <q-input v-model="$attrs.category.description" label="Description" dense  type="textarea"
            :rules="[ val => val.length < 255 || 'Please use maximum 255 characters' ]"
          >
            <template v-slot:prepend><q-icon name="notes" /></template>
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

import { TDCCategory } from '../../models/models';

export default defineComponent({
  name: 'CategoryCrud',
  components: {},
  setup() {
    const q = useQuasar()
    return { q }
  },
  methods: {
    onSubmit () {
      let item = this.$attrs.category as TDCCategory;
      if (!item.name) {
        this.q.notify({ color: 'red-5', textColor: 'white', icon: 'warning', message: 'some fields are empty' })
      } else if (!item.description || 255 <= item.description.length) {
        this.q.notify({ color: 'red-5', textColor: 'white', icon: 'warning', message: 'use maximum 255 characters for description' })
      } else {
        this.$emit('onOk', this.$attrs.index);
      }
    },
    onReset () {
      let item = this.$attrs.category as TDCCategory;
      item.name = '';
      this.$emit('onCancel', this.$attrs.index);
    }
  }
})
</script>
