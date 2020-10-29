<template>
  <div>
    <header id="header">
      <div id="header-outer" class="outer row">
        <div id="header-title" class="inner">
          <h1 id="logo-wrap">randards.com</h1>
          <h2 id="subtitle-wrap">do you meet randy's standards?</h2>
        </div>
        <div id="header-app-title" class="inner">
          <h2>Ask Uncle Zar</h2>
          <h3>Ask Aunt Luci</h3>
        </div>
      </div>
    </header>
    <div class="application row">
      <div class="contol-area">
        <div class="float-left">
          <button @click="loadRaid()">Load Raid Members</button>
        </div>
        <div class="float-right">
          <input type="text" placeholder="character" v-model="character" />
          <input type="text" placeholder="realm " v-model="realm" />
          <button @click="addCharacter()">Load Character</button>
        </div>
      </div>
    </div>
    <div class="application row">
      <div>
        <table class="gear-table table-header-rotated yellow-to-green">
          <thead>
            <tr>
              <th class="header-name">
                <div>
                  <span>name</span>
                </div>
              </th>
              <th></th>
              <th>
                <div>
                  <span>
                    <button type="button">equipped</button>
                  </span>
                </div>
              </th>
              <th>
                <div>
                  <span>
                    <button type="button">max</button>
                  </span>
                </div>
              </th>
              <th></th>
              <th>
                <div>
                  <span>head</span>
                </div>
              </th>
              <th>
                <div>
                  <span>neck</span>
                </div>
              </th>
              <th>
                <div>
                  <span>shoulders</span>
                </div>
              </th>
              <th>
                <div>
                  <span>back</span>
                </div>
              </th>
              <th>
                <div>
                  <span>chest</span>
                </div>
              </th>
              <th>
                <div>
                  <span>wrists</span>
                </div>
              </th>
              <th>
                <div>
                  <span>hands</span>
                </div>
              </th>
              <th>
                <div>
                  <span>waist</span>
                </div>
              </th>
              <th>
                <div>
                  <span>legs</span>
                </div>
              </th>
              <th>
                <div>
                  <span>feet</span>
                </div>
              </th>
              <th>
                <div>
                  <span>ring 1</span>
                </div>
              </th>
              <th>
                <div>
                  <span>ring 2</span>
                </div>
              </th>
              <th>
                <div>
                  <span>trinket 1</span>
                </div>
              </th>
              <th>
                <div>
                  <span>trinket 2</span>
                </div>
              </th>
              <th>
                <div>
                  <span>main hand</span>
                </div>
              </th>
              <th>
                <div>
                  <span>off hand</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-for="WowCharacter in raid" v-bind:key="WowCharacter.id">
            <wow-character
              v-bind:wow-character="WowCharacter"
              @removeCharacter="handleRemoveCharacter"
            />
          </tbody>
        </table>
      </div>
      <!--
      <div class="application-container">
        <div class="grid-container">
          <div class="grid-group grid-head">
            <div class="grid-item grid-character">name</div>
            <div class="grid-item grid-equipped-ilvl">equipped</div>
            <div class="grid-item grid-overall-ilvl">max</div>
            <div class="grid-item grid-head">head</div>
            <div class="grid-item grid-neck">neck</div>
            <div class="grid-item grid-shoulders">shoulders</div>
            <div class="grid-item grid-back">back</div>
            <div class="grid-item grid-chest">chest</div>
            <div class="grid-item grid-wrist">wrist</div>
            <div class="grid-item grid-hands">hands</div>
            <div class="grid-item grid-waist">waist</div>
            <div class="grid-item grid-legs">legs</div>
            <div class="grid-item grid-feet">feet</div>
            <div class="grid-item grid-ring1">ring 1</div>
            <div class="grid-item grid-ring2">ring 2</div>
            <div class="grid-item grid-trinket1">trinket 1</div>
            <div class="grid-item grid-trinket2">trinket 2</div>
            <div class="grid-item grid-main-hand">main hand</div>
            <div class="grid-item grid-off-hand">off hand</div>
          </div>
        </div>
      </div>
      -->
    </div>
    <div class="waiting-panel" v-if="loadState.loading">
      <div class="waiting-spinner">
        <h4>
          <span>{{ currentFlavorText }}</span>
        </h4>
        <img src="/img/green-spin.gif" height="64" width="64" />
        <div>Loading {{ loadState.loadingCount }} characters</div>
      </div>
    </div>
    <button class="sns-button" @click="loadSns()">Load SnS Members</button>
    <footer></footer>
  </div>
</template>

<script>
import store from "../data/store";
import WowCharacter from "./WowCharacter";
import { mapState } from "vuex";

export default {
  name: "AskUncleZar",
  components: {
    WowCharacter: WowCharacter
  },
  store,
  data: function() {
    return {
      character: "",
      realm: ""
    };
  },
  computed: mapState(["raid", "loadState", "currentFlavorText"]),
  methods: {
    loadSns: function() {
      this.$store.commit("shuffleText");
      this.$store.dispatch("getSnS");
    },
    loadRaid: function() {
      this.$store.commit("shuffleText");
      this.$store.dispatch("getCurrentRaid");
    },
    addCharacter: function() {
      this.$store.commit("shuffleText");
      this.$store.dispatch("loadSingleCharacter", {
        character: this.character,
        realm: this.realm
      });

      this.character = "";
      this.realm = "";
    },

    handleRemoveCharacter: function(character) {
      this.$store.commit("removeCharacter", character);
    }
  },
  mounted: function() {
    this.$store.dispatch("pingApi");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#header {
  height: 60px;
  border-bottom: 1px solid #333;
}
#header:before,
#header:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 20px;
}
#header:before {
  top: 0;
  background: -webkit-linear-gradient(rgba(0, 0, 0, 0.2), transparent);
  background: -moz-linear-gradient(rgba(0, 0, 0, 0.2), transparent);
  background: -ms-linear-gradient(rgba(0, 0, 0, 0.2), transparent);
  background: linear-gradient(rgba(0, 0, 0, 0.2), transparent);
}
#header:after {
  top: 40px;
  background: -webkit-linear-gradient(transparent, rgba(0, 0, 0, 0.2));
  background: -moz-linear-gradient(transparent, rgba(0, 0, 0, 0.2));
  background: -ms-linear-gradient(transparent, rgba(0, 0, 0, 0.2));
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
}
#header-outer {
  height: 100%;
  position: relative;
}
#header-inner {
  position: relative;
  overflow: hidden;
}

#header-title {
  height: 40px;
  position: absolute;
}
#header-title h1,
#header-title h1 a {
  font-family: "Orbitron", sans-serif;
  font-weight: normal;
  color: #9482c9;
  margin-top: 4px;
}
#header-title h2,
#header-title h2 a {
  font-family: "Noticia Text", serif;
  font-style: italic;
  font-weight: normal;
  font-size: 11px;
  color: #999;
  margin-top: -30px;
  margin-left: 92px;
}
#header-app-title {
  height: 40px;
  float: right;
}
#header-app-title h2 {
  font-family: "Permanent Marker", sans-serif;
  font-weight: normal;
  font-size: 32px;
  color: #0070de;
  margin: 0;
  text-align: right;
}
#header-app-title h3 {
  font-family: "Permanent Marker", sans-serif;
  font-weight: normal;
  font-size: 16px;
  color: #fff;
  margin-top: -16px;
  text-align: right;
}
#logo,
#subtitle {
  text-decoration: none;
  color: #fff;
  font-weight: 300;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}
#logo {
  font-size: 40px;
  line-height: 40px;
  letter-spacing: 2px;
}
#subtitle {
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 1px;
}
#subtitle-wrap {
  margin-top: 16px;
}
.application {
  margin-top: 20px;
}
.contol-area {
  height: 30px;
  margin-top: -21px;
  padding: 10px;
  border: 1px solid #333;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.waiting-spinner h4 {
  font-size: 24px;
  margin-bottom: 6px;
}
.waiting-spinn div {
  margin-top: 6px;
}
footer {
  height: 100px;
}
.sns-button {
  position: fixed;
  bottom: 0;
  right: 0;
  color: rgba(0, 0, 0, 1);
  font-size: 1px;
  padding: 0;
  margin: 0;
}

.grid-container .grid-group {
  display: grid;
  grid-template-columns: 10% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5%;
}

.grid-group {
  border: 1px solid #333;
}
.grid-group .grid-item {
  height: 100px;
  transform: translate(5px, 10px) rotate(315deg);
  text-align: left;
  white-space: nowrap;
}
.grid-group .grid-item.grid-character {
  transform: none;
  margin-top: 34px;
}
</style>
