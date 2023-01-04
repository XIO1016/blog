<template>
  <div class="dark:bg-gray-900 mt-6 .wrap-banner">
    <div class="max-w-screen-lg md:flex mx-auto dark:bg-gray-900 ">
      <div class="px-8 " >
        <AuthorIntro data-aos="fade-down-left"/>
        <Skills />
<!--        <Expertise data-aos="fade-left"/>-->
<!--        <TimeLine data-aos="fade-up-left"/>-->
      </div>
    </div>
  </div>
</template>

<script>
import siteMetaInfo from "~/data/sitemetainfo";
import aosMixin from '~/mixins/aos';
export default {
  data() {
    return {
      siteMetaInfo: siteMetaInfo,
    };
  },
  head: {
    title: "About",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: siteMetaInfo.description,
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  name: 'PageIndex',
  mixins: [aosMixin]
};
</script>

<style>

</style>
