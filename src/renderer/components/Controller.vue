<template lang="pug">
    .controller
        h1 SYSKEN STAGE LIGHTING CONTROLLER CLIENT v1.0.0 2018
        .controller-color
            h2 Color
            .controller-color-tab

            .controller-color-point(v-if="colorMode === 'point'")
                h3 Point Color
                .controller-color-point-rgb(v-if="colorTypeMode === 'rgb'")
                    h4 RGB mode
                    input(type="range")
                    input(type="range")
                    input(type="range")
                .controller-color-point-hsv(v-else)
                    h4 HSV mode
                    input(type="range")
                    input(type="range")
                    input(type="range")
                
            .controller-color-rainbow(v-else)
                h3 Rainbow Color
                h4 Rotation Speed
                input(type="range")
            .controller-color-now
        .controller-pattern
            h2 Pattern
            input.controller-pattern-speed(type="range")
            button.controller-pattern-beat Beat
            button.controller-pattern-bress Bress
            button.controller-pattern-pulse Pulse
            button.controller-pattern-triangle Triangle
        .controller-luminosity
            h2 Luminosity
            input(type="range")
        .controller-output
            h2 Output
            .controller-output-now

</template>

<script>
  export default {
    data: function () {
      return {
        colorMode: 'point',
        colorTypeMode: 'rgb'
      }
    },
    methods: {
      changeColorMode () {
        if (this.colorMode === 'rgb') {
          this.colorMode = 'hsv'
        } else {
          this.colorMode = 'rgb'
        }
      }
    }
  }
</script>

<style lang="scss">
@import "~@/assets/scss/common.scss";

html{
    font-size: 65.8%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1{
    font-family: "Montserrat";
    font-size: 2rem;
}

h2{
    font-size:2rem;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 5px;
}

h3{
    font-size:1.7rem;
    font-weight: 400;
    margin:0;
}

h4{
    font-size:1.7rem;
    font-weight: 400;
    margin:0;
}

.controller{
    display: grid;
    min-height:100vh;
    grid-template-rows: 10vh 45vh 45vh;
    grid-template-columns: 70vw 1fr;
}

h1{
    grid-row: 1;
    grid-column: 1 / span 2;
}

.controller-color{
    grid-row: 2;
    grid-column: 1;
}

.controller-pattern{
    grid-row: 3;
    grid-column: 1;
}

.controller-luminosity{
    grid-row: 2;
    grid-column: 2;
}

.controller-output{
    grid-row: 3;
    grid-column: 2;
}

input[type="range"]{
    transform: rotate(-90deg);
    height:auto;
}

.controller-color-now{
    width:100px;
    height:100px;
    background: #383983;
}

.controller-output-now{
    width:100px;
    height:100px;
    background: #383983;
}

</style>
