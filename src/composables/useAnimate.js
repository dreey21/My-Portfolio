// composables/useAnimate.js
import { ref, nextTick } from 'vue'

/**
 * Staggered fade-up for a list of elements via IntersectionObserver.
 */
export function useFadeUp(count, staggerMs = 50, threshold = 0.15) {
  const elRefs       = ref([])
  const visibleFlags = ref(Array(count).fill(false))

  function observe() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const i = elRefs.value.indexOf(entry.target)
          if (i !== -1) setTimeout(() => { visibleFlags.value[i] = true }, i * staggerMs)
          obs.unobserve(entry.target)
        }
      })
    }, { threshold })
    nextTick(() => elRefs.value.forEach(el => el && obs.observe(el)))
  }

  return { elRefs, visibleFlags, observe }
}

/**
 * Single element fade-up on scroll.
 */
export function useFadeUpSingle(threshold = 0.2) {
  const elRef   = ref(null)
  const visible = ref(false)

  function observe() {
    nextTick(() => {
      if (!elRef.value) return
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visible.value = true
            obs.unobserve(entry.target)
          }
        })
      }, { threshold })
      obs.observe(elRef.value)
    })
  }

  return { elRef, visible, observe }
}
