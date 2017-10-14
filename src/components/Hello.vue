<template>
<div class="hello">
  <div class="main" :style="{ flexDirection: binding.column ? 'column' : 'row'}">
    <div class="poster" :class="$vuetify.breakpoint.xsOnly ? 'mb-4' : ''">
      <img :src="imagePath + '/w185/' + movie.poster_path" />
    </div>
    <v-card class="card">
      <v-card-title primary-title class="pb-0 pt-3">
        <h4 class="headline">
            <strong>{{movie.title}}</strong>&nbsp;
            <span>({{movie.release_date.slice(0, 4)}})</span>
          </h4>
        <div class="overview">{{movie.overview}}</div>
      </v-card-title>
      <v-card-actions>
        <router-link :to="{ name: 'trailer', params: { movie }}">
          <v-btn flat color="orange">Trailer</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </div>
  <v-bottom-nav fixed :value="true" class="grey darken-3">
    <v-btn @click="firstMovie" dark>
      <span>First</span>
      <v-icon>arrow_downward</v-icon>
    </v-btn>
    <v-btn @click="prevMovie" dark>
      <span>Back</span>
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-btn @click="nextMovie" dark>
      <span>Forward</span>
      <v-icon>arrow_forward</v-icon>
    </v-btn>
    <v-btn @click="lastMovie" dark>
      <span>Last</span>
      <v-icon>arrow_upward</v-icon>
    </v-btn>
  </v-bottom-nav>
</div>
</template>

<script>
const API_KEY = 'd40153d3e4795486cd6f84905101bff3';
const imagePath = 'https://image.tmdb.org/t/p/';

import axios from 'axios';
import { genres, movies } from '../data';

export default {
  name: 'hello',
  data() {
    return {
      movies,
      index: 0,
      imagePath
    }
  },
  computed: {
    movie() {
      return this.movies[this.index];
    },
    binding() {
      return this.$vuetify.breakpoint.xsOnly ? { column: true } : {};
    }
  },
  created() {
    const lastIndex = parseInt(localStorage.getItem('index'));
    this.index = lastIndex ? lastIndex : 0;
    this.saveIndex();
  },
  watch: {
    index() {
      this.saveIndex();
    }
  },
  methods: {
    saveIndex() {
      localStorage.setItem('index', this.index);
    },
    getGenres(genreIds) {
      return genreIds.map(id => genres.find(g => g.id === id).name).join(', ');
    },
    nextMovie() {
      this.index = this.index < this.movies.length - 1 ? this.index + 1 : this.index;
    },
    prevMovie() {
      this.index = this.index > 0 ? this.index - 1 : 0;
    },
    firstMovie() {
      this.index = 0;
    },
    lastMovie() {
      this.index = this.movies.length - 1;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../reboot.css');
.hello {
  margin-bottom: 56px;
  padding-bottom: 1rem;
  height: calc(100% - 56px);
  width: 100%;
  max-width: 100%;
}

.main {
  height: 100%;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
}

.card {
  margin: 1rem;
}

.poster {
  margin: 1rem;
}

.poster img {
  width: auto;
  max-height: 100%;
}
</style>
