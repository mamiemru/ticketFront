<template>
  <div class="q-pa-md" style="width: 100%">
    <q-table
      flat dense
      title="Catégories"
      :rows="datas"
      :columns="columns"
      row-key="id"
      selection="single"
      :selected="selected"
      @selection="onSelection"
      :pagination="pagination"
    >
      <template v-slot:top>
        <q-btn color="primary" outline flat label="Add category" @click="addCategory" icon="add" />
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

import TDCCategoryApi from '../../api/tdcCategoryApi'
import { TDCCategory } from '../../models/models'
import CategoryDialog from './CategoryDialog.vue'

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
    TDCCategoryApi.getCategories().then((r) => { this.datas = r.data; });
  },
  methods: {
    // eslint-disable-next-line
    onSelection ( { rows }: any ) {
      if (rows.length === 0) {
        return
      }
      let row = {} as TDCCategory;
      row = Object.assign(row, rows[0]);

      this.q.dialog({
        component: CategoryDialog,
        componentProps: { categoryReadOnly: row }
      }).onOk((r) => {
        if (row.id) {
          TDCCategoryApi.putCategory(row.id, r)
          .then((r) => Object.assign(rows[0], r.data))
        }
      }).onCancel(() => {
        console.log('Cancel')
      })
    },
    addCategory() {
      this.selected = [{ required: false } as TDCCategory] as TDCCategory[];
      this.q.dialog({
        component: CategoryDialog,
        componentProps: { categoryReadOnly: this.selected[0] }
      }).onOk((r) => {
          TDCCategoryApi.postCategory(r)
          .then((r) => {
            let datas = this.datas as TDCCategory[];
            datas.unshift(r.data);
          })
      }).onCancel(() => {
        console.log('Cancel')
      })
    }
  }
});
</script>
