<template>
  <div v-bind:class="itemLevelClass" class="grid-item">
    <a href="#" v-bind:rel="wowheadLink">{{cleanedCharacterItem.itemLevel}}</a>
  </div>
</template>

<script>
export default {
  props: {
    WowCharacterItem: Object,
    item: String
  },
  computed: {
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
      if (this.WowCharacterItem !== undefined)
        style += " percent-" + this.WowCharacterItem.itemLevelPercentile;

      return style;
    },
    wowheadLink: function() {
      var link = "item=" + this.WowCharacterItem.id;
      var traits = this.azeritePower;

      if (traits !== "") link += "&azerite-powers=" + traits;

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
  },
  mounted() {
  }
};
</script>

<style>
</style>

