<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import App from "@/layouts/App";
import Login from "@/layouts/Login";

export default {
  components: {
    App,
    Login
  },
  computed: {
    layout() {
      return (this.$route.meta.layout ||  'app')
    }
  }
}
</script>
