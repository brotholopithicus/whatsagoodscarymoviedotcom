<template>
<v-app id="wagsm" dark>
  <v-toolbar v-show="$route.path === '/'" app fixed>
    <v-toolbar-title>{{title}}</v-toolbar-title>
  </v-toolbar>
  <main>
    <v-content>
      <v-container fluid fill-height class="pa-0">
          <router-view></router-view>
      </v-container>
    </v-content>
  </main>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      title: `What's A Good Scary Movie?`,
    }
  },
  computed: {
    binding() {
      return this.$vuetify.breakpoint.xsOnly ? { column: true } : {};
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
