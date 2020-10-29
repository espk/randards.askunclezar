<template>
  <div id="app">
    <AskUncleZar />
  </div>
</template>

<script>
import AskUncleZar from "./components/AskUncleZar-Grid.vue";

export default {
  name: "app",
  components: {
    AskUncleZar
  }
};
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ddd;
}
button {
  padding: 6px 20px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid #111;
  background-color: #333;
  color: #eee;
  cursor: pointer;
}
a:link,
a:visited,
a:hover {
  text-decoration: none;
  color: inherit;
}
button:hover {
  color: #eee;
  background-color: #039;
}
.column-name {
  width: auto;
  text-align: left;
  padding: 0 5px;
  border-left: none;
  border-right: none;
}
.pull-right {
  float: right;
}

button.remove-toon {
  border: 0;
  margin: 5px -2px 0 0;
  padding: 0;
  background-color: transparent;
  color: #333;
}
button.remove-toon :hover {
  color: #900;
}

.row {
  width: 980px;
  margin: 0 auto;
  padding: 0 20px;
}
.grid-body .grid-item:hover {
  background: #444 !important;
  color: #999 !important;
}
input {
  padding: 5px 10px;
  border-radius: 6px;
  margin-right: 10px;
  background: #ccc;
  border: #555;
}
.spinner {
  font-size: 36px;
  position: fixed;
  height: 100%;
  background: #606060;
}


.waiting-panel {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.waiting-spinner {
  display: block;
  margin: 0 auto;
  text-align: center;
  margin-top: 300px;
}

/* Class Colors */
/* Item Quality Colors */
.poor {
  background-color: #9d9d9d;
}

.common {
  background-color: #fff;
}

.uncommon {
  background-color: #1eff00;
}

.rare {
  background-color: #0070dd;
}

.epic {
  background-color: #a335ee;
}

.legendary {
  background-color: #ff8000;
}

.artifact {
  background-color: #e6cc80;
}

.heirloom {
  background-color: #e6cc80;
}

.token {
  background-color: #00ccff;
}

/* Heat Map Colors */
/* yellow to green */
.yellow-to-green .percent-0 {
  background-color: #a08000;
}

.yellow-to-green .percent-1 {
  background-color: #9e7f00;
}

.yellow-to-green .percent-2 {
  background-color: #9d7f00;
}

.yellow-to-green .percent-3 {
  background-color: #9b7e00;
}

.yellow-to-green .percent-4 {
  background-color: #9a7d00;
}

.yellow-to-green .percent-5 {
  background-color: #987d00;
}

.yellow-to-green .percent-6 {
  background-color: #967c00;
}

.yellow-to-green .percent-7 {
  background-color: #957c00;
}

.yellow-to-green .percent-8 {
  background-color: #937b00;
}

.yellow-to-green .percent-9 {
  background-color: #927a00;
}

.yellow-to-green .percent-10 {
  background-color: #907a00;
}

.yellow-to-green .percent-11 {
  background-color: #8e7900;
}

.yellow-to-green .percent-12 {
  background-color: #8d7800;
}

.yellow-to-green .percent-13 {
  background-color: #8b7800;
}

.yellow-to-green .percent-14 {
  background-color: #8a7700;
}

.yellow-to-green .percent-15 {
  background-color: #887600;
}

.yellow-to-green .percent-16 {
  background-color: #867600;
}

.yellow-to-green .percent-17 {
  background-color: #857500;
}

.yellow-to-green .percent-18 {
  background-color: #837400;
}

.yellow-to-green .percent-19 {
  background-color: #827400;
}

.yellow-to-green .percent-20 {
  background-color: #807300;
}

.yellow-to-green .percent-21 {
  background-color: #7e7300;
}

.yellow-to-green .percent-22 {
  background-color: #7d7200;
}

.yellow-to-green .percent-23 {
  background-color: #7b7100;
}

.yellow-to-green .percent-24 {
  background-color: #7a7100;
}

.yellow-to-green .percent-25 {
  background-color: #787000;
}

.yellow-to-green .percent-26 {
  background-color: #766f00;
}

.yellow-to-green .percent-27 {
  background-color: #756f00;
}

.yellow-to-green .percent-28 {
  background-color: #736e00;
}

.yellow-to-green .percent-29 {
  background-color: #726d00;
}

.yellow-to-green .percent-30 {
  background-color: #706d00;
}

.yellow-to-green .percent-31 {
  background-color: #6e6c00;
}

.yellow-to-green .percent-32 {
  background-color: #6d6c00;
}

.yellow-to-green .percent-33 {
  background-color: #6b6b00;
}

.yellow-to-green .percent-34 {
  background-color: #6a6a00;
}

.yellow-to-green .percent-35 {
  background-color: #686a00;
}

.yellow-to-green .percent-36 {
  background-color: #666900;
}

.yellow-to-green .percent-37 {
  background-color: #656800;
}

.yellow-to-green .percent-38 {
  background-color: #636800;
}

.yellow-to-green .percent-39 {
  background-color: #626700;
}

.yellow-to-green .percent-40 {
  background-color: #606600;
}

.yellow-to-green .percent-41 {
  background-color: #5e6600;
}

.yellow-to-green .percent-42 {
  background-color: #5d6500;
}

.yellow-to-green .percent-43 {
  background-color: #5b6400;
}

.yellow-to-green .percent-44 {
  background-color: #5a6400;
}

.yellow-to-green .percent-45 {
  background-color: #586300;
}

.yellow-to-green .percent-46 {
  background-color: #566300;
}

.yellow-to-green .percent-47 {
  background-color: #556200;
}

.yellow-to-green .percent-48 {
  background-color: #536100;
}

.yellow-to-green .percent-49 {
  background-color: #526100;
}

.yellow-to-green .percent-50 {
  background-color: #506000;
}

.yellow-to-green .percent-51 {
  background-color: #4e5f00;
}

.yellow-to-green .percent-52 {
  background-color: #4d5f00;
}

.yellow-to-green .percent-53 {
  background-color: #4b5e00;
}

.yellow-to-green .percent-54 {
  background-color: #4a5d00;
}

.yellow-to-green .percent-55 {
  background-color: #485d00;
}

.yellow-to-green .percent-56 {
  background-color: #465c00;
}

.yellow-to-green .percent-57 {
  background-color: #455c00;
}

.yellow-to-green .percent-58 {
  background-color: #435b00;
}

.yellow-to-green .percent-59 {
  background-color: #425a00;
}

.yellow-to-green .percent-60 {
  background-color: #405a00;
}

.yellow-to-green .percent-61 {
  background-color: #3e5900;
}

.yellow-to-green .percent-62 {
  background-color: #3d5800;
}

.yellow-to-green .percent-63 {
  background-color: #3b5800;
}

.yellow-to-green .percent-64 {
  background-color: #3a5700;
}

.yellow-to-green .percent-65 {
  background-color: #385600;
}

.yellow-to-green .percent-66 {
  background-color: #365600;
}

.yellow-to-green .percent-67 {
  background-color: #355500;
}

.yellow-to-green .percent-68 {
  background-color: #335400;
}

.yellow-to-green .percent-69 {
  background-color: #325400;
}

.yellow-to-green .percent-70 {
  background-color: #305300;
}

.yellow-to-green .percent-71 {
  background-color: #2e5300;
}

.yellow-to-green .percent-72 {
  background-color: #2d5200;
}

.yellow-to-green .percent-73 {
  background-color: #2b5100;
}

.yellow-to-green .percent-74 {
  background-color: #2a5100;
}

.yellow-to-green .percent-75 {
  background-color: #285000;
}

.yellow-to-green .percent-76 {
  background-color: #264f00;
}

.yellow-to-green .percent-77 {
  background-color: #254f00;
}

.yellow-to-green .percent-78 {
  background-color: #234e00;
}

.yellow-to-green .percent-79 {
  background-color: #224d00;
}

.yellow-to-green .percent-80 {
  background-color: #204d00;
}

.yellow-to-green .percent-81 {
  background-color: #1e4c00;
}

.yellow-to-green .percent-82 {
  background-color: #1d4c00;
}

.yellow-to-green .percent-83 {
  background-color: #1b4b00;
}

.yellow-to-green .percent-84 {
  background-color: #1a4a00;
}

.yellow-to-green .percent-85 {
  background-color: #184a00;
}

.yellow-to-green .percent-86 {
  background-color: #164900;
}

.yellow-to-green .percent-87 {
  background-color: #154800;
}

.yellow-to-green .percent-88 {
  background-color: #134800;
}

.yellow-to-green .percent-89 {
  background-color: #124700;
}

.yellow-to-green .percent-90 {
  background-color: #104600;
}

.yellow-to-green .percent-91 {
  background-color: #0e4600;
}

.yellow-to-green .percent-92 {
  background-color: #0d4500;
}

.yellow-to-green .percent-93 {
  background-color: #0b4400;
}

.yellow-to-green .percent-94 {
  background-color: #0a4400;
}

.yellow-to-green .percent-95 {
  background-color: #084300;
}

.yellow-to-green .percent-96 {
  background-color: #064300;
}

.yellow-to-green .percent-97 {
  background-color: #054200;
}

.yellow-to-green .percent-98 {
  background-color: #034100;
}

.yellow-to-green .percent-99 {
  background-color: #024100;
}

.yellow-to-green .percent-100 {
  background-color: #004000;
}
</style>