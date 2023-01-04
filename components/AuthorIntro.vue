<template>
  <div>
    <div class="mb-6 center">
      <div class="mt-6 text-3xl text-gray-700 font-bold center">
        <vue-typer
          :text='[
        "Welcome!",
        "I am XIO🌊",
        // "My name is Songgyeong Oh",
        "Software Developer 💻",
        "Like to Learn ❤️",
        "A Growing Programmer 🚀",
      "This is a space for storing and sharing knowledge ☺️",
        ]'
          :repeat='infinite'
          :shuffle='false'
          initial-action='typing'
          :pre-type-delay='70'
          :type-delay='70'
          :pre-erase-delay='2000'
          :erase-delay='250'
          erase-style='select-all'
          :erase-on-complete='false'
          caret-animation='blink'

        ></vue-typer>
      </div>

    </div>
    <div class="mb-2 mx-7 mt-4 ">
      <h1
        class="logo md:text-3xl text-2xl text-gray-800 font-bold dark:text-blue-100"
      >
        {{ siteMetadata.author }}🌊
      </h1>
      <a
        :href="`mailto:${siteMetadata.email}`"
        class="logo text-gray-600 md:hidden mt-1 dark:text-blue-100"
      >
        {{ siteMetadata.email }}
      </a>
      <div class=" my-2 text-gray-600 flex dark:text-blue-100">
        <Mail/>
        <a :href="`mailto:${siteMetadata.email}`"> {{ siteMetadata.email }}</a>
      </div>
      <p class="mt-8 mb-4 dark:bg-gray-800 dark:text-blue-200 text-justify text-xl">
        I am currently majoring in Computer Science and Engineering. I'm currently interested in the backend.
        I'm always thinking about designing good software.
        I like to learn new things and grow.
        I want to be a developer who is not satisfied with today and always develops myself for a better tomorrow.
      </p>
    </div>
    <div class="mb-2 mx-7 mt-10 ">
      <h1
        class="md:text-2xl text-xl text-gray-800 font-bold dark:text-blue-100"
      >
        Skills
      </h1>
    </div>
  </div>
</template>


<script>
import Mail from "../assets/icon/mail.svg?inline";
import Glob from "../assets/icon/glob.svg?inline";
import Github from "../assets/icon/github_new.svg?inline";
import siteMetaInfo from "@/data/sitemetainfo";

export default {
  components: {Mail, Glob, Github},
  data: () => {
    return {
      siteMetadata: siteMetaInfo,
    };
  },
};
</script>


<style scoped>
>>> .vue-typer .custom.char {
  @apply text-gray-700;
}

>>> .vue-typer .custom.char.selected {
  @apply bg-blue-400 text-white;
}

p {
  font-family: Open Sans;
}
</style>
