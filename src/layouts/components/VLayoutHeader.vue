<template>
<header class="layout__header">
<nav class="layout__navigation">
  <ul class="layout__menu">
    <li class="layout__menu_item" v-for="route,index in routes"
    :key="index"
    >
      <router-link :to="route.path" 
      class="layout__menu_link"
       :class="{active:route.meta.title===currentRoute.meta.title}">{{route.meta.title}}</router-link>
    </li>
  </ul>
</nav>
</header>
</template>
<script setup lang="ts">
import {routes} from '@/router'
import { useRoute } from 'vue-router';
const currentRoute = useRoute()
</script>
<style scoped lang="scss">
.layout__header{
  background-color: whitesmoke;
  padding: 1rem;
  box-shadow: 3px 0 4px gray;
}
.layout__navigation{
  height: inherit;
  display: flex;
}
.layout__menu{
  display: flex;
gap:10px;
}
.layout__menu_link{
  text-decoration: none;
  font-size: small;
  text-transform:uppercase;
  color: gray;

}
.layout__menu_link:hover{
  cursor: pointer;
  color: #09c;
}
.layout__menu_link.active{
  color: #09c;
}

</style>