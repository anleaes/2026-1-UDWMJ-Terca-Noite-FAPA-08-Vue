<template>
  <div>
    <DataTable
          title="Fichas Médicas"
          :columns="columns"
          :items="fichas"
          :loading="loading"
          :searchable="true"
          @search="handleSearch"
        >
          <template #actions>
            <router-link to="/dashboard" class="btn-menu-internal">MENU</router-link>
            <router-link to="/fichas-medicas/novo" class="btn-action btn-primary">+ Nova Ficha</router-link>
          </template>

          <template #rowActions="{ item }">
            <router-link :to="`/fichas-medicas/editar/${item.id}`" class="btn-action btn-edit">Editar</router-link>
            <button @click="confirmDelete(item)" class="btn-action btn-delete">Excluir</button>
          </template>
        </DataTable>
      </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from '@/components/layout/DataTable.vue';
import api from '@/services/api';

const loading = ref(false);
const fichas = ref<any[]>([]);
const allFichas = ref<any[]>([]);

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'descricao', label: 'Descrição' }
];

const fetchFichas = async () => {
  loading.value = true;
  try {
    const response = await api.get('/fichas-medicas/');
    fichas.value = response.data;
    allFichas.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar fichas médicas:', error);
    alert('Não foi possível carregar a lista de fichas médicas.');
  } finally {
    loading.value = false;
  }
};

const handleSearch = (query: string) => {
  if (!query) {
    fichas.value = allFichas.value;
    return;
  }
  const q = query.toLowerCase();
  fichas.value = allFichas.value.filter(ficha => 
    (ficha.nome && ficha.nome.toLowerCase().includes(q)) ||
    (ficha.descricao && ficha.descricao.toLowerCase().includes(q))
  );
};

const confirmDelete = async (ficha: any) => {
  if (confirm(`Tem certeza que deseja excluir a ficha ${ficha.nome}?`)) {
    try {
      await api.delete(`/fichas-medicas/${ficha.id}/`);
      await fetchFichas();
    } catch (error) {
      console.error('Erro ao excluir ficha médica:', error);
      alert('Não foi possível excluir a ficha médica.');
    }
  }
};

onMounted(() => {
  fetchFichas();
});
</script>
