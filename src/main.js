import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { reveal } from './directives/reveal'
import { tilt } from './directives/tilt'
import { parallax } from './directives/parallax'
import { magnetic } from './directives/magnetic'

createApp(App)
  .directive('reveal', reveal)
  .directive('tilt', tilt)
  .directive('parallax', parallax)
  .directive('magnetic', magnetic)
  .mount('#app')
