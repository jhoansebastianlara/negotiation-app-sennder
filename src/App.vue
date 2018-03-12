<template>
  <div id="app">
    <h1 class="title">Negotiation App</h1>
    <p class="description">
      The app is based on the idea of a work contract negotiation: Employer and employee enter salary values and the app tells if the expectations meet.
    </p>
    <negotiation-board></negotiation-board>
  </div>
</template>

<script>
import NegotiationBoard from './components/NegotiationBoard'

export default {
  name: 'app',

  data () {
    return {

    }
  },

  components: {
    NegotiationBoard
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 1rem;
}
</style>
