<template>
  <div>
    <DataTable
          title="Nutricionistas"
          :columns="columns"
          :items="nutricionistas"
          :loading="loading"
          :searchable="true"
          @search="handleSearch"
        >
          <template #actions>
            <router-link to="/nutricao/nutricionistas/novo" class="btn-action btn-primary">+ Novo Nutricionista</router-link>
          </template>

          <template #rowActions="{ item }">
            <router-link :to="`/nutricao/nutricionistas/editar/${item.id}`" class="btn-action btn-edit">Editar</router-link>
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
const nutricionistas = ref<any[]>([]);
const allNutricionistas = ref<any[]>([]);

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'sobrenome', label: 'Sobrenome' },
  { key: 'endereco', label: 'Endereço' },
  { key: 'telefone', label: 'Telefone' },
  { key: 'email', label: 'E-mail' },
  { key: 'registroCRN', label: 'Registro CRN' },
  { key: 'abordagem_nutricional', label: 'Abordagem Nutricional' }
];

const fetchNutricionistas = async () => {
  loading.value = true;
  try {
    const response = await api.get('/nutricionistas/');
    nutricionistas.value = response.data;
    allNutricionistas.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar nutricionistas:', error);
    alert('Não foi possível carregar a lista de nutricionistas.');
  } finally {
    loading.value = false;
  }
};

const handleSearch = (query: string) => {
  if (!query) {
    nutricionistas.value = allNutricionistas.value;
    return;
  }
  const q = query.toLowerCase();
  nutricionistas.value = allNutricionistas.value.filter(item => 
    (item.nome && item.nome.toLowerCase().includes(q)) ||
    (item.sobrenome && item.sobrenome.toLowerCase().includes(q)) ||
    (item.registroCRN && item.registroCRN.toLowerCase().includes(q))
  );
};

const confirmDelete = async (nutri: any) => {
  if (confirm(`Tem certeza que deseja excluir o nutricionista ${nutri.nome}?`)) {
    try {
      await api.delete(`/nutricionistas/${nutri.id}/`);
      await fetchNutricionistas();
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('Não foi possível excluir.');
    }
  }
};

onMounted(() => {
  fetchNutricionistas();
});
</script>
