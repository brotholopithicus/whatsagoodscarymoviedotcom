<template>
<v-layout class="trailer">
  <v-btn @click="() => $router.go(-1)" color="red" dark small fixed bottom left fab>
    <v-icon>close</v-icon>
  </v-btn>
  <div id="ytplayer"></div>
  <iframe :src="trailer"></iframe>
</v-layout>
</template>

<script>
import axios from 'axios';
export default {
  name: 'trailer',
  props: ['movie'],
  data() {
    return {
      trailer: ''
    }
  },
  created() {
    this.getTrailer();
  },
  methods: {
    async getTrailer() {
      try {
        const queryData = encodeURI(`${this.movie.title} ${this.movie.release_date.slice(0, 4)} trailer`);
        const movieUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD7Wrjt8oZGBxRGo2WF_2eTULgDMCyphrg&q=${queryData}&maxResults=1&order=relevance`;
        const res = await axios.get(movieUrl);
        this.trailer = `https://www.youtube.com/embed/${res.data.items[0].id.videoId}?autoplay=1&iv_load_policy=3`;
      } catch (err) {
        console.log(err.message);
      }
    }
  }
}
</script>

<style scoped>
.trailer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

iframe {
  width: 100%;
  height: 100%;
  background-color: #000;
  border: none;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.7);
}
</style>
