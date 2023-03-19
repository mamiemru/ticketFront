<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>
          
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container style="height: 100%">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from '../components/EssentialLink.vue';

const linksList = [
  {
    title: 'Index',
    caption: 'quasar.dev',
    icon: 'home',
    link: '/',
    source: 'internal'
  },  
  {
    title: 'Ajouter Ticket De Caisse',
    caption: 'quasar.dev',
    icon: 'post_add',
    link: '/#/addtdc',
    source: 'internal'
  },  
  {
    title: 'Articles',
    caption: 'quasar.dev',
    icon: 'format_list_bulleted',
    link: '/#/articles',
    source: 'internal'
  },  
  {
    title: 'Shops',
    caption: 'quasar.dev',
    icon: 'format_list_bulleted',
    link: '/#/shops',
    source: 'internal'
  },  
  {
    title: 'Categories',
    caption: 'quasar.dev',
    icon: 'format_list_bulleted',
    link: '/#/categories',
    source: 'internal'
  },  
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
    source: 'external'
  },  
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
    source: 'external'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
    source: 'external'
  }
];

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
