<template>
  <div class="ornament">
    <svg viewBox="0 0 300 20" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="10" x2="120" y2="10" stroke="#bbb" stroke-width="0.8"/>
      <text x="142" y="14.5" text-anchor="middle" font-family="'Barlow Condensed', sans-serif" font-size="12" fill="#bbb" letter-spacing="3">//</text>
      <line x1="164" y1="10" x2="300" y2="10" stroke="#bbb" stroke-width="0.8"/>
    </svg>
  </div>
</template>

<style scoped>
.ornament {
  display: flex; align-items: center; justify-content: center;
  margin: 24px auto; width: 100%; max-width: 400px;
}
svg { width: 100%; height: 20px; }
</style>