<template>

  <div class="w-full p-3">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-4">
      <div class="max-w-fit md:ml-0 hover:animate-wiggle hover:drop-shadow">
        <nuxt-link to="/">
          <HeaderLogo />
        </nuxt-link>
      </div>

      <input class="menu-btn hidden" type="checkbox" id="menu-btn" />
      <label
        class="menu-icon block cursor-pointer md:hidden px-2 relative select-none "
        for="menu-btn"
      >
        <span class="bg-grey-darkest flex items-center relative"></span>
      </label>

      <ul class="flex justify-center list-reset m-0 w-full md:w-auto ">
        <li v-for="item in navLinks" :key="item.path">
          <NuxtLink
            :to="item.path"
            class=" logo block md:inline-block px-2  text-grey-darkest hover:text-grey-darker  text-sm font-semibold md:text-2sm"
          >{{ item.name }}</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import menu from "../data/menu";

export default {
  name: "TheHeader",
  data() {
    return {
      navLinks: menu,
    };
  },
};
</script>

<style scoped>
</style>
