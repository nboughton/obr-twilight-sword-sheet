<template>
  <q-page class="column full-width bg-white" padding>
    <bio />
    <top-bar />
    <q-tabs v-model="tab" dense>
      <q-tab name="abl" label="Abilities" />
      <q-tab name="inv" label="Inventory" />
      <q-tab name="cond" label="Status Effects">
        <q-badge v-if="conditions.length > 0" color="red" rounded floating>
          {{ conditions.length }}
        </q-badge>
      </q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel class="column" name="cond">
        <div class="row justify-between">
          <div class="col-8">
            <q-list :class="`row rounded-borders q-pa-sm q-mb-xs items-center bg-${item.colour}`"
              v-for="item in conditions" dense>
              <q-item dense>
                <q-item-section avatar>
                  <q-avatar :icon="item.icon"></q-avatar>
                </q-item-section>
                <q-item-section>
                  {{ item.text }}
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col q-pl-sm">
            <status-effects />
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="inv">
        <inventory />
      </q-tab-panel>

      <q-tab-panel name="abl">
        <abilities />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import TopBar from "@/components/TopBar.vue";
import Bio from "@/components/Bio.vue";
import StatusEffects from "@/components/StatusEffects.vue";
import Inventory from "@/components/Inventory.vue";
import Abilities from "@/components/Abilities.vue";
import { useCharacterStore } from "@/stores/character-store";
import { Status, statuses, StatusIcon } from "@/components/models";

const tab = ref("abl");
const app = useCharacterStore();
const conditions = computed((): { text: string; icon: string; colour: string }[] => {
  const r: { text: string; icon: string; colour: string }[] = [];
  for (let cond in app.char.statuses) {
    if (app.char.statuses[cond as Status]) {
      r.push({
        text: statuses[cond as Status],
        icon: StatusIcon[cond as Status].icon,
        colour: StatusIcon[cond as Status].colour,
      });
    }
  }
  return r;
});
</script>
