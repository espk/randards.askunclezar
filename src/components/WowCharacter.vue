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
      v-bind:wow-character-item="WowCharacter.items.head"
    />
    <WowCharacterItem
      v-bind:item="'neck'"
      v-bind:wow-character-item="WowCharacter.items.neck"
    />
    <WowCharacterItem
      v-bind:item="'shoulder'"
      v-bind:wow-character-item="WowCharacter.items.shoulder"
    />
    <WowCharacterItem
      v-bind:item="'back'"
      v-bind:wow-character-item="WowCharacter.items.back"
    />
    <WowCharacterItem
      v-bind:item="'chest'"
      v-bind:wow-character-item="WowCharacter.items.chest"
    />
    <WowCharacterItem
      v-bind:item="'shirt'"
      v-bind:wow-character-item="WowCharacter.items.shirt"
    />
    <WowCharacterItem
      v-bind:item="'tabard'"
      v-bind:wow-character-item="WowCharacter.items.tabard"
    />
    <WowCharacterItem
      v-bind:item="'wrist'"
      v-bind:wow-character-item="WowCharacter.items.wrist"
    />
    <WowCharacterItem
      v-bind:item="'hands'"
      v-bind:wow-character-item="WowCharacter.items.hands"
    />
    <WowCharacterItem
      v-bind:item="'waist'"
      v-bind:wow-character-item="WowCharacter.items.waist"
    />
    <WowCharacterItem
      v-bind:item="'legs'"
      v-bind:wow-character-item="WowCharacter.items.legs"
    />
    <WowCharacterItem
      v-bind:item="'feet'"
      v-bind:wow-character-item="WowCharacter.items.feet"
    />
    <WowCharacterItem
      v-bind:item="'finger1'"
      v-bind:wow-character-item="WowCharacter.items.finger1"
    />
    <WowCharacterItem
      v-bind:item="'finger2'"
      v-bind:wow-character-item="WowCharacter.items.finger2"
    />
    <WowCharacterItem
      v-bind:item="'trinket1'"
      v-bind:wow-character-item="WowCharacter.items.trinket1"
    />
    <WowCharacterItem
      v-bind:item="'trinket2'"
      v-bind:wow-character-item="WowCharacter.items.trinket2"
    />
    <WowCharacterItem
      v-bind:item="'two-hand'"
      v-bind:wow-character-item="WowCharacter.items.mainHand"
      v-if="hasTwoHander"
    />
    <WowCharacterItem
      v-bind:item="'main-hand'"
      v-bind:wow-character-item="WowCharacter.items.mainHand"
      v-if="!hasTwoHander"
    />
    <WowCharacterItem
      v-bind:item="'off-hand'"
      v-bind:wow-character-item="WowCharacter.items.offHand"
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

export default {
  components: {
    WowCharacterItem: WowCharacterItem,
    WowCharacterName: WowCharacterName,
  },
  props: {
    WowCharacter: Object,
  },
  mounted() {},
  computed: {
    itemLevelClass: function () {
      return "percent-" + this.WowCharacter.items.averageItemLevelPercentile;
    },
    itemLevelEquippedClass: function () {
      return (
        "percent-" + this.WowCharacter.items.averageItemLevelEquippedPercentile
      );
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
  },
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

