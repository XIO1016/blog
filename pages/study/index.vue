<template>
  <div class="max-w-6xl mx-auto">
    <div class="pt-6 mt-6 pb-4 space-y-2 md:space-y-5" data-aos="fade-right">
      <h1
        class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
      >
        Study
      </h1>
      <p class="text-lg leading-7 text-gray-500 dark:text-gray-400">
        Here is the records that I've grown.
        I aim for growth together, not alone.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8 mb-60 pb-12 mx-5" data-aos="fade-up">
      <div v-for='study of studies' :key="study">
        <nuxt-link :to='`study/${study.slug}/0-1`'>
          <div class="group relative">
            <div class="lead-box rounded-lg h-52 sm:h-60 md:h-72 mb-5 bg-slate-500 bg-img"
                 :style="{ background_image: `url(../../assets/images/${study.img})` }">
              <div class="absolute bottom-0 w-full h-full bg-gradient-to-t from-zinc-600 rounded-lg"></div>
              <div class="absolute bottom-0 w-full py-6 px-6">
                <div class="flex">
                  <div v-if="`${study.state}` == '100'"
                       class="ml-2 px-1.5 py-1 text-xs md:text-xs text-white bg-blue-500 rounded font-normal">100%
                  </div>
                  <div v-else-if="`${study.state}` == '75'"
                       class="ml-2 px-1.5 py-1 text-xs md:text-xs text-white bg-emerald-500 rounded font-normal">75%
                  </div>
                  <div v-else-if="`${study.state}` == '50'"
                       class="ml-2 px-1.5 py-1 text-xs md:text-xs text-white bg-orange-500 rounded font-normal">50%
                  </div>
                  <div v-else-if="`${study.state}` == '20'"
                       class="ml-2 px-1.5 py-1 text-xs md:text-xs text-white bg-yellow-500 rounded font-normal">20%
                  </div>
                  <div v-else></div>
                </div>
                <div class="text-white text-2xl font-medium pb-2 group-hover:underline">{{ study.slug }}
                </div>

                <div class="text-slate-300 text-sm keep-all">{{ study.description }}</div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>


</template>

<script>
import aosMixin from '~/mixins/aos';

export default {
  async asyncData({$content, params}) {
    const studies = await $content('studies', params.id)
      .sortBy('order', 'asc')
      .fetch();
    return {studies}
  },
  name: 'PageIndex',
  mixins: [aosMixin],
  head: {
    title: "Study",
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {
        hid: "description",
        name: "description",
        content: "A record of what I'm studying by XIO",
      },
      {
        name:"naver-site-verification",
        content:"ed1ac3b96b06466bb74fe8cfce24dfee8dd57b1c"
      }
    ],
    link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}],
  },
}
</script>

<style scoped>
.keep-all {
  word-break: keep-all;
}

.inner {
  box-sizing: border-box;
  position: relative;
}

.keep-all {
  word-break: keep-all;
}

.lead-box {
  overflow: hidden;
}

.square-box {
  overflow: hidden;
}

.profile {
  object-fit: cover;
  /* overflow: hidden; */
}
.bg-img {
  background-position: center;
  background-repeat:  no-repeat;
  /* background-attachment: fixed; */
  background-size:  cover;
  background-color: #000000;
  background-image: url(../../assets/images/computer-network.jpg)
}
</style>
