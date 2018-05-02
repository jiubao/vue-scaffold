<template lang="html">
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'vue-scaffold',
  mounted () {
    console.log('app mounted...')
  }
}
</script>
