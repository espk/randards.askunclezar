<template>
  <div v-bind:class="itemLevelClass" class="grid-item">
    <a href="#" v-bind:rel="wowheadLink">{{cleanedCharacterItem.itemLevel}}</a>
  </div>
</template>

<script>

import { mapState } from "vuex";

export default {
  props: {
    WowCharacterItem: Object,
    item: String,
    characterId: String
  },
  computed: mapState({
    itemLevels: state => state.itemLevels,
    cleanedCharacterItem: function() {
      if ((this.WowCharacterItem === undefined) || 
         (this.item === 'tabard') ||
         (this.item === 'shirt')) {
        return { itemLevel: "" };
      }

      return this.WowCharacterItem;
    },
    itemLevelClass: function() {
      var style = "grid-item-" + this.item;
      var itemForLookup = this.item.replace("main-hand", "mainHand").replace("two-hand", "mainHand").replace("off-hand", "offHand")
      if (this.WowCharacterItem !== undefined)
        style += " percent-" + this.itemLevels[this.characterId][itemForLookup]

      return style;
    },
    wowheadLink: function() {
      var link = "item=" + this.WowCharacterItem.id;

      if (this.azeritePower !== "") link += "&azerite-powers=" + this.azeritePower
      if (this.WowCharacterItem.itemLevel !== "") link += "&ilvl=" + this.WowCharacterItem.itemLevel
      if (this.WowCharacterItem.sockets && this.WowCharacterItem.sockets.length > 0) link += "&gems=" + this.WowCharacterItem.sockets.map(s => s.id).join(":")

      return link;
    },
    azeritePower: function() {
      var parameters = [];
      if (this.WowCharacterItem.azeriteEmpoweredItem) {
        this.WowCharacterItem.azeriteEmpoweredItem.azeritePowers.forEach(
          power => {
            parameters.push(power.id);
          }
        );
      }

      return parameters.join(":");
    }
  }),
  mounted() {
  }
};
</script>

<style>
</style>

