<template>
  <div v-if="edit" class="column bg-grey-3 rounded-borders q-mb-sm q-pa-sm">
    <div class="row justify-evenly full-width items-baseline ">
      <q-input class="col" v-model="item.name" label="Name" dense />

      <q-select class="col" v-if="item.class == 'weapon'" v-model="item.type"
        :options="Object.keys(wpnTypes)" label="Type" dense emit-value map-options />

      <q-select class="col" v-if="item.class == 'weapon'" v-model="item.range"
        :options="Object.keys(ranges)" label="Range" dense />

      <q-input class="col-1" type="number" v-model.number="item.slot" label="Slots" dense />

      <q-checkbox class="col-shrink" v-model="item.equipped"
        unchecked-icon="mdi-alpha-e-circle-outline" checked-icon="mdi-alpha-e-circle" dense>
        <q-tooltip>Equip?</q-tooltip>
      </q-checkbox>
    </div>

    <div class="row items-center">
      <q-select class="col" v-if="item.class == 'armour'" v-model="item.type"
        :options="Object.keys(armourTypes)" label="Type" dense />

      <q-select class="col" v-if="item.class == 'weapon'" v-model="item.tags"
        :options="Object.keys(wpnTags)" label="Tags" multiple dense use-chips />

      <q-select class="col" v-if="item.class == 'armour'" v-model="item.penalty"
        :options="Object.keys(attributes)" label="Penalties" multiple dense use-chips />

      <q-input class="col-1" v-if="item.class == 'armour'" type="number" v-model.number="item.value"
        label="Value" dense />
    </div>

    <div class="row">
      <q-select class="col" v-if="item.class == 'weapon' && item.tags.includes('ELEMENTAL')"
        v-model="item.element" :options="Object.keys(elements)" label="Element" dense />

      <q-input class="col" v-if="item.class == 'weapon'" v-model="item.damage" label="Damage" dense
        :rules="[val => isDmgStr(val) || 'Examples: 1d10, 1d8+1, 3d4+2d6']" />

      <q-input class="col-2" v-if="item.class == 'weapon' && app.config.durability"
        type="number" v-model.number="item.durability" :min="0" :max="12" label="Durability"
        dense />
    </div>

    <div class="row iems-center">
      <q-input class="col" v-model="item.desc" label="Additional info" dense borderless autogrow />
      <q-btn class="col-shrink" icon="delete" flat rounded dense @click="emit('delete')" />
    </div>
  </div>

  <div v-else class="column bg-grey-3 item-box rounded-borders  q-mb-sm q-pa-sm">
    <div class="row">
      <span class="col text-bold">
        <div class="row items-center">
          <q-icon class="q-pr-sm" v-if="item.class == 'weapon'" :name="wpnTypes[item.type]" size="sm" />
          <q-btn v-if="item.class == 'armour'" icon="mdi-shield" size="md" disable flat dense>{{ item.value }}</q-btn>
          {{ item.name }}{{ item.class == "weapon" && app.config.durability ? ` [${item.durability ?? 0}]` : "" }}

          <span class="q-px-sm" v-if="item.class == 'weapon'">{{ item.damage }}</span>
          <q-icon v-if="item.class == 'weapon' && item.tags.includes('ELEMENTAL')"
            :name="elIcon[item.element!].icon" :color="elIcon[item.element!].colour" size="sm">
            <q-tooltip>{{ item.element }}</q-tooltip>
          </q-icon>
        </div>
      </span>

      <span class="col-shrink items-center justify-center text-bold">
        <q-icon v-if="item.equipped" name="mdi-alpha-e-circle" size="sm">
          <q-tooltip>Equipped</q-tooltip>
        </q-icon>
        <q-icon v-else :name="`mdi-numeric-${item.slot}-circle`" size="sm">
          <q-tooltip>Slot(s)</q-tooltip>
        </q-icon>
      </span>
    </div>

    <div class="row items-center justify-between" v-if="item.class == 'armour'">
      <div class="col-shrink">Type: {{ item.type }}</div>
      <div class="col-shrink" v-if="item.penalty.length > 0">
        Penalties: {{ item.penalty.join(", ") }}
      </div>
    </div>

    <div class="row" v-if="item.class == 'weapon'">
      <q-chip :label="item.range.toLowerCase()">
        <q-tooltip>Range</q-tooltip>
      </q-chip>
      <q-chip v-for="tag in item.tags" :key="tag" :label="tag.toLowerCase()" clickable
        @click="showTagText(tag)" />
    </div>

    <div v-if="item.desc.length > 0" class="row">{{ item.desc }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  armourTypes,
  attributes,
  elements,
  elIcon,
  isDmgStr,
  Item,
  ranges,
  WpnTag,
  wpnTags,
  wpnTypes,
} from "./models";

import { useQuasar } from "quasar";
import { useCharacterStore } from "@/stores/character-store";
import { computed } from "vue";

const item = defineModel<Item>({ required: true });
const props = defineProps<{ edit: boolean }>();
const emit = defineEmits(["delete"]);

const app = useCharacterStore();

const $q = useQuasar();
const showTagText = (tag: WpnTag) =>
  $q.dialog({
    title: tag,
    message: wpnTags[tag],
  });
</script>
