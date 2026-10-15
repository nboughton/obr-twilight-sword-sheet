<template>
  <div v-if="edit" class="row justify-evenly full-width items-center">
    <q-input class="col" v-model="item.name" label="Name" dense />

    <q-input class="col" v-if="item.class == 'weapon' && store.config.durability"
      v-model.number="item.durability" label="Durability" dense />

    <q-select class="col" v-if="item.class == 'weapon'" v-model="item.type" :options="wpnTypes"
      label="Type" dense emit-value map-options />

    <q-select class="col" v-if="item.class == 'armour'" v-model="item.type"
      :options="Object.keys(armourTypes)" label="Type" dense />

    <q-select class="col" v-if="item.class == 'weapon'" v-model="item.tags"
      :options="Object.keys(wpnTags)" label="Tags" multiple dense />

    <q-select class="col" v-if="item.class == 'armour'" v-model="item.penalty"
      :options="Object.keys(abilities)" label="Penalties" multiple dense />

    <q-checkbox class="col" v-if="item.class == 'weapon' || item.class == 'armour'"
      v-model="item.equipped" label="Equip" dense />

    <q-input class="col-1" v-if="item.class == 'armour'" v-model.number="item.value" label="Value"
      dense />

    <q-select class="col" v-if="item.class == 'weapon' && item.tags.includes('ELEMENTAL')"
      v-model="item.element"
      :options="Object.keys(elements)" label="Element" dense />

    <q-input class="col" v-if="item.class == 'weapon'" v-model="item.damage" label="Damage" dense
      :rules="[val => isDmgStr(val) || 'Examples: 1d10, 1d8+1, 3d4+2d6']" />
    <q-input class="col-1" v-model.number="item.slot" label="Slots" dense />

    <q-input class="col-12" v-model="item.desc" label="Desc" dense />
  </div>

  <div v-else class="row">
    <span class="col">
      {{ item.name }}{{ item.class == "weapon" && store.config.durability ? ` [${item.durability}]` : "" }}
    </span>

    <span class="col" v-if="item.class == 'weapon' || item.class == 'armour'">{{ item.type }}</span>

    <div class="col" v-if="item.class == 'weapon'">
      <span class="wpn-tag" v-for="tag in item.tags" :key="tag">
        {{ tag }}
        <q-tooltip>{{ wpnTags[tag] }}</q-tooltip>
      </span>
    </div>

    <span class="col" v-if="item.class == 'armour'">{{ item.penalty.join(", ") }}</span>

    <span class="col" v-if="item.class == 'armour'">
      <q-icon name="mdi-shield" />
      {{ item.value }}
    </span>

    <span class="col" v-if="item.class == 'weapon' && item.tags.includes('ELEMENTAL')">
      {{ item.element }}
    </span>

    <span class="col" v-if="item.class == 'weapon' || item.class == 'armour'">
      {{ !item.equipped ? "not " : "" }}equipped
    </span>

    <span class="col-1">{{ item.slot }}</span>
  </div>
</template>

<script setup lang="ts">
import { abilities, armourTypes, elements, isDmgStr, Item, itemClasses, wpnTags } from "./models";

import { useCharacterStore } from "@/stores/character-store";

const item = defineModel<Item>({ required: true });
const props = defineProps<{ edit: boolean }>();

const wpnTypes: { label: string; value: string | number }[] = [
  { label: "Melee", value: "M" },
  { label: "Ranged", value: "R" },
  { label: "Shield", value: "S" },
];

const store = useCharacterStore();
</script>
