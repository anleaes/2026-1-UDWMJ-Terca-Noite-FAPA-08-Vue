<template>
  <div>
    <DataTable
          title="Fichas de Treino"
          :columns="columns"
          :items="fichas"
          :loading="loading"
          :searchable="true"
          @search="handleSearch"
        >
          <template #actions>
            <router-link to="/treinos/fichas/novo" class="btn-action btn-primary">+ Nova Ficha de Treino</router-link>
          </template>

          <template #rowActions="{ item }">
            <router-link :to="`/treinos/fichas/ver/${item.id}`" class="btn-action btn-view">Ver</router-link>
            <router-link :to="`/treinos/fichas/editar/${item.id}`" class="btn-action btn-edit">Editar</router-link>
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
  { key: 'aluno_nome', label: 'Aluno' },
  { key: 'treinador_nome', label: 'Treinador' },
  { key: 'esta_ativo', label: 'Status' },
  { key: 'criado_em', label: 'Data' }
];

const fetchFichas = async () => {
  loading.value = true;
  try {
    const response = await api.get('/fichas-treinos/');
    const mapped = response.data.map((ficha: any) => ({
      ...ficha,
      esta_ativo: ficha.esta_ativo ? 'Sim' : 'Não',
      // Mapeia o nome do aluno e treinador caso venham como objetos aninhados da API
      aluno_nome: ficha.aluno_nome || (ficha.aluno?.nome ? `${ficha.aluno.nome} ${ficha.aluno.sobrenome || ''}`.trim() : 'N/A'),
      treinador_nome: ficha.treinador_nome || ficha.treinador?.nome || 'N/A'
    }));
    fichas.value = mapped;
    allFichas.value = mapped;
  } catch (error) {
    console.error('Erro ao buscar fichas de treino:', error);
    alert('Não foi possível carregar a lista de fichas de treino.');
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
    (ficha.descricao && ficha.descricao.toLowerCase().includes(q)) ||
    (ficha.aluno_nome && ficha.aluno_nome.toLowerCase().includes(q)) ||
    (ficha.treinador_nome && ficha.treinador_nome.toLowerCase().includes(q))
  );
};

const confirmDelete = async (ficha: any) => {
  if (confirm(`Tem certeza que deseja excluir a ficha de treino ${ficha.nome}?`)) {
    try {
      await api.delete(`/fichas-treinos/${ficha.id}/`);
      await fetchFichas();
    } catch (error) {
      console.error('Erro ao excluir ficha de treino:', error);
      alert('Não foi possível excluir a ficha de treino.');
    }
  }
};

onMounted(() => {
  fetchFichas();
});
</script>
