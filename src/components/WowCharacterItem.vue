<template>
  <td v-bind:class='itemLevelClass'>
    <a href='#' v-bind:rel='wowheadLink'>{{cleanedCharacterItem.itemLevel}}</a>
  </td>
</template>

<script>
export default {
  props: {
    WowCharacterItem: Object
  },
  computed: {
    cleanedCharacterItem: function() {
      if (this.WowCharacterItem === undefined) {
        return { itemLevel: '' };
      }

      return this.WowCharacterItem;
    },
    itemLevelClass: function() {
      if (this.WowCharacterItem !== undefined)
        return 'percent-' + this.WowCharacterItem.itemLevelPercentile;

      return ''
    },
    wowheadLink: function() {
      var link = 'item=' + this.WowCharacterItem.id;
      var traits = this.azeritePower

      if (traits !== '')
        link += '&azerite-powers=' + traits
       
      return link
    },
    azeritePower: function() {
      var parameters = [];
      if (this.WowCharacterItem.azeriteEmpoweredItem) {

        this.WowCharacterItem.azeriteEmpoweredItem.azeritePowers.forEach(power => {
          parameters.push(power.id)
        });
      } 

      return parameters.join(':')
  }
    
  },
  mounted() {
  }
  
};
</script>

<style>
</style>

