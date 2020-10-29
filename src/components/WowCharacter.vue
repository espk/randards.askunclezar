<template>
  <tr>
    <WowCharacterName v-bind:WowCharacter="WowCharacter" @childRemoveCharacter="handleRemoveCharacter" />
    <td class="divider"></td>
    <td v-bind:class="itemLevelEquippedClass">{{ WowCharacter.items.averageItemLevelEquipped }}</td>
    <td v-bind:class="itemLevelClass">{{ WowCharacter.items.averageItemLevel }}</td>
    <td class="divider"></td>
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.head" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.neck" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.shoulder" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.back" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.chest" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.wrist" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.hands" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.waist" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.legs" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.feet" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.finger1" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.finger2" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.trinket1" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.trinket2" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.mainHand" colspan="2" v-if="hasTwoHander" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.mainHand" v-if="!hasTwoHander" />
    <WowCharacterItem v-bind:wow-character-item="WowCharacter.items.offHand" v-if="!hasTwoHander"  />
  </tr>
</template>

<script>
import WowCharacterItem from "./WowCharacterItem";
import WowCharacterName from "./WowCharacterName";

export default {
  components: {
    WowCharacterItem: WowCharacterItem,
    WowCharacterName: WowCharacterName
  },
  props: {
    WowCharacter: Object
  },
  mounted() {
  },
  computed: {
    itemLevelClass: function() {
      return 'percent-' + this.WowCharacter.items.averageItemLevelPercentile  
    },
    itemLevelEquippedClass: function() {
      return 'percent-' + this.WowCharacter.items.averageItemLevelEquippedPercentile  
    },
    hasTwoHander: function() {
      return (this.WowCharacter.items.mainHand.weaponType === 'Two-Hand' || this.WowCharacter.items.mainHand.weaponType === 'Ranged')
    }
  },
  methods: {
    handleRemoveCharacter: function(value) {
      this.$emit('removeCharacter', value)
    }
  }

};
</script>

<style>
td { 
  text-align: center;
}
.divider {
  border: none;
  width: 10px; }

</style>

