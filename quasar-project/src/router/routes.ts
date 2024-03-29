import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'tdc/:tdcId', component: () => import('pages/TicketDeCaisse.vue') },
      { path: 'addtdc', component: () => import('pages/AddNewTdcPage.vue') },
      { path: 'articles', component: () => import('pages/ItemArticles.vue') },
      { path: 'shops', component: () => import('pages/Shops.vue') },
      { path: 'categories', component: () => import('pages/Categories.vue') },
      { path: 'articles/:ident', component: () => import('pages/Showperarticle.vue'), name: 'display_articles_with_ident' },
      { path: 'ml', component: () => import('pages/MlPage.vue') },
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  {
    path: '/login',
    component: () => import('pages/ErrorForbiden.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
