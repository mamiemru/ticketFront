<template>
    <q-card>
        <q-card-section class="text-white" :class='($attrs.datas.header.priceOnlyRequired) ? "bg-teal-8" : "bg-grey-8"'>
          <div class="text-h6">{{ $attrs.datas.category }}</div>
          <div class="row justify-between">
            <div class="text-subtitle2">Cout: {{ $attrs.datas.header.price }}€</div>
            <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" @click="expanded = !expanded" />
          </div>
        </q-card-section>

        <q-slide-transition>
            <div v-show="expanded">
                <q-list>
                    <q-item clickable v-for="(tablefeuillerows, j) in $attrs.datas.body" :key="j">
                    <q-item-section v-if="tablefeuillerows.rows.length > 1">
                        <q-item-label class="row justify-between">
                        <div>{{ tablefeuillerows.name }}</div>
                        <small>{{ tablefeuillerows.header.price }}€</small>
                        </q-item-label>
                        <q-item-label v-for="(row, k) in tablefeuillerows.rows" :key="k" caption class='row justify-between'>
                        <div>{{ row.date }}</div>
                        <div>{{ row.price }}€</div>
                        </q-item-label>
                    </q-item-section>
                    <q-item-section v-else>
                        <q-item-label class="row justify-between">
                        <div>{{ tablefeuillerows.name }} <small>{{ tablefeuillerows.rows[0].date }}</small></div>
                        <small>{{ tablefeuillerows.header.price }}€</small>
                        </q-item-label>
                    </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </q-slide-transition>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TicketDeCaisseListSummary',
  props: {
    yearmonth: String
  },
  data() {
    return {
      expanded: false
    }
  }
});
</script>
