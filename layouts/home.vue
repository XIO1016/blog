<template>
  <div>
    <!-- <Warning /> -->
    <!-- <Header.vue /> -->
    <VueCursor class="hidden md:block" scaleElement="logo" dotColor="#bb2649" :borderColor="'#bb2649'"/>

    <Nuxt />
  </div>
</template>

<script>
import VueCursor from "~/components/VueCursor.vue";
export default {
  components: {
    VueCursor
  }
};
</script>

<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
* { font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;; }
</style>
