<template>
  <div class="row">
    <q-input v-model="$attrs.remise_object.remise" label="Remise" dense class="col-5"
      @change="changePourcentage" :disable="!$attrs.canEdit" 
    >
    </q-input>
    <q-input v-model="percentage" label="soit" dense class="col-7" type="number" 
      @change="changeDiscount" :disable="!$attrs.canEdit"
    >
      <template v-slot:append><q-icon name="percent" /></template>
    </q-input>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { RemiseInterface } from '../models/models';

export default defineComponent({
  name: 'QDiscountView',
  data () {
    return {
      percentage: 0
    }
  },
  methods: {
    changePourcentage() {
      let total = this.$attrs.total as number;
      let remise_object = this.$attrs.remise_object as RemiseInterface;
      if (total && total > 0.0) {
        this.percentage = Math.round(((total-(total-remise_object.remise))/total)*100);
      } else {
        this.$attrs.total = 0.0;
      }
    },
    changeDiscount() {
      let total = this.$attrs.total as number;
      let remise_object = this.$attrs.remise_object as RemiseInterface;
      if (total && total > 0.0) {
        remise_object.remise = Number((total - (total - (total * (this.percentage/100)))).toFixed(2));
      } else {
        this.percentage = 0;
      }
    }
  }
})
</script>