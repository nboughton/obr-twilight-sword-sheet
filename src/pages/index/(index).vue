<template>
  <q-page class="column full-width bg-white" padding>
    <bio />
    <top-bar />
    <q-tabs v-model="tab" dense>
      <q-tab name="attr">Attributes</q-tab>
      <q-tab name="inv">Inventory</q-tab>
      <q-tab name="abl">Abilities</q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel class="column" name="attr">
        <div class="row justify-between">
          <div class="col q-pr-md">
            <abilities />
          </div>

          <div class="col q-pl-md">
            <status-effects />
          </div>
        </div>
        <div class="row  rounded-borders q-pa-sm q-mb-xs items-center"
          v-for="item in conditions"><q-icon class="q-mr-sm" size="sm" :name="item.icon" />{{ item.text }}</div>
      </q-tab-panel>

      <q-tab-panel name="inv">
        <inventory />
      </q-tab-panel>

      <q-tab-panel name="abl">
        <feats-and-spells />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import TopBar from "@/components/TopBar.vue";
import Bio from "@/components/Bio.vue";
import Abilities from "@/components/Abilities.vue";
import StatusEffects from "@/components/StatusEffects.vue";
import Inventory from "@/components/Inventory.vue";
import FeatsAndSpells from "@/components/FeatsAndSpells.vue";
import { useCharacterStore } from "@/stores/character-store";
import { Status, statuses, StatusIcon } from "@/components/models";

const tab = ref("attr");
const app = useCharacterStore();
const conditions = computed((): { text: string; icon: string }[] => {
  const r: { text: string; icon: string }[] = [];
  for (let cond in app.char.statuses) {
    if (app.char.statuses[cond as Status]) {
      r.push({ text: statuses[cond as Status], icon: StatusIcon[cond as Status].icon });
    }
  }
  return r;
});
</script>
