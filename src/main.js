import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { reveal } from './directives/reveal'
import { tilt } from './directives/tilt'
import { parallax } from './directives/parallax'

createApp(App)
  .directive('reveal', reveal)
  .directive('tilt', tilt)
  .directive('parallax', parallax)
  .mount('#app')
