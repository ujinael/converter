import { createRouter, createWebHistory } from 'vue-router'
import VCurrenciesPage from '@/pages/currencies/VCurrenciesPage.vue'
import VConverterPage from '@/pages/converter/VConverterPage.vue'
export const routes = [

    {
      path: '/',
      name: 'currencies',
      component: VCurrenciesPage,
      meta:{
      layout:'main-layout'
      ,label:'Курсы валют'
      ,title:"валюты"
    },
    },
    {
      path: '/converter',
      name: 'converter',
      component: VConverterPage,
      meta:{
      layout:'main-layout'
      ,label:'Конвертер валют'
      ,title:"конвертер"
    },
    },
  ]
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
