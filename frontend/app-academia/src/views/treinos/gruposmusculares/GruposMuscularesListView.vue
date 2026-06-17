<template>
  <div>
    <DataTable
          title="Grupos Musculares"
          :columns="columns"
          :items="grupos"
          :loading="loading"
          :searchable="true"
          @search="handleSearch"
        >
          <template #actions>
            <router-link to="/dashboard" class="btn-menu-internal">MENU</router-link>
            <router-link to="/treinos/grupos-musculares/novo" class="btn-action btn-primary">+ Novo Grupo</router-link>
          </template>

          <template #rowActions="{ item }">
            <router-link :to="`/treinos/grupos-musculares/editar/${item.id}`" class="btn-action btn-edit">Editar</router-link>
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
const grupos = ref<any[]>([]);
const allGrupos = ref<any[]>([]);

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'descricao', label: 'Descrição' }
];

const fetchGrupos = async () => {
  loading.value = true;
  try {
    const response = await api.get('/grupos-musculares/');
    grupos.value = response.data;
    allGrupos.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar grupos musculares:', error);
    alert('Não foi possível carregar a lista de grupos musculares.');
  } finally {
    loading.value = false;
  }
};

const handleSearch = (query: string) => {
  if (!query) {
    grupos.value = allGrupos.value;
    return;
  }
  const q = query.toLowerCase();
  grupos.value = allGrupos.value.filter(grupo => 
    (grupo.nome && grupo.nome.toLowerCase().includes(q)) ||
    (grupo.descricao && grupo.descricao.toLowerCase().includes(q))
  );
};

const confirmDelete = async (grupo: any) => {
  if (confirm(`Tem certeza que deseja excluir o grupo ${grupo.nome}?`)) {
    try {
      await api.delete(`/grupos-musculares/${grupo.id}/`);
      await fetchGrupos();
    } catch (error) {
      console.error('Erro ao excluir grupo muscular:', error);
      alert('Não foi possível excluir o grupo muscular.');
    }
  }
};

onMounted(() => {
  fetchGrupos();
});
</script>
