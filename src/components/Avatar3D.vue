<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Avatar 3D réutilisable. Charge un modèle .glb (Ready Player Me pour le vrai
// avatar de Pierre), l'éclaire joliment, le fait flotter, suivre la souris et
// tourner selon `spin`. Réutilisable n'importe où dans le site.
const props = defineProps({
  src: { type: String, required: true },
  spin: { type: Number, default: 0 }, // rotation pilotée par le parent (scroll)
  clip: { type: String, default: 'Idle' }, // pose / animation à jouer si dispo
})
const emit = defineEmits(['error', 'ready'])

const host = ref(null)
let renderer, scene, camera, model, mixer, clock, raf, ro
const pointer = { x: 0, y: 0 }
let targetSpin = 0
let curSpin = 0
const lerp = (a, b, t) => a + (b - a) * t

const onPointer = (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1
  pointer.y = (e.clientY / window.innerHeight) * 2 - 1
}

watch(
  () => props.spin,
  (v) => (targetSpin = v),
)

const frameModel = (obj) => {
  const box = new THREE.Box3().setFromObject(obj)
  const size = new THREE.Vector3()
  const center = new THREE.Vector3()
  box.getSize(size)
  box.getCenter(center)
  // recentre le modèle à l'origine
  obj.position.sub(center)
  // vise la tête / haut du buste
  const headY = size.y * 0.34
  const dist = size.y * 0.92
  camera.position.set(0, headY, dist)
  camera.lookAt(0, headY, 0)
  return headY
}

let headY = 0
const init = () => {
  const el = host.value
  const w = el.clientWidth || 400
  const h = el.clientHeight || 500

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(32, w / h, 0.1, 100)
  camera.position.set(0, 1.4, 2)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  el.appendChild(renderer.domElement)

  // lumières — clé chaude + ambiance + rim coloré accent
  scene.add(new THREE.HemisphereLight(0xffffff, 0x222244, 1.1))
  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(2, 4, 3)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0xa855f7, 2.2)
  rim.position.set(-3, 2, -2)
  scene.add(rim)
  const fill = new THREE.DirectionalLight(0x6366f1, 1.2)
  fill.position.set(-2, 1, 3)
  scene.add(fill)

  clock = new THREE.Clock()

  new GLTFLoader().load(
    props.src,
    (gltf) => {
      model = gltf.scene
      model.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = false
          o.frustumCulled = false
        }
      })
      scene.add(model)
      headY = frameModel(model)

      if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model)
        const wanted = new RegExp(props.clip, 'i')
        const clip =
          gltf.animations.find((c) => wanted.test(c.name)) ||
          gltf.animations.find((c) => /idle|breath/i.test(c.name)) ||
          gltf.animations[0]
        mixer.clipAction(clip).play()
      }
      emit('ready')
    },
    undefined,
    (err) => {
      console.warn('Avatar3D: échec de chargement du modèle', err)
      emit('error')
    },
  )

  const animate = () => {
    raf = requestAnimationFrame(animate)
    const dt = clock.getDelta()
    if (mixer) mixer.update(dt)
    if (model) {
      const t = clock.elapsedTime
      // flottement idle
      model.position.y = Math.sin(t * 1.1) * 0.04
      // rotation : scroll (spin) + suivi souris + balancement idle
      curSpin = lerp(curSpin, targetSpin, 0.06)
      const aimY = pointer.x * 0.5 + Math.sin(t * 0.6) * 0.08
      model.rotation.y = curSpin + aimY
      model.rotation.x = lerp(model.rotation.x, -pointer.y * 0.18, 0.08)
    }
    renderer.render(scene, camera)
  }
  animate()

  ro = new ResizeObserver(() => {
    const nw = el.clientWidth
    const nh = el.clientHeight
    if (!nw || !nh) return
    camera.aspect = nw / nh
    camera.updateProjectionMatrix()
    renderer.setSize(nw, nh)
  })
  ro.observe(el)

  window.addEventListener('pointermove', onPointer, { passive: true })
}

const dispose = () => {
  if (raf) cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onPointer)
  if (ro) ro.disconnect()
  if (renderer) {
    renderer.dispose()
    renderer.domElement?.remove()
  }
  scene?.traverse((o) => {
    if (o.isMesh) {
      o.geometry?.dispose?.()
      const m = o.material
      if (Array.isArray(m)) m.forEach((x) => x.dispose?.())
      else m?.dispose?.()
    }
  })
}

onMounted(init)
onBeforeUnmount(dispose)
</script>

<template>
  <div ref="host" class="h-full w-full" />
</template>
