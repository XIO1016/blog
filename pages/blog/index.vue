<template>
  <div class="mx-auto max-w-6xl">

    <div class="pt-6 mt-6 pb-4 space-y-2 md:space-y-5" data-aos="fade-right">
      <h1
        class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
      >
        Blog
      </h1>
      <p class="text-lg leading-7 text-gray-500 dark:text-gray-400">
        Here is the records I've been following.
      </p>
    </div>

    <div data-aos="zoom-in"
         class="select-none px-4 items-center justify-center sm:justify-start overflow-hidden flex pt-4 md:mb-6 mb-8">
      <nav class="flex flex-wrap items-center justify-center flex-row space-x-2 sm:space-x-4">
        <button @click="currentCategory = category"
                :class="{ ' bg-blue-200 text-slate-800 ': category === currentCategory }" v-for="category in categories"
                :key="category"
                class="flex logo text-gray-300 focus:outline-none focus:ring-transparent focus:ring-offset-transparent px-3 py-2 font-medium text-sm rounded-xl">
          {{ category }}
        </button>
      </nav>
    </div>
    <div class="max-w-7xl grid grid-cols-1 md:grid-cols-1 mt-4 md:mt-6 mb-8 md:mb-14">
      <div class="px-6 md:px-6 group" v-for="article of articles" :key="article">
        <nuxt-link :to="{path: `/blog/${article.slug}`}">
          <div class="article-inner flex border-b py-6 md:py-8 border-gray-200">
            <div class="h-content hidden md:block">
              <div class="md:h-52 md:w-72 square-box">
                <img
                  v-if="`${article.img}` == undefined || `${article.img}` == null || `${article.img}` == 'null' || `${article.img}` == 'undefined'"
                  class="profile h-full group-hover:scale-105 transition duration-300"
                  :src="require(`~/static/${article.category}.jpg`)" alt="">
                <img v-else class="profile h-full group-hover:scale-105 transition duration-300"
                     :src="require(`~/static/${article.slug}/${article.img}`)" alt="">
              </div>
            </div>
            <div class="px-0 md:px-4 md:pl-9">
              <p class="mb-1.5 md:mb-3 text-sm md:text-base text-gray-400">{{ article.category }}</p>
              <h3 class="mb-1.5 md:mb-3 text-xl md:text-2xl font-semibold text-gray-600 keep-all">{{
                  article.title
                }}</h3>
              <p class="mb-1.5 md:mb-3 text-sm md:text-base text-gray-400 custom-text keep-all">
                {{ article.description }}</p>
              <p class="text-sm md:text-base text-gray-400">{{ article.author }}</p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
const ALL = 'all'

import aosMixin from '~/mixins/aos';

export default {
  computed: {
    categories() {
      return [ALL, ...new Set(this.articles.map(article => article.category))]
    },
    articlesByCategories() {
      if (this.currentCategory === ALL)
        return this.articles
      return this.articles.filter(article => article.category === this.currentCategory)
    }
  },
  data() {
    return {
      currentCategory: ALL,
      ALL: ALL, // exporting it to template
    }
  },
  async asyncData({$content}) {
    const articles = await $content("articles")
      .only([
        "title",
        "description",
        "img",
        "slug",
        "category",
        "author",
        "date",
        "visibility",
      ])
      .where({"visibility": true})
      .sortBy("date", "desc")
      .fetch();

    return {
      articles,
    };
  },
  head: {
    title: "Blogs",
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {
        hid: "description",
        name: "description",
        content: "XIO's Story",
      },
    ],
    link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}],
  },
  name: 'PageIndex',
  mixins: [aosMixin]
};
</script>

<style>

</style>
