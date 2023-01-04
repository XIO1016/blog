<template>
  <div class="honors panel box">
    <div id="works" class="in">
      <div>
        <ul>
          <TheProjectItem
            project-cover-image="XIOblog.png"
            project-caption="Interactive Vuetify Form Generator with Validation & Input Styling 🎉 Based on Vue"
            project-title="XIOblog"
            project-url="https://muhaddimu.github.io/vuetiform"
            github-url="https://github.com/MuhaddiMu/VuetiForm"
          />
          <TheProjectItem
            project-cover-image="XIOblog.png"
            project-caption="An open source Social Ideation platform to manage Ideas. Developed with Vue, Firebase & Vuetify"
            project-title="XIOblog"
            project-url="http://idea-revue.netlify.com/"
            github-url="https://github.com/MuhaddiMu/Idea-ReVue"
          />

        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import TheProjectItem from './TheProjectItem'

export default {
  components: {
    TheProjectItem
  }
}
</script>
