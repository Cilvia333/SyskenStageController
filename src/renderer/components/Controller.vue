<template lang="pug">
    .controller
        h1 STAGE LIGHTING CONTROL CLIENT v1.0.0
        .controller-color
            h2 Color
            .controller-color-point(:style="{border: nowPointModeStyle}" @click="clickSetPoint")
                h3 Point Color
                .controller-color-point-hsv
                    h4 HSV mode
                    .controller-color-point-hsv-h
                        input.hue-slider(type="range" min="0" max="360" step="1" value="0" v-model="hue" )
                        input.hue-text(type="text" v-model="hue")
                    .controller-color-point-hsv-s
                        input.sat-slider(type="range" min="0" max="1.0" step="0.001" value="1.0" v-model="sat" )
                        input.sat-text(type="text" v-model="sat")
                    .controller-color-point-hsv-v
                        input.val-slider(type="range" min="0" max="1.0" step="0.001" value="128" v-model="val" )
                        input.val-text(type="text" v-model="val")
            .controller-color-rainbow(:style="{border: nowRainbowModeStyle}" @click="clickSetRainbow")
                h3 Rainbow Color
                .controller-color-rainbow-roll
                    h4 Rotation Speed
                    input(type="range" min="-5.0" max="5.0" step="0.01" value="1.0" v-model="rotateSpeed")
                    input.val-text(type="text" v-model="rotateSpeed")
            .controller-color-now(:style="{background: nowColorSytle}")
        .controller-pattern
            h2 Pattern
            .controller-pattern-bpm
              h3 BPM
              input.controller-pattern-bpm-slider(type="range" min="60" max="240" step="1" value="120" v-model="bpm")
              input.controller-pattern-bpm-text(type="text" v-model="bpm")
              button(:class="{'button-active': isActiveBM1}" @click="clickBPMMulti(1)") x1
              button(:class="{'button-active': isActiveBM2}" @click="clickBPMMulti(2)") x2
              button(:class="{'button-active': isActiveBM4}" @click="clickBPMMulti(4)") x4
              button(:class="{'button-active': isActiveBM8}" @click="clickBPMMulti(8)") x8
            .controller-pattern-mode
              h3 Mode
              button.controller-pattern-beat(:class="{'button-active': isAcvitiveBeat}" @click="clickPatternMode('beat')") Beat
              button.controller-pattern-breath(:class="{'button-active': isAcvitiveBreath}" @click="clickPatternMode('breath')") Bress
              button.controller-pattern-pulse(:class="{'button-active': isAcvitivePulse}" @click="clickPatternMode('pulse')") Pulse
              button.controller-pattern-triangle(:class="{'button-active': isAcvitiveTriangle}" @click="clickPatternMode('triangle')") Triangle
              button.controller-pattern-none(:class="{'button-active': isAcvitiveNone}" @click="clickPatternMode('none')") None
        .controller-luminosity
            h2 Luminosity
            input.luminosity-slider(type="range" min="0" max="1" step="0.01" value="1.0" v-model="luminosity")
            input.luminosity-text(type="text" v-model="luminosity")
        .controller-output
            h2 Output
            .controller-output-address
              h3 address( send ip, port )
              input.controller-output-ip(type="text" v-model="ip")
              input.controller-output-port(type="text" v-model="port")

</template>

<script>
  export default {
    data: function () {
      return {
        colorMode: 'point',
        hue: 0,
        sat: 1.0,
        val: 1.0,
        hex: '#ffffff',
        rotateSpeed: 1.0,
        bpm: 128,
        bpmMultiply: 1,
        patternMode: 'none',
        luminosity: 1.0,
        ip: '128.0.0.1',
        port: 8000
      }
    },
    mounted () {
      this.sendAddress(this.ip, this.port)
    },
    watch: {
      hue: function () { this.changeColor() },
      sat: function () { this.changeColor() },
      val: function () { this.changeColor() },
      colorMode: function () { this.changeColorMode() },
      rotateSpeed: function () { this.changeRotateSpeed() },
      bpm: function () { this.changeBPM() },
      luminosity: function () { this.changeLuminosity() },
      ip: function () { this.changeAddress() },
      port: function () { this.changeAddress() }
    },
    computed: {
      nowColorSytle: function () {
        if (this.colorMode === 'point') {
          var R, G, B;
          [R, G, B] = this.hsv2rgb(this.hue, this.sat, this.val)
          return 'rgb(' + R + ', ' + G + ', ' + B + ')'
        }
        return 'linear-gradient(-45deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
      },
      nowPointModeStyle: function () {
        if (this.colorMode === 'point') {
          return 'white solid 1px'
        }
        return 'none'
      },
      nowRainbowModeStyle: function () {
        if (this.colorMode === 'rainbow') {
          return 'white solid 1px'
        }
        return 'none'
      },
      isAcvitiveBeat: function () { return this.patternMode === 'beat' },
      isAcvitiveBreath: function () { return this.patternMode === 'breath' },
      isAcvitivePulse: function () { return this.patternMode === 'pulse' },
      isAcvitiveTriangle: function () { return this.patternMode === 'triangle' },
      isAcvitiveNone: function () { return this.patternMode === 'none' },
      isActiveBM1: function () { return this.bpmMultiply === 1 },
      isActiveBM2: function () { return this.bpmMultiply === 2 },
      isActiveBM4: function () { return this.bpmMultiply === 4 },
      isActiveBM8: function () { return this.bpmMultiply === 8 }
    },
    methods: {
      clickSetPoint () {
        this.colorMode = 'point'
      },
      clickSetRainbow () {
        this.colorMode = 'rainbow'
      },
      clickPatternMode (pattern) {
        this.patternMode = pattern
        this.sendPattern(pattern)
      },
      clickBPMMulti (bpmMultiply) {
        this.bpmMultiply = bpmMultiply
        this.sendBPM(this.bpm * this.bpmMultiply)
      },
      changeColorMode () {
        this.sendColorMode()
      },
      changeColor () {
        var R, G, B;
        [R, G, B] = this.hsv2rgb(this.hue, this.sat, this.val)
        this.sendColor(R, G, B)
      },
      changeRotateSpeed () {
        this.sendRotateSpeed(this.rotateSpeed)
      },
      changeBPM () {
        this.sendBPM(this.bpm * this.bpmMultiply)
      },
      changeLuminosity () {
        this.sendLuminosity(this.luminosity)
      },
      changeAddress () {
        this.sendAddress(this.ip, this.port)
      },
      sendColorMode () {
        this.sendOsc('/color-mode', [this.colorMode])
        console.log('ColorMode sended')
      },
      sendColor (r, g, b) {
        this.sendOsc('/color', [r, g, b])
        console.log('Color sended')
      },
      sendRotateSpeed (rotateSpeed) {
        this.sendOsc('/rainbow-role-speed', [rotateSpeed])
        console.log('rotate sended')
      },
      sendBPM (bpm) {
        this.sendOsc('/bpm', [bpm])
        console.log('BPM sended')
      },
      sendPattern (pattern) {
        this.sendOsc('/pattern', [pattern])
        console.log('Pattern sended')
      },
      sendLuminosity (luminosity) {
        this.sendOsc('/luminosity', [luminosity])
        console.log('Luminosity sended')
      },
      hsv2rgb (h, s, v) {
        var C = v * s
        var Hp = h / 60
        var X = C * (1 - Math.abs(Hp % 2 - 1))

        var R, G, B
        if (Hp >= 0 && Hp < 1) {
          [R, G, B] = [C, X, 0]
        };

        if (Hp >= 1 && Hp < 2) {
          [R, G, B] = [X, C, 0]
        };

        if (Hp >= 2 && Hp < 3) {
          [R, G, B] = [0, C, X]
        };

        if (Hp >= 3 && Hp < 4) {
          [R, G, B] = [0, X, C]
        };

        if (Hp >= 4 && Hp < 5) {
          [R, G, B] = [X, 0, C]
        };

        if (Hp >= 5 && Hp < 6) {
          [R, G, B] = [C, 0, X]
        };

        var m = v - C;
        [R, G, B] = [R + m, G + m, B + m]

        R = Math.floor(R * 255)
        G = Math.floor(G * 255)
        B = Math.floor(B * 255)

        return [R, G, B]
      },
      sendOsc (address, data) {
        this.$electron.ipcRenderer.send('send-osc', address, data)
      },
      sendAddress (ip, port) {
        this.$electron.ipcRenderer.send('change-address', ip, port)
        console.log('Success Changing Address')
        console.log(ip, port)
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
    grid-template-rows: 10vh 60vh 30vh;
    grid-template-columns: 75vw 1fr;
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

input[type="range"]{
    //transform: rotate(-90deg);
    height:auto;
}
input[type="text"]{
    //transform: rotate(-90deg);
    height:auto;
    color:#222;
    text-align: right;
}

.controller-color{
    display: inline-block;
    vertical-align: middle;
    width:100%;
    height:100%;
}

.controller-color-point{
    width:70%;
}

.controller-color-rainbow{
    width:70%;
}

.controller-color-point-hsv{
    display:inline-block;
    vertical-align: middle;
    width:100%;
    height:100%;
    margin-left:20px;

    .hue-slider{
        background: -moz-linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
        background: -ms-linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
        background: -o-linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
        background: -webkit-gradient(90deg, left top, left bottom, from(#ff0000), color-stop(0.17, #ffff00), color-stop(0.33, #00ff00), color-stop(0.5, #00ffff), color-stop(0.67, #0000ff), color-stop(0.83, #ff00ff), to(#ff0000));
        background: -webkit-linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
        background: linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
    }

    input[type="range"]{
        margin-right:30px;
    }
    input[type="text"]{
        width:50px;
    }
}

.controller-color-rainbow-roll{
    display:inline-block;
    vertical-align: middle;
    width:100%;
    height:100%;
    margin-left:20px;
    input[type="range"]{
        display:inline-block;
        margin-right:30px;
    }
    input[type="text"]{
        display:inline-block;
        width:50px;
    }
}


input[type="range"] {
    -moz-appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    margin: 5px;
    width:  200px;
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

.controller-color-now{
    width:100px;
    height:100px;
}

.controller-color-now[data-state="rainbow"]{
    background: -moz-linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
    background: -ms-linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
    background: -o-linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
    background: -webkit-gradient(90deg, left top, left bottom, from(#ff0000), color-stop(0.17, #ffff00), color-stop(0.33, #00ff00), color-stop(0.5, #00ffff), color-stop(0.67, #0000ff), color-stop(0.83, #ff00ff), to(#ff0000));
    background: -webkit-linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
    background: linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
    
}

.controller-pattern-bpm{
  margin-left: 20px;
  button{
    color:black;
  }
}

.controller-pattern-bpm-slider{
  margin-right: 50px;
}

.controller-pattern-bpm-text{
  width:50px;
  margin-right:20px;
}

.controller-pattern-mode{
  margin-left: 20px;
  button{
    color:black;
  }
}

.controller-output{
  display: inline;
}

.controller-output-address{
  display: block;
  input{
    color:#222;
    background: #eee;
    border:solid 1px #ccc;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    width:70px;

    &:focus{
        border:solid 1px rgb(42, 184, 240);
    }
  }
}

button{
  background:white;
}

.button-active{
  background: rgb(228, 162, 20);
}
</style>
