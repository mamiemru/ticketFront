<template>
  <div class="q-pa-md" style="width: 100%">
    <q-table
      flat dense
      title="Enseignes"
      :rows="datas"
      :columns="columns"
      row-key="id"
      selection="single"
      :selected="selected"
      @selection="onSelection"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'

import TDCShopApi from '../../api/tdcshopsApi'
import { TDCShop } from '../../models/models'
import ShopDialogVue from './shopDialog.vue'

export default defineComponent({
  name: 'shops-list',
  props: {},
  setup() {
    const q = useQuasar()
    return { 
      columns: [
        { name: 'Ident', label: 'ident', field: 'ident', sortable: true, align: 'left', },
        { name: 'Name', label: 'name', field: 'name', sortable: true, align: 'left' },
        { name: 'City', label: 'city', field: 'city', sortable: true, align: 'left' },
        { name: 'Localisation', label: 'localisation', field: 'localisation', sortable: true, align: 'left' }
      ], q
    }
  },
  data() {
    return {
      filter: '' as string,
      datas: [] as TDCShop[],
      selected: [] as TDCShop[]
    }
  },
  mounted() {
    TDCShopApi.getShops().then((r) => { this.datas = r.data; });
  },
  methods: {
    // eslint-disable-next-line
    onSelection ( { rows }: any ) {
      if (rows.length === 0) {
        return
      }
      let row = {} as TDCShop;
      row = Object.assign(row, rows[0]);

      this.q.dialog({
        component: ShopDialogVue,
        componentProps: { shopReadOnly: row }
      }).onOk((r) => {
        if (row.id) {
          TDCShopApi.putShop(row.id, r)
          .then((r) => Object.assign(rows[0], r.data))
        }
      }).onCancel(() => {
        console.log('Cancel')
      })
    }
  }
});
</script>
