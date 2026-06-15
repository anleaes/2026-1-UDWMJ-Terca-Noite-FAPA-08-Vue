<template>
  <div>
    <DataTable
          title="Categorias de Alimentos"
          :columns="columns"
          :items="categorias"
          :loading="loading"
          :searchable="true"
          @search="handleSearch"
        >
          <template #actions>
            <router-link to="/nutricao/categorias/novo" class="btn-action btn-primary">+ Nova Categoria</router-link>
          </template>

          <template #rowActions="{ item }">
            <router-link :to="`/nutricao/categorias/editar/${item.id}`" class="btn-action btn-edit">Editar</router-link>
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
const categorias = ref<any[]>([]);
const allCategorias = ref<any[]>([]);

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'descricao', label: 'Descrição' }
];

const fetchCategorias = async () => {
  loading.value = true;
  try {
    const response = await api.get('/categorias-alimentos/');
    categorias.value = response.data;
    allCategorias.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    alert('Não foi possível carregar a lista de categorias.');
  } finally {
    loading.value = false;
  }
};

const handleSearch = (query: string) => {
  if (!query) {
    categorias.value = allCategorias.value;
    return;
  }
  const q = query.toLowerCase();
  categorias.value = allCategorias.value.filter(cat => 
    (cat.nome && cat.nome.toLowerCase().includes(q)) ||
    (cat.descricao && cat.descricao.toLowerCase().includes(q))
  );
};

const confirmDelete = async (categoria: any) => {
  if (confirm(`Tem certeza que deseja excluir a categoria ${categoria.nome}?`)) {
    try {
      await api.delete(`/categorias-alimentos/${categoria.id}/`);
      await fetchCategorias();
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      alert('Não foi possível excluir a categoria.');
    }
  }
};

onMounted(() => {
  fetchCategorias();
});
</script>
