<template>
  <div class="valute_component__wrapper">
    <select
      id="valute_component"
      class="valute_component__select"
      v-model="baseValute"
    >
      <option v-for="valute in store.getValutes" :value="valute">
        {{ valute.Name }}
      </option>
    </select>
    <div class="valute_component">
      <div class="valute_component__value">
        <label for="valute_input" class="valute_component__label">{{
          baseValute.CharCode
        }}</label>
        <input
          type="number"
          min="1"
          placeholder="1"
          class="valute_component__input"
          @input="onlyNumber"
          v-model="baseValueString"
        />
      </div>
      <div class="valute_component__cource">
        <span>{{ currentCource }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useConverter } from "@/composition";
import { useConverterStore } from "@/stores/modules/converter/use-converter.store";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const store = useConverterStore();
const { baseValute, calculatedValute, baseValue } = storeToRefs(store);
const onlyNumber = (e:Event)=>{
const el = e.target as HTMLInputElement
el.value = el.value.replace(/^[0-9]\g/,"")
}
const baseValueString = computed({
  get() {
    return baseValue.value + "";
  },
  set(v) {
    baseValue.value = +v
  },
});
const { convert } = useConverter();
const currentCource = computed(() => {
  return `1 ${baseValute.value.CharCode} = ${convert(
    baseValute.value,
    calculatedValute.value,
    1
  ).toFixed(2)} ${calculatedValute.value.CharCode}`;
});
</script>
<style scoped lang="scss">
@import "../converter-page.styles.scss";

</style>
