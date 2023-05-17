<template>
  <div class="grid-group grid-body">
    <div class="grid-body-character">
      <WowCharacterName
        v-bind:WowCharacter="WowCharacter"
        @childRemoveCharacter="handleRemoveCharacter"
      />
    </div>
    <div
      v-bind:class="itemLevelEquippedClass"
      class="grid-item grid-item-equipped-ilvl"
    >
      {{ WowCharacter.items.averageItemLevelEquipped }}
    </div>
    <div v-bind:class="itemLevelClass" class="grid-item grid-item-overall-ilvl">
      {{ WowCharacter.items.averageItemLevel }}
    </div>
    <WowCharacterItem
      v-bind:item="'head'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.head"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'neck'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.neck"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'shoulder'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.shoulder"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'back'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.back"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'chest'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.chest"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'shirt'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.shirt"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'tabard'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.tabard"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'wrist'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.wrist"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'hands'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.hands"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'waist'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.waist"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'legs'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.legs"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'feet'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.feet"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'finger1'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.finger1"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'finger2'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.finger2"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'trinket1'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.trinket1"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'trinket2'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.trinket2"
      v-bind:currentView="currentView"
    />
    <WowCharacterItem
      v-bind:item="'two-hand'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.mainHand"
      v-bind:currentView="currentView"
      v-if="hasTwoHander"
    />
    <WowCharacterItem
      v-bind:item="'main-hand'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.mainHand"
      v-bind:currentView="currentView"
      v-if="!hasTwoHander"
    />
    <WowCharacterItem
      v-bind:item="'off-hand'"
			v-bind:characterId="characterId"
      v-bind:wow-character-item="WowCharacter.items.offHand"
      v-bind:currentView="currentView"
      v-if="!hasTwoHander"
    />
    <div class="grid-item-avatar">
      <div class="avatar" :style="backgroundStyle">
        &nbsp;
      </div>
    </div>
  </div>
</template>

<script>
import WowCharacterItem from "./WowCharacterItem";
import WowCharacterName from "./WowCharacterName";
import { mapState } from "vuex";

export default {
  components: {
    WowCharacterItem: WowCharacterItem,
    WowCharacterName: WowCharacterName,
  },
  props: {
    WowCharacter: Object,
    currentView: String,
  },
  mounted() {},
  computed: mapState({
    itemLevels: state => state.itemLevels,
    characterId: function() {
      return `${this.WowCharacter.name}-${this.WowCharacter.realm}`
    },
    itemLevelClass: function () {
      return "percent-" + this.itemLevels[this.characterId].averageItemLevel;
    },
    itemLevelEquippedClass: function () {
      return "percent-" + this.itemLevels[this.characterId].averageItemLevelEquipped;
    },
    hasTwoHander: function () {
      return (this.WowCharacter.items.mainHand.weaponType === "Two-Hand" ||
              this.WowCharacter.items.mainHand.weaponType === "Ranged");
    },
    backgroundStyle: function() {
      return { 
        backgroundImage: `url('${this.WowCharacter.media.inset}')`
      }
    }
  }),
  methods: {
    handleRemoveCharacter: function (value) {
      this.$emit("removeCharacter", value);
    },
  },
};
</script>

<style>
td {
  text-align: center;
}
.divider {
  border: none;
  width: 10px;
}
</style>

