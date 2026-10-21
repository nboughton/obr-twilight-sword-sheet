<template>
  <q-btn-group :class="`${disadvantage ? 'bg-red text-white' : 'bg-grey-3'}`" rounded
    flat
    spread>
    <q-btn :label="short(name)" disable />
    <q-btn :label="attr" @click="edit(name)" />
  </q-btn-group>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { AttrLong, AttrShort } from "./models";
import { short } from "@/lib/misc";

const attr = defineModel<number>({ required: true });
const props = defineProps<{
  name: AttrLong;
  disadvantage?: boolean;
}>();

const $q = useQuasar();
const edit = (name: AttrLong) =>
  $q.dialog({
    title: `Edit ${name}`.toUpperCase(),

    cancel: true,
    prompt: {
      label: "Value",
      model: `${attr.value}`,
      type: "number",
      min: 0,
      max: 10,
    },
  }).onOk((v) => attr.value = v);
</script>
