<template>
  <div>
    <DataTable
          title="Gestão de Alunos"
          :columns="columns"
          :items="alunos"
          :loading="loading"
          :searchable="true"
          @search="handleSearch"
        >
          <template #actions>
            <router-link to="/alunos/novo" class="btn-action btn-primary">+ Novo Aluno</router-link>
          </template>

          <template #rowActions="{ item }">
            <router-link :to="`/alunos/ver/${item.id}`" class="btn-action btn-view">Ver</router-link>
            <router-link :to="`/alunos/editar/${item.id}`" class="btn-action btn-edit">Editar</router-link>
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
const alunos = ref<any[]>([]);
const allAlunos = ref<any[]>([]);

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'sobrenome', label: 'Sobrenome' },
  { key: 'data_nascimento', label: 'Data de Nascimento' },
  { key: 'endereco', label: 'Endereço' },
  { key: 'telefone', label: 'Telefone' },
  { key: 'email', label: 'E-mail' },
  { key: 'genero', label: 'Gênero' },
  { key: 'meta', label: 'Meta' }
];

const fetchAlunos = async () => {
  loading.value = true;
  try {
    const response = await api.get('/alunos/');
    alunos.value = response.data;
    allAlunos.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    alert('Não foi possível carregar a lista de alunos.');
  } finally {
    loading.value = false;
  }
};

const handleSearch = (query: string) => {
  if (!query) {
    alunos.value = allAlunos.value;
    return;
  }
  const q = query.toLowerCase();
  alunos.value = allAlunos.value.filter(aluno => 
    (aluno.nome && aluno.nome.toLowerCase().includes(q)) ||
    (aluno.sobrenome && aluno.sobrenome.toLowerCase().includes(q)) ||
    (aluno.email && aluno.email.toLowerCase().includes(q))
  );
};

const confirmDelete = async (aluno: any) => {
  if (confirm(`Tem certeza que deseja excluir o aluno ${aluno.nome}?`)) {
    try {
      await api.delete(`/alunos/${aluno.id}/`);
      await fetchAlunos();
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
      alert('Não foi possível excluir o aluno.');
    }
  }
};

onMounted(() => {
  fetchAlunos();
});
</script>
