<template>
  <div class="yellow-to-green">
    <div class="group">
      <div class="contol-area">
        <div class="load-raid">
          <button @click="loadRaid()">Load Raid</button>
        </div>
        <div class="load-guild">
          <button @click="loadGuild()">Load Guild</button>
        </div>
        <div class="spacer">&nbsp;</div>
        <div class="character-input">
          <input type="text" placeholder="character" v-model="character" />
        </div>
        <div class="realm-input">
          <input type="text" placeholder="realm" v-model="realm" />
        </div>
        <div class="load-button">
          <button @click="addCharacter()">Load Character</button>
        </div>
      </div>
    </div>
    <div class="group">
      <div class="filter-container">
        <div class="mode-filter">
          view mode: 
          
          <button @click="setFilter('ilvl')" :class="isActiveFilter('ilvl')">ilvl</button> 
          .
          <button @click="setFilter('upgrade')" :class="isActiveFilter('upgrade')">upgrades</button> 
        </div>
      </div>
    </div>
    <div class="group">
      <div class="application-container">
        <div class="grid-container">
          <div class="grid-header">
            <div class="grid-item grid-character">name</div>
            <div class="grid-item grid-equipped-ilvl">
              <span class="header-text">equipped</span>
            </div>
            <div class="grid-item grid-overall-ilvl">
              <span class="header-text">max</span>
            </div>
            <div class="grid-spacer">
            </div>
            <div class="grid-item grid-head">
              <span class="header-text">head</span>
            </div>
            <div class="grid-item grid-neck">
              <span class="header-text">neck</span>
            </div>
            <div class="grid-item grid-shoulders">
              <span class="header-text">shoulders</span>
            </div>
            <div class="grid-item grid-back">
              <span class="header-text">back</span>
            </div>
            <div class="grid-item grid-chest">
              <span class="header-text">chest</span>
            </div>
            <div class="grid-item grid-wrist">
              <span class="header-text">wrist</span>
            </div>
            <div class="grid-item grid-hands">
              <span class="header-text">hands</span>
            </div>
            <div class="grid-item grid-waist">
              <span class="header-text">waist</span>
            </div>
            <div class="grid-item grid-legs">
              <span class="header-text">legs</span>
            </div>
            <div class="grid-item grid-feet">
              <span class="header-text">feet</span>
            </div>
            <div class="grid-item grid-ring1">
              <span class="header-text">ring 1</span>
            </div>
            <div class="grid-item grid-ring2">
              <span class="header-text">ring 2</span>
            </div>
            <div class="grid-item grid-trinket1">
              <span class="header-text">trinket 1</span>
            </div>
            <div class="grid-item grid-trinket2">
              <span class="header-text">trinket 2</span>
            </div>
            <div class="grid-item grid-main-hand">
              <span class="header-text">main hand</span>
            </div>
            <div class="grid-item grid-off-hand">
              <span class="header-text">off hand</span>
            </div>
          </div>
          <div
            v-for="WowCharacter in raid"
            v-bind:key="WowCharacter.id"
            class="details-container"
          >
            <wow-character
              v-bind:wow-character="WowCharacter"
              v-bind:currentView="currentView"
              @removeCharacter="handleRemoveCharacter"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="waiting-panel" v-if="loadState.loading">
      <div class="waiting-spinner">
        <h4>
          <span>{{ currentFlavorText }}</span>
        </h4>
        <img src="img/green-spin.gif" height="64" width="64" />
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
    WowCharacter: WowCharacter,
  },
  store,
  data: function () {
    return {
      character: "",
      realm: "",
    };
  },
  computed: mapState(["raid", "itemLevels", "loadState", "currentFlavorText", "currentView"]),
  methods: {
    loadRaid: function () {
      this.$store.commit("shuffleText");
      this.$store.dispatch("getCurrentRaid");
    },
    loadGuild: function () {
      this.$store.commit("shuffleText");
      this.$store.dispatch("getGuild");
    },
    addCharacter: function () {
      this.$store.commit("shuffleText");
      this.$store.dispatch("loadSingleCharacter", {
        character: this.character,
        realm: this.realm,
      });

      this.character = "";
      this.realm = "";
    },

    setFilter: function (filter) {
      this.$store.commit("setCurrentView", filter)
    },

    isActiveFilter: function (filter) {
      return (this.currentView === filter) ? "active " : "" 
    },

    handleRemoveCharacter: function (character) {
      this.$store.commit("removeCharacter", character);
      this.$store.commit("calculateStatistics");
    },

  },
  mounted: function () {
    this.$store.dispatch("pingApi");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
  /*box-sizing: border-box;*/
  border-collapse: collapse;
}
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

.contol-area {
  display: grid;
  grid-template-areas: "raid guild spacer character realm search";
  grid-template-columns: 1fr 1fr 2.2fr 1fr 1fr 0.8fr;
  height: 30px;
  padding: 10px;
  border: 1px solid #333;
  margin-bottom: 20px;
}
.load-raid {
  grid-area: raid;
  min-width: 115px;
  text-align: left;
}
.load-guild {
  grid-area: guild;
  min-width: 120px;
  text-align: left;
}
.spacer {
  grid-area: spacer;
}
.character-input {
  grid-area: character;
  margin-top: 4px;
  text-align: left;
}
.realm-input {
  grid-area: realm;
  margin-top: 4px;
  text-align: left;
}
.load-button {
  grid-area: search;
  min-width: 160px;
  text-align: left;
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

.filter-container {
  height: 20px;
}
.mode-filter {
  margin: -16px 10px 10px 0;
  text-align: right;
  border-bottom: 1px solid #222;
}
.mode-filter button {
  background-color: transparent;
  border-radius: 0;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 4px 10px;

}
.mode-filter button.all {
  color: #ccc;
}

.mode-filter button.active {
  background: #039;
}
.mode-filter button:hover, .mode-filter button.active:hover {
  color: #ddd;
  background: #36c;

}
.mode-filter button:focus {
  outline: 0;
}

.grid-body,
.grid-header {
  display: grid;
  grid-template-areas: "toon equip over spacer head neck shoulder back chest wrist hands waist legs feet finger1 finger2 trinket1 trinket2 main-hand off-hand";
  grid-template-columns: 3fr 1fr 1fr 0.05fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}

.grid-header {
  margin-top: 20px;
  border-bottom: 1px solid #333;
}
.header-text {
  display: block;
  transform: translate(8px, -6px) rotate(310deg);
  font-size: 14px;
  text-align: left;
  width: 80px;
}
.grid-header .grid-item {
  border: 1px solid transparent;
  overflow: visible;
  max-width: 42px;
  min-width: 30px;
  height: 40px;
}
.grid-header .grid-item.grid-character {
  width: 100%;
  text-align: left;
  max-width: unset;
  min-width: unset;
  padding-left: 6px;
  padding-top: 28px;
  height: 22px;
}

.grid-item {
  height: 30px;
  padding-top: 8px;
  border: 1px solid #222;
  border-collapse: collapse;
}
.column-name {
  height: 100%;
  border-bottom: 1px solid #222;
  font-size: 22px;
}
.column-name a {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis ;
  max-width: 130px;
}
.realm {
  margin-top: -6px;
}

.grid-item-shirt,
.grid-item-tabard,
.grid-item-avatar {
  display: none;
}
.grid-item-equipped-ilvl {
  display: grid;
  grid-area: equip;
}
.grid-item-overall-ilvl {
  display: grid;
  grid-area: over;
}
.grid-item-head {
  grid-area: head;
}
.grid-item-neck {
  grid-area: neck;
}
.grid-item-shoulder {
  grid-area: shoulder;
}
.grid-item-back {
  grid-area: back;
}
.grid-item-chest {
  grid-area: chest;
}
.grid-item-wrist {
  grid-area: wrist;
}
.grid-item-hands {
  grid-area: hands;
}
.grid-item-waist {
  grid-area: waist;
}
.grid-item-legs {
  grid-area: legs;
}
.grid-item-feet {
  grid-area: feet;
}
.grid-item-finger1 {
  grid-area: finger1;
}
.grid-item-finger2 {
  grid-area: finger2;
}
.grid-item-trinket1 {
  grid-area: trinket1;
}
.grid-item-trinket2 {
  grid-area: trinket2;
}

.grid-item-two-hand {
  grid-area: main-hand / main-hand / off-hand / off-hand;
}
.grid-item-main-hand {
  grid-area: main-hand;
}
.grid-item-off-hand {
  grid-area: off-hand;
}

@media (max-width: 800px) {
  div.group {
    width: 100%;
  }
  .details-container {
    margin: 40px 20px;
  }
  .grid-header {
    display: none;
  }
  .grid-body-character {
    display: grid;
    grid-area: toon;
  }

  .column-name a {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis ;
  }

  .grid-body {
    display: grid;
    grid-area: gear;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 10px;
    grid-template-areas:
      "head toon toon hands"
      "neck equip over waist"
      "shoulder blank blank legs"
      "back avatar avatar feet"
      "chest avatar avatar finger1"
      "shirt avatar avatar finger2"
      "tabard _ _ trinket1"
      "wrist main-hand off-hand trinket2";
    width: 100%;
  }

  .grid-item {
    height: 36px;
    padding-top: 0;
    border: none;
  }

  .grid-item-avatar {
    display: block;
    grid-area: avatar;
  }

  .grid-item::before {
    font-size: 11px;
    display: block;
    background-color: rgba(25, 25, 25, 1);
    color: #777;
    height: 13px;
  }
  .grid-item-equipped-ilvl::before {
    content: "equip ilvl";
  }
  .grid-item-overall-ilvl::before {
    content: "overall ilvl";
  }
  .grid-item-head::before {
    content: "head";
  }
  .grid-item-neck::before {
    content: "neck";
  }
  .grid-item-shoulder::before {
    content: "shoulder";
  }
  .grid-item-back::before {
    content: "back";
  }
  .grid-item-chest::before {
    content: "chest";
  }
  .grid-item-shirt::before {
    content: "shirt";
  }
  .grid-item-tabard::before {
    content: "tabard";
  }
  .grid-item-wrist::before {
    content: "wrist";
  }
  .grid-item-hands::before {
    content: "hands";
  }
  .grid-item-waist::before {
    content: "waist";
  }
  .grid-item-legs::before {
    content: "legs";
  }
  .grid-item-feet::before {
    content: "feet";
  }
  .grid-item-finger1::before {
    content: "finger 1";
  }
  .grid-item-finger2::before {
    content: "finger 2";
  }
  .grid-item-trinket1::before {
    content: "trinket 1";
  }
  .grid-item-trinket2::before {
    content: "trinket 2";
  }
  .grid-item-two-hand::before,
  .grid-item-main-hand::before {
    content: "main hand";
  }
  .grid-item-off-hand::before {
    content: "offhand";
  }
  .grid-item a {
    display: block;
    width: 100%;
    height: 100%;
    padding-top: 1px;
  }
  .avatar {
    height: 90%;
    margin-top: 5px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: 50%;
    background-position-y: 50%;
    border: 5px solid #0a0a0a;
    border-collapse: collapse;
  }
  .column-name {
    font-size: 22px;
    padding: 0;
    margin: 0;
  }

  .contol-area {
    display: grid;
    grid-template-columns: 80%;
    grid-template-areas:
      "character"
      "realm"
      "search"
      "raid"
      "guild";
    justify-content: stretch;
    height: auto;
    padding: 10px;
    border: 1px solid #333;
    margin-bottom: 20px;
  }
  .load-raid {
    grid-area: raid;
    margin-top: 16px;
    width: 190px;
  }
  .load-guild {
    grid-area: guild;
    margin-top: 4px;
    width: 190px;
  }
  .spacer {
    display: none;
  }
  .character-input {
    grid-area: character;
    margin-top: 4px;
    width: 100%;
  }
  .realm-input {
    grid-area: realm;
    margin-top: 4px;
    width: 100%;
  }
  .load-button {
    grid-area: search;
    margin-top: 4px;
    width: 190px;
  }
  .contol-area input,
  .contol-area button {
    width: 100%;
  }
}
</style>
