<template>
  <div id="app">
    <RetrieveCpfs msg="Upload de arquivo" />
  </div>
</template>

<script>
import RetrieveCpfs from "./components/RetrieveCpfs.vue";

export default {
  name: "App",
  components: {
    RetrieveCpfs,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
