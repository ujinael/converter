<template>
  <div class="table_wrapper">
    <table class="currency_table">
      <thead class="currency_table__head">
        <tr class="currency_table__row head">
          <th class="currency_table__head_cell">Код</th>
          <th class="currency_table__head_cell">
            <span>Пара</span>&nbsp;<button @click="store.switchMode" class="switch_button">
              &RightArrowLeftArrow;
            </button>
          </th>
          <th class="currency_table__head_cell">Название</th>
          <th class="currency_table__head_cell">Значение</th>
          <th class="currency_table__head_cell">Предыдущее</th>
          <th class="currency_table__head_cell">Тренд</th>
        </tr>
      </thead>
      <tbody class="currency_table__body">
        <VTableRow
          class="currency_table__row"
          v-for="valute in valutes"
          :key="valute.ID"
          :valute="valute"
        >
        </VTableRow>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { useCurrenciesStore } from "@/stores/modules/currencies/use-currencies.store";
import { CurrencyValue } from "@stores/modules/currencies/entity/currency";
import VTableRow from "./VTableRow.vue";
const props = defineProps<{
  valutes: Array<CurrencyValue>;
}>();
const store = useCurrenciesStore();
</script>
<style scoped lang="scss">
@import "../styles/currency-page.styles.scss";
.switch_button {
  display: inline-block;
  font-size: large;
  background-color: #09c;
  border: 1px solid #09c;
  padding: 0 .2rem;
  color: white;
  border-radius: 5px;
}
.switch_button:hover {
  cursor: pointer;
  background-color: rgb(190, 225, 237);
  color: #09c;
}
</style>
