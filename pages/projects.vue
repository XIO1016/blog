<template>
  <div class="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
    <div class="pt-6 mt-6 pb-4 space-y-2 md:space-y-5" data-aos="fade-right">
      <h1
        class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
      >
        Projects
      </h1>
      <p class="text-lg leading-7 text-gray-500 dark:text-gray-400">
        Here is the list of Projects that I developed, excited to showcase.
      </p>
    </div>
    <main class="relative mb-auto">
      <div class="">
        <div class="container py-12" data-aos="fade-up">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 -mx-4">
            <TheProjectItem class="md:w-full mx-auto w-full logo"
                            v-for="item in projectsData"
                            :key="item.title"
              :project-cover-image="item.imgSrc"
              :project-caption="item.description"
              :project-title="item.title"
              :project-url="item.href"
              :github-url="item.github"
              :tag1="item.tech1"
              :tag2="item.tech2"
                            :period="item.period"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import projectsData from "../data/projects";
import aosMixin from '~/mixins/aos';

export default {
  data() {
    return {
      projectsData: projectsData,
    };
  },
  head: {
    title: "Projects",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Some of Projects developed by XIO",
      },
      {
        name:"naver-site-verification",
        content:"ed1ac3b96b06466bb74fe8cfce24dfee8dd57b1c"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  name: 'PageIndex',
  mixins: [aosMixin]
};
</script>
<style>
p {
  font-family: Open Sans;
}
</style>
