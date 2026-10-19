<template>
  <div v-if="edit" class="column bg-grey-3 rounded-borders q-mb-sm q-pa-sm">
    <div class="row">
      <q-input class="col-grow" label="Name" v-model="feat.name" dense />
      <q-select class="col-2" v-if="feat.type == 'spell'" label="Roll"
        :options="Object.keys(abilities)" v-model="feat.roll" dense />
      <q-btn class="col-shrink" v-if="edit" icon="delete" flat dense rounded
        @click="emit('delete')" />
    </div>

    <div class="row" v-if="feat.type == 'spell'">
      <q-select class="col" label="Range" :options="Object.keys(ranges)" v-model="feat.range"
        dense />
      <q-input class="col" label="Duration" v-model="feat.duration" dense />
    </div>

    <q-input class="row" label="Text" v-model="feat.text" dense borderless />
  </div>

  <div v-else class="column bg-grey-3 rounded-borders  q-mb-sm q-pa-sm">
    <div class="row">
      <span class="col text-bold">{{ feat.name }}</span>
      <span class="col-shrink"
        v-if="feat.type == 'spell'">Roll {{ feat.roll }} ({{ feat.roll != "-" ? app.char.abilities[long(feat.roll)] : "-" }})</span>
    </div>
    <div class="row items-center" v-if="feat.type == 'spell'">
      <span class="col items-center">
        <q-icon name="mdi-ruler" size="sm" />
        {{ feat.range }}
      </span>
      <span class="col text-right items-baseline">
        {{ feat.duration }}
        <q-icon name="mdi-timer-outline" size="sm" />
      </span>
    </div>
    <div class="row" v-if="feat.text.length > 0">{{ feat.text }}</div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from "@/stores/character-store";
import { abilities, type ClassAbility, ranges } from "./models";
import { long } from "@/lib/misc";

const feat = defineModel<ClassAbility>({ required: true });
const props = defineProps<{ edit?: boolean }>();
const emit = defineEmits(["delete"]);

const app = useCharacterStore();
</script>
