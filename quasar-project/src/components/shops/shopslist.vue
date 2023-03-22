<template>
  <div class="q-pa-md" style="width: 100%">
    debug: {{ selected }}
    <q-table
      flat dense
      title="Enseignes"
      :rows="datas"
      :columns="columns"
      row-key="id"
      selection="single"
      :selected="selected"
      :pagination="pagination"
      @selection="handleSelection"
    >
      <template v-slot:top>
        <q-btn color="green" outline flat label="Add shop" @click="addShop" icon="add" />
        <q-btn color="blue" outline flat label="Edit selection" @click="editShop" icon="draw" />
        <q-btn color="red" outline flat label="Delete selection" @click="deleteShop" icon="delete" />
        <q-space />
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

import TDCShopService from '../../service/TDCShopService'
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
        { name: 'Postal Code', label: 'postal_code', field: 'postal_code', sortable: true, align: 'left' },
        { name: 'Localisation', label: 'localisation', field: 'localisation', sortable: true, align: 'left' }
      ],
      pagination: {
        rowsPerPage: 20
      },
      q
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
    TDCShopService.getShops().then((r) => { this.datas = r.data; });
  },
  methods: {
    //eslint-disable-next-line
    handleSelection({ rows }: any) {
      this.selected = rows;
    },
    editShop () {
      let rows = this.selected as TDCShop[];
      if ( rows.length != 1) {
        this.q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Select one field'
        })
        return;
      }
      let row = {} as TDCShop;
      row = Object.assign(row, rows[0]);

      this.q.dialog({
        component: ShopDialogVue,
        componentProps: { shopReadOnly: row }
      }).onOk((r) => {
        TDCShopService.putShop(row.id, r)
        .then((r) => {
          let datas = this.datas as TDCShop[];
          let shopIndex = datas.findIndex((shop) => shop.id === r.data.id);
          if (-1 < shopIndex) {
            datas[shopIndex] = Object.assign(datas[shopIndex], r.data);
          }
        })
      }).onCancel(() => {
        console.log('Cancel')
      })
    },
    addShop() {
      this.selected = [{} as TDCShop] as TDCShop[];
      this.q.dialog({
        component: ShopDialogVue,
        componentProps: { shopReadOnly: this.selected[0] }
      }).onOk((r) => {
          TDCShopService.postShop(r)
          .then((r) => {
            let datas = this.datas as TDCShop[];
            datas.unshift(r.data);
            this.selected = [] as TDCShop[];
          })
      }).onCancel(() => {
        console.log('Cancel')
        this.selected = [] as TDCShop[];
      })
    },
    deleteShop() {
      let rows = this.selected as TDCShop[];
      if ( rows.length != 1) {
        this.q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Select one field'
        })
        return;
      }
      let row = {} as TDCShop;
      row = Object.assign(row, rows[0]);

      this.q.dialog({
        title: 'Confirm',
        message: `Would you like to delete ${row.name}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        TDCShopService.deleteShop(row.id)
        .then(() => {
          let datas = this.datas as TDCShop[];
          this.datas = datas.filter((shop) => shop.id !== row.id);
        })
      }).onCancel(() => {
        console.log('Cancel')
      })
    }
  }
});
</script>
