<template>
  <div>
    <DataTable
          title="Avaliações Físicas"
          :columns="columns"
          :items="avaliacoes"
          :loading="loading"
          :searchable="true"
          @search="handleSearch"
        >
          <template #actions>
            <router-link to="/avaliacoes-fisicas/novo" class="btn-action btn-primary">+ Nova Avaliação</router-link>
          </template>

          <template #rowActions="{ item }">
            <router-link :to="`/avaliacoes-fisicas/editar/${item.id}`" class="btn-action btn-edit">Editar</router-link>
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
const avaliacoes = ref<any[]>([]);
const allAvaliacoes = ref<any[]>([]);

const columns = [
  { key: 'numero', label: 'Número' },
  { key: 'peso', label: 'Peso (kg)' },
  { key: 'altura', label: 'Altura (m)' },
  { key: 'imc', label: 'IMC' },
  { key: 'data_avaliacao', label: 'Data' }
];

const fetchAvaliacoes = async () => {
  loading.value = true;
  try {
    const response = await api.get('/avaliacoes-fisicas/');
    avaliacoes.value = response.data;
    allAvaliacoes.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar avaliações físicas:', error);
    alert('Não foi possível carregar a lista.');
  } finally {
    loading.value = false;
  }
};

const handleSearch = (query: string) => {
  if (!query) {
    avaliacoes.value = allAvaliacoes.value;
    return;
  }
  const q = query.toLowerCase();
  avaliacoes.value = allAvaliacoes.value.filter(item => 
    (item.numero && item.numero.toLowerCase().includes(q))
  );
};

const confirmDelete = async (avaliacao: any) => {
  if (confirm(`Tem certeza que deseja excluir a avaliação ${avaliacao.numero}?`)) {
    try {
      await api.delete(`/avaliacoes-fisicas/${avaliacao.id}/`);
      await fetchAvaliacoes();
    } catch (error) {
      console.error('Erro ao excluir avaliação:', error);
      alert('Não foi possível excluir a avaliação.');
    }
  }
};

onMounted(() => {
  fetchAvaliacoes();
});
</script>
