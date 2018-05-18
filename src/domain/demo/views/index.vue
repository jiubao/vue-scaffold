<template lang="html">
  <div class="back-color font wrap">
    demo page
    <button type="button" name="button" @click="$trace('demo-event-trace', {a: 'asfs', b: 2})">trigger a trace</button>
  </div>

</template>

<script>
export default {
}
</script>

<style lang="less">
.back-color {
  background: @B2;
}
.wrap {
  height: 200px;
}
</style>

<style lang="scss">
.font {
  color: $color-l1;
  font-size: 50px;
}

</style>
