<template>
  <div class="data-table-container">
    <div class="data-table-header">
      <h2 class="table-title">{{ title }}</h2>
      <div class="table-actions">
        <input 
          v-if="searchable"
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar..." 
          class="search-input"
          @input="$emit('search', searchQuery)"
        />
        <slot name="actions"></slot>
      </div>
    </div>
    
    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
            <th v-if="$slots.rowActions" class="actions-col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td :colspan="columns.length + ($slots.rowActions ? 1 : 0)" class="text-center py-4">
              Carregando dados...
            </td>
          </tr>
          <tr v-else-if="items.length === 0">
            <td :colspan="columns.length + ($slots.rowActions ? 1 : 0)" class="text-center py-4">
              Nenhum registro encontrado.
            </td>
          </tr>
          <tr v-else v-for="item in items" :key="item.id">
            <td v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :item="item">
                {{ item[col.key] }}
              </slot>
            </td>
            <td v-if="$slots.rowActions" class="actions-col">
              <slot name="rowActions" :item="item"></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  title: string;
  columns: { key: string; label: string }[];
  items: any[];
  loading?: boolean;
  searchable?: boolean;
}>();

defineEmits(['search']);

const searchQuery = ref('');
</script>

<style scoped>
.data-table-container {
  background-color: #1F1F1F;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
}

.data-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  border-bottom: 1px solid #333;
  padding-bottom: 15px;
}

.table-title {
  font-family: 'Calistoga', serif;
  font-size: 28px;
  color: #FFF;
}

.table-actions {
  display: flex;
  gap: 15px;
  align-items: center;
}

.search-input {
  background-color: #2B2B2B;
  color: #FFF;
  border: 1px solid #333;
  padding: 10px 15px;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  min-width: 250px;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #FFB800;
}

.table-responsive {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 15px 20px;
  text-align: left;
  border-bottom: 1px solid #333;
}

.data-table th {
  color: #999;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
}

.data-table td {
  color: #CCC;
}

.data-table tbody tr:hover {
  background-color: #2B2B2B;
}

.actions-col {
  text-align: right;
  width: 150px;
}

.text-center {
  text-align: center;
}

.py-4 {
  padding-top: 30px !important;
  padding-bottom: 30px !important;
}

/* Base styles for action buttons inside slots */
:global(.btn-action) {
  padding: 6px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  display: inline-block;
}

:global(.btn-primary) {
  background-color: #FFB800;
  color: #141414;
}

:global(.btn-primary:hover) {
  opacity: 0.8;
}

:global(.btn-edit) {
  background-color: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

:global(.btn-edit:hover) {
  background-color: #3b82f6;
  color: #FFF;
}

:global(.btn-delete) {
  background-color: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
  margin-left: 8px;
}

:global(.btn-delete:hover) {
  background-color: #ef4444;
  color: #FFF;
}

:global(.btn-view) {
  background-color: transparent;
  color: #38ef7d;
  border: 1px solid #38ef7d;
  margin-right: 8px;
}

:global(.btn-view:hover) {
  background-color: #38ef7d;
  color: #141414;
}
</style>
