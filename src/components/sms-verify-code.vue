<template>
  <van-button
    class="sms-button"
    :class="activeClass"
    @click="handleClick">
    <count-down
      v-if="isRun"
      :startTime="startTime"
      :systemTime="startTime"
      format="sss"
      @timeout="() => stop(0)"
      :duration="totalTime * 1000"></count-down>
    <span v-else>
      {{text}}
    </span>
  </van-button>
</template>
<script>
import { Button } from 'vant'
import CountDown from '@/components/count-down'

export default {
  components: {
    [Button.name]: Button,
    CountDown
  },
  props: {
    startText: {
      type: String,
      default: '获取验证码'
    },
    endText: {
      type: String,
      default: '再次获取'
    },
    totalTime: {
      type: Number,
      default: 60
      // default: 3
    },
    // tickTime: {
    //   type: Number,
    //   default: 1
    // },
    active: {
      type: String,
      default: 'isRun'
    },
    computeText: {
      type: Function,
      default (num) {
        return num + 's'
      }
    },
    validate: {
      type: Function,
      default: () => true
    },
    send: {
      type: Function,
      default: () => {}
    },
    endCallback: {
      type: Function,
      default: () => {}
    },
    click: {
      type: Function,
      default: () => {}
    },
    canUse: {
      type: Boolean,
      default () {
        return true
      }
    },
    noCanClass: {
      type: String,
      default: 'no-can'
    }
  },
  data () {
    return {
      time: '',
      isRun: false,
      isFirst: true,
      firstText: '',
      startTime: 0
    }
  },
  methods: {
    handleClick () {
      this.click(this.isRun)
      if (this.canUse && !this.isRun && this.validate()) {
        this.isFirst = false
        this.isRun = true
        this.time = this.totalTime
        this.send(this)
        this.startTime = Date.now()
        // this.timer = setInterval(() => {
        //   if (this.time <= this.tickTime) {
        //     this.stop(0)
        //   } else {
        //     this.time -= this.tickTime
        //   }
        // }, 1000 * this.tickTime)
      }
    },
    stop (type) {
      if (this.isRun) { this.endCallback(type, this) }
      this.isRun = false
      // clearInterval(this.timer)
    }
  },
  computed: {
    text () {
      if (this.isFirst) {
        return this.startText
      } else {
        if (this.isRun) {
          return this.computeText(this.time)
        } else {
          return this.endText
        }
      }
    },
    activeClass () {
      return (!this.canUse ? this.noCanClass + ' ' : '') + (this.isRun ? this.active : '')
    }
  }
}
</script>
<style>
.sms-button {
  width: 100%;
  border: none;
  border-radius: none;
}
</style>
