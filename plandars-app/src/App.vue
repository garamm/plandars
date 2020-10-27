<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 브라우저 기본 margin, padding 제거 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* a tag 기본 데코레이션 제거 */
a {
  color: inherit;
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
