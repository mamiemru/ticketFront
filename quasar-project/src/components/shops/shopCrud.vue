<template>
  <q-card class="text-grey" flat bordered square>
    <q-card-section>
      <div class="text-h6">{{ introduction_text }}</div>
      <div class="text-h6">Editer une enseigne</div>
    </q-card-section>

    <q-card-section>
      <q-form @submit="onSubmit" @reset="onReset">
        <div class="row">
          <q-card-section class="col-6">
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
            
            <q-input v-model="$attrs.shop.postal_code" label="Postal Code" dense type="number" mask="#####" fill-mask="0" >
              <template v-slot:prepend><q-icon name="label" /></template>
            </q-input>

            <q-input v-model="$attrs.shop.localisation" label="Localisation" dense >
              <template v-slot:prepend><q-icon name="label" /></template>
            </q-input>
          </q-card-section>
          <q-card-section class="col-6 justify-center">
            <q-select label="Groupe d'enseigne" dense
              :options="filteredShopEnseigneNameOptions"
              :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
              :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"
              v-model="$attrs.shop.enseigne"
            >
              <template v-slot:prepend><q-icon name="store" /></template>
            </q-select>
            <q-img v-if="$attrs.shop.enseigne" :src="$attrs.shop.enseigne.icon" style="max-height: 200px;" fit="scale-down" />
          </q-card-section>
        </div>
        <div align="right" class="bg-white text-teal">
          <q-btn flat label="OK" color="blue" type="submit" />
          <q-btn flat label="Cancel" color="red" type="reset" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import { TDCEnseigne, TDCShop } from '../../models/models';
import TDCShopEnseigneService from '../../service/TDCShopEnseigneService'

export default defineComponent({
  name: 'ItemArticleCrud',
  components: {},
  props: {
    introduction_text: {
      type: String,
      required: false
    }
  },
  data () {
    return {
        filteredShopEnseigneNameOptions: [] as TDCEnseigne[]
    }
  },
  setup() {
    const q = useQuasar()
    return { q };
  },
  mounted() {
    TDCShopEnseigneService.getShopEnseignes()
    .then((r) => this.filteredShopEnseigneNameOptions = r.data)
    .catch((r) => { console.log(r); alert(r); });
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
