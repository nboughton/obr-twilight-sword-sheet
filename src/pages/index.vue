<template>
  <q-layout view="lHh Lpr lFf">
    <q-header unelevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Twilight Sword </q-toolbar-title>

        <q-btn icon="mdi-bed" @click="showRestDialog = true" flat rounded />
        <q-checkbox v-model="app.char.boon" checked-icon="mdi-flare"
          unchecked-icon="mdi-circle-outline" keep-color color="white" size="lg">
          <q-tooltip>Boon</q-tooltip>
        </q-checkbox>

        <!--div>Quasar v{{ $q.version }}</div-->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item class="items-center" v-for="(c, i) in app.characters" :key="`char-${i}`"
          :active="app.config.char == i"
          active-class="text-accent" clickable v-ripple>
          <q-item-section @click="app.config.char = i">{{ c.bio.name }}</q-item-section>
          <q-item-section v-if="app.characters.length > 1" side>
            <q-btn icon="delete" flat dense rounded @click="removeChar(i)" />
          </q-item-section>
        </q-item>
        <q-btn class="full-width" label="New Character" flat @click="app.newChar()"
          icon-right="add" />
        <q-separator />

        <q-item clickable v-ripple @click="app.exportData">
          <q-item-section avatar>
            <q-icon name="download" />
          </q-item-section>
          <q-item-section>
            Export Character Data
            <q-tooltip>Download your character data as a .json file</q-tooltip>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="showDataLoad = true">
          <q-item-section avatar>
            <q-icon name="upload" />
          </q-item-section>
          <q-item-section>
            Load Character Data
            <q-tooltip>Load previously exported character data</q-tooltip>
          </q-item-section>
        </q-item>
        <q-separator />

        <!--q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="mdi-cog" />
          </q-item-section>
          <q-item-section>
            <q-toggle left-label label="Dark Mode" v-model="app.config.dark" />
          </q-item-section>
        </q-item-->

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="mdi-cog" />
          </q-item-section>
          <q-item-section>
            <q-toggle left-label label="Durability" v-model="app.config.durability" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showDataLoad" maximized>
      <q-card>
        <q-card-section
          class="text-center text-bold bg-secondary">Load Character Data</q-card-section>

        <q-card-section class="text-subtitle">
        Please bear in mind that this data will overwrite any existing versions of the same character.
      </q-card-section>

        <q-card-section>
          <q-file v-model="fileToLoad" standout label="Select File" accept=".json" />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn label="load" color="primary" @click="loadData" flat />
          <q-btn label="close" color="warning" @click="showDataLoad = false" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showRestDialog">
      <q-card>
        <q-card-section
          class="text-center text-bold text-white bg-primary">Take a Rest</q-card-section>
        <q-card-section class="column">
          <q-btn-toggle v-model="restType" :options="[
            {label: 'Short', value: 'short'},
            {label: 'Long', value: 'long'}
          ]" flat dense spread rounded />
          <div v-if="restType == 'short'">
            <span class="text-bold text-center">Choose 1:</span>
            <q-btn-group class="bg-grey-3" vertical outline spread>
              <q-btn label="1D12 Hearts + 1D4 Stamina"
                @click="app.recover('hearts', '1d12'); app.recover('stamina', '1d4')" no-caps />
              <q-btn label="2D12 Hearts" @click="app.recover('hearts', '2d12')" no-caps />
              <q-btn label="2D4 Stamina" @click="app.recover('stamina', '2d4')" no-caps />
            </q-btn-group>
            <div class="text-bold text-center">OR clear 1 Status Effect</div>
            <div class="text-bold text-center">AND recover 1 expended Spell</div>
          </div>
          <div v-else>
            <q-btn-group vertical flat spread>
              <q-btn label="Recover all Hearts/Stamina" no-caps @click="app.fullRecover()" />
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Close" @click="showRestDialog = false" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { CharacterStore } from "@/components/models";

import { useCharacterStore } from "@/stores/character-store";
import { useQuasar } from "quasar";
import { ref } from "vue";

const app = useCharacterStore();
const $q = useQuasar();

const showRestDialog = ref(false);
const restType = ref("short");

const showDataLoad = ref(false);
const fileToLoad = ref(null);
const loadData = () => {
  const f: File = fileToLoad.value as unknown as File;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const data = JSON.parse(ev.target?.result as string) as CharacterStore;
    app.loadData(data);
    showDataLoad.value = false;
  };
  reader.readAsText(f);
};

const removeChar = (index: number) =>
  $q
    .dialog({
      message: `Delete ${app.characters[index]!.bio.name}?`,
      cancel: true,
    })
    .onOk(() => {
      app.config.char = 0;
      app.characters.splice(index, 1);
    });

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
