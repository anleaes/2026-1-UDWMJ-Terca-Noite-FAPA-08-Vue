<template>
  <div>
    <DataTable
          title="Exercícios"
          :columns="columns"
          :items="exercicios"
          :loading="loading"
          :searchable="true"
          @search="handleSearch"
        >
          <template #cell-foto="{ item }">
            <img v-if="item.foto" :src="item.foto" alt="Foto do Exercício" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />
            <span v-else style="color: #666; font-size: 0.9em;">Sem foto</span>
          </template>

          <template #actions>
            <router-link to="/treinos/exercicios/novo" class="btn-action btn-primary">+ Novo Exercício</router-link>
          </template>

          <template #rowActions="{ item }">
            <router-link :to="`/treinos/exercicios/editar/${item.id}`" class="btn-action btn-edit">Editar</router-link>
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
const exercicios = ref<any[]>([]);
const allExercicios = ref<any[]>([]);

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'descricao', label: 'Descrição' },
  { key: 'esta_ativo', label: 'Status' },
  { key: 'foto', label: 'Foto' },
  { key: 'grupomuscular_nome', label: 'Grupo Muscular' }
];

const fetchExercicios = async () => {
  loading.value = true;
  try {
    const response = await api.get('/exercicios/');
    // Mapeia para exibir "Sim" ou "Não"
    const mapped = response.data.map((ex: any) => ({
      ...ex,
      esta_ativo: ex.esta_ativo ? 'Sim' : 'Não'
    }));
    exercicios.value = mapped;
    allExercicios.value = mapped;
  } catch (error) {
    console.error('Erro ao buscar exercícios:', error);
    alert('Não foi possível carregar a lista de exercícios.');
  } finally {
    loading.value = false;
  }
};

const handleSearch = (query: string) => {
  if (!query) {
    exercicios.value = allExercicios.value;
    return;
  }
  const q = query.toLowerCase();
  exercicios.value = allExercicios.value.filter(ex => 
    (ex.nome && ex.nome.toLowerCase().includes(q)) ||
    (ex.descricao && ex.descricao.toLowerCase().includes(q))
  );
};

const confirmDelete = async (exercicio: any) => {
  if (confirm(`Tem certeza que deseja excluir o exercício ${exercicio.nome}?`)) {
    try {
      await api.delete(`/exercicios/${exercicio.id}/`);
      await fetchExercicios();
    } catch (error) {
      console.error('Erro ao excluir exercício:', error);
      alert('Não foi possível excluir o exercício.');
    }
  }
};

onMounted(() => {
  fetchExercicios();
});
</script>
