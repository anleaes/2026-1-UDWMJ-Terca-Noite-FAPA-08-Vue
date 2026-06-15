<template>
  <div>
    <DataTable
          title="Alimentos"
          :columns="columns"
          :items="alimentos"
          :loading="loading"
          :searchable="true"
          @search="handleSearch"
        >
          <template #cell-foto="{ item }">
            <img v-if="item.foto" :src="item.foto" alt="Foto" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />
            <span v-else style="color: #666; font-size: 0.9em;">Sem foto</span>
          </template>

          <template #actions>
            <router-link to="/nutricao/alimentos/novo" class="btn-action btn-primary">+ Novo Alimento</router-link>
          </template>

          <template #rowActions="{ item }">
            <router-link :to="`/nutricao/alimentos/editar/${item.id}`" class="btn-action btn-edit">Editar</router-link>
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
const alimentos = ref<any[]>([]);
const allAlimentos = ref<any[]>([]);

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'descricao', label: 'Descrição' },
  { key: 'porcao_referencia_gramas', label: 'Porção (g/ml)' },
  { key: 'calorias', label: 'Kcal' },
  { key: 'proteina', label: 'Proteína (g)' },
  { key: 'carboidrato', label: 'Carbo (g)' },
  { key: 'gordura', label: 'Gordura (g)' },
  { key: 'esta_ativo', label: 'Ativo' },
  { key: 'foto', label: 'Foto' },
  { key: 'categoriaalimento_nome', label: 'Categoria' }
];

const fetchAlimentos = async () => {
  loading.value = true;
  try {
    const response = await api.get('/alimentos/');
    const mapped = response.data.map((item: any) => ({
      ...item,
      esta_ativo: item.esta_ativo ? 'Sim' : 'Não'
    }));
    alimentos.value = mapped;
    allAlimentos.value = mapped;
  } catch (error) {
    console.error('Erro ao buscar alimentos:', error);
    alert('Não foi possível carregar a lista de alimentos.');
  } finally {
    loading.value = false;
  }
};

const handleSearch = (query: string) => {
  if (!query) {
    alimentos.value = allAlimentos.value;
    return;
  }
  const q = query.toLowerCase();
  alimentos.value = allAlimentos.value.filter(item => 
    (item.nome && item.nome.toLowerCase().includes(q))
  );
};

const confirmDelete = async (alimento: any) => {
  if (confirm(`Tem certeza que deseja excluir o alimento ${alimento.nome}?`)) {
    try {
      await api.delete(`/alimentos/${alimento.id}/`);
      await fetchAlimentos();
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('Não foi possível excluir o alimento.');
    }
  }
};

onMounted(() => {
  fetchAlimentos();
});
</script>
