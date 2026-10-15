<template>
  <q-page class="column full-width" padding>
    <bio />
    <top-bar />
    <div class="row">
      <div class="col">
        <abilities />
      </div>
      <q-separator vertical />
      <div class="col">
        <status-effects />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import Bio from "@/components/Bio.vue";
import Abilities from "@/components/Abilities.vue";
import StatusEffects from "@/components/StatusEffects.vue";
</script>
