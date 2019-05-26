<template>
  <td class="column-name">
    <div v-bind:style="{ color: characterClass }">
      {{WowCharacter.name}}
      <button
        class="remove-toon pull-right close-plus"
        v-on:click="removeToon()"
      >+</button>
    </div>
    <div class="realm">{{WowCharacter.realm}}</div>
  </td>
</template>

<script>
import globals from "../data/globals";

export default {
  props: {
    WowCharacter: Object
  },
  computed: {
    characterClass: function() {
      var item = globals.classes.filter((element) => {
        return element.id === this.WowCharacter.class;
      });

      return item[0].color;
    }
  },
  mounted() {
    //console.log(this.toon);

  },
  methods: {
    removeToon: function() {
      this.$emit('childRemoveCharacter', this.WowCharacter)
    }
  }
};
</script>

<style>
td {
  text-align: left;
}
.realm {
  font-size: 10px;
  font-style: italic;
  color: #999;
}
.close-plus {
  font-weight: bold;
  transform: rotate(45deg);
}
.gear-table td:hover .close-plus {
  color: #777;
}
</style>

