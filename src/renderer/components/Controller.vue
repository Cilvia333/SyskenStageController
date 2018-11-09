<template lang="pug">
    .controller
        h1 SYSKEN STAGE LIGHTING CONTROLLER CLIENT v1.0.0
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
                    .controller-color-point-hsv-slider
                        input.hue(type="range")
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
            input.controller-output-ip(type="text")

</template>

<script>
  export default {
    data: function () {
      return {
        colorMode: 'point',
        colorTypeMode: 'hsv'
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

body{
    margin:0;
    overflow: hidden;
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
    background: #222;
    *{
        color:white;
    }
    margin:0;
    padding:10px 30px;
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


input[type="range"] {
    transform: rotate(-90deg);
    width: 500px;
    -moz-appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    margin: 5px;
    width:  150px;
    height: 10px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
}

input[type="range"]::-webkit-slider-thumb {
    background: white;
    border: white solid 1px;
    -moz-appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    z-index: 20;
}

[type="range"]:focus,
[type="range"]:focus::-webkit-slider-thumb,
[type="range"]:active,
[type="range"]:active::-webkit-slider-thumb {
    outline: none;
}

.controller-color-point-hsv-slider{
    position: absolute;
    left:10vw;
    input{
        display: block;
        position: absolute;
        margin:10px;
        padding:0;
        &:nth-child(1){
            left:0;
        }
        &:nth-child(2){
            left:40px;
        }
        &:nth-child(3){
            left:80px;
        }
    }

    .hue{
        background: -moz-linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
        background: -ms-linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
        background: -o-linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
        background: -webkit-gradient(90deg, left top, left bottom, from(#ff0000), color-stop(0.17, #ffff00), color-stop(0.33, #00ff00), color-stop(0.5, #00ffff), color-stop(0.67, #0000ff), color-stop(0.83, #ff00ff), to(#ff0000));
        background: -webkit-linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
        background: linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
    }
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

.controller-output-ip{
    color:#222;
    background: #eee;
    border:solid 1px #ccc;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;

    &:focus{
        border:solid 1px rgb(42, 184, 240);
    }
}


</style>
