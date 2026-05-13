// composables/useScrollReveal.js
import { ref, nextTick } from 'vue'

/**
 * Attach IntersectionObserver to a list of elements.
 * Returns { elRefs, visibleFlags } where visibleFlags[i] becomes true
 * when elRefs[i] enters the viewport.
 *
 * Usage:
 *   const { elRefs, visibleFlags } = useScrollReveal(count)
 *   // bind :ref="el => elRefs[i] = el" and :class="{ visible: visibleFlags[i] }"
 *   // call observe() inside onMounted
 */
export function useScrollReveal(count, threshold = 0.1) {
  const elRefs    = ref([])
  const visibleFlags = ref(Array(count).fill(false))

  function observe() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const i = elRefs.value.indexOf(entry.target)
          if (i !== -1) visibleFlags.value[i] = true
          obs.unobserve(entry.target)
        }
      })
    }, { threshold })

    nextTick(() => elRefs.value.forEach(el => el && obs.observe(el)))
  }

  return { elRefs, visibleFlags, observe }
}
