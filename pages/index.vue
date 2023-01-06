<template>
  <div class="content">
    <Header/>
    <section class="section">
      <VueRealWave
        wavePosition="bottom"
        :waveLayerCount="4"
        :space="477"
        :waveGap="150"
        :waveHeight="160"
        :waveColor="[
            'rgb(125, 128, 137)',
            'rgb(176, 188, 188)',
            'rgb(45, 55, 65)',
            'black',
          ]"
      >
        <div class="flex justify-center items-center">
          <div>
            <div style="padding: 66px 1px 2px 3px;">

            </div>
            <p3>XIO</p3>
            <div class="flex justify-center items-center">
              <p1>the developer</p1>
            </div>
          </div>
        </div>

      </VueRealWave>

    </section>

  </div>

</template>

<script>
import siteMetaInfo from "~/data/sitemetainfo";
import aosMixin from '~/mixins/aos';

export default {
  data() {
    return {
      siteMetaInfo: siteMetaInfo,
      window: {
        width: 0,
        height: 0
      },
    };

  },
  // created() {
  //   window.addEventListener('resize', this.handleResize);
  //   this.handleResize();
  // },
  // destroyed() {
  //   window.removeEventListener('resize', this.handleResize);
  // },
  // methods: {
  //   handleResize() {
  //     this.window.width = window.innerWidth;
  //     this.window.height = window.innerHeight;
  //   }
  // },
  head: {
    title: siteMetaInfo.title,
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {
        hid: "description",
        name: "description",
        content: siteMetaInfo.description,
      },
      {
        name:"naver-site-verification",
        content:"ed1ac3b96b06466bb74fe8cfce24dfee8dd57b1c"
      }
    ],
    link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}],
  },
  name: 'PageIndex',
  layout: 'home',
  mixins: [aosMixin]
};


</script>

<style>

section.section {
  height: calc(100vh - 100px);
}
body {
  background: white;
}

.bottom {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.center {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

p3 {
  font-family: Playfair Display;
  font-size: 50px;
}

p1 {
  font-family: Inspiration;
  font-size: 30px;
}

p2 {
  font-family: Dancing Script;
  font-size: 30px;
  color: white;
}

black {
  color: black;
  width: 100vw;
  height: 100vh;
}
</style>
