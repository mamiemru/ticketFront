<template>
  <div class="q-pa-md" style="width: 100%">
    debug: {{ selected }}
    <q-table
      flat dense
      title="Catégories"
      :rows="datas"
      :columns="columns"
      row-key="id"
      selection="single"
      :selected="selected"
      @selection="handleSelection"
      :pagination="pagination"
    >
      <template v-slot:top>
        <q-btn color="green" outline flat label="Add category" @click="addCategory" icon="add" />
        <q-btn color="blue" outline flat label="Edit selection" @click="editCategory" icon="draw" />
        <q-btn color="red" outline flat label="Delete selection" @click="deleteCategory" icon="delete" />
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

import { TDCCategory } from '../../models/models'
import CategoryDialog from './CategoryDialog.vue'
import TDCCategoryService from '../../service/TDCCategoryService';

export default defineComponent({
  name: 'CategoriesList',
  props: {},
  setup() {
    const q = useQuasar()
    return { 
      columns: [
        { name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left' },
        { name: 'Required', label: 'Count as mandatory', field: 'required', sortable: true, align: 'left' },
        { name: 'Description', label: 'Description', field: 'description', sortable: true, align: 'left' }
      ], 
      pagination: {
        rowsPerPage: 25
      },
      q
    }
  },
  data() {
    return {
      filter: '' as string,
      datas: [] as TDCCategory[],
      selected: [] as TDCCategory[]
    }
  },
  mounted() {
    TDCCategoryService.getCategories().then((r) => { this.datas = r.data; });
  },
  methods: {    
    //eslint-disable-next-line
    handleSelection({ rows }: any) {
      this.selected = rows;
    },
    editCategory () {
      let rows = this.selected as TDCCategory[];
      if ( rows.length != 1) {
        this.q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Select one field'
        })
        return;
      }
      let row = {} as TDCCategory;
      row = Object.assign(row, rows[0]);

      this.q.dialog({
        component: CategoryDialog,
        componentProps: { categoryReadOnly: row }
      }).onOk((r) => {
        if (row.id) {
          TDCCategoryService.put(row.id, r)
          .then((r) => {
            let datas = this.datas as TDCCategory[];
            let shopIndex = datas.findIndex((shop) => shop.id === r.data.id);
            if (-1 < shopIndex) {
              datas[shopIndex] = Object.assign(datas[shopIndex], r.data);
            }
          }
          )
        }
      }).onCancel(() => {
        console.log('Cancel')
      })
    },
    addCategory() {
      this.selected = [{} as TDCCategory] as TDCCategory[];
      this.q.dialog({
        component: CategoryDialog,
        componentProps: { categoryReadOnly: this.selected[0] }
      }).onOk((r) => {
          TDCCategoryService.post(r)
          .then((r) => {
            let datas = this.datas as TDCCategory[];
            datas.unshift(r.data);
            this.selected = [] as TDCCategory[];
          })
      }).onCancel(() => {
        console.log('Cancel')
        this.selected = [] as TDCCategory[];
      })
    },
    deleteCategory() {
      let rows = this.selected as TDCCategory[];
      if ( rows.length != 1) {
        this.q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Select one field'
        })
        return;
      }
      let row = {} as TDCCategory;
      row = Object.assign(row, rows[0]);

      this.q.dialog({
        title: 'Confirm',
        message: `Would you like to delete ${row.name}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        if (row.id) {
          TDCCategoryService.delete(row.id)
          .then(() => {
            let datas = this.datas as TDCCategory[];
            this.datas = datas.filter((shop) => shop.id !== row.id);
          }
          )
        }
      }).onCancel(() => {
        console.log('Cancel')
      })
    }
  }
});
</script>
