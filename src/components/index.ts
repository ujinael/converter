import type { Component, Plugin } from "vue";
import MainLayout from "@/layouts/VMainLayout.vue"
export const components = {
    MainLayout
}


export const globalComponentsPlugin:Plugin= {
install(app, ...options) {
    Object.entries(components).forEach(([name,component])=>{
        app.component(name ?? '', component)
  
  })
},
}