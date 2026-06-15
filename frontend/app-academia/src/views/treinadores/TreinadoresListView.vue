<template>
  <div>
    <DataTable
          title="Gestão de Treinadores"
          :columns="columns"
          :items="treinadores"
          :loading="loading"
          :searchable="true"
          @search="handleSearch"
        >
          <template #actions>
            <router-link to="/treinadores/novo" class="btn-action btn-primary">+ Novo Treinador</router-link>
          </template>

          <template #rowActions="{ item }">
            <router-link :to="`/treinadores/editar/${item.id}`" class="btn-action btn-edit">Editar</router-link>
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
const treinadores = ref<any[]>([]);
const allTreinadores = ref<any[]>([]);

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'sobrenome', label: 'Sobrenome' },
  { key: 'endereco', label: 'Endereço' },
  { key: 'telefone', label: 'Telefone' },
  { key: 'email', label: 'E-mail' },
  { key: 'registroCREF', label: 'Registro CREF' },
  { key: 'tipo_treinamento', label: 'Tipo de Treinamento' }
];

const fetchTreinadores = async () => {
  loading.value = true;
  try {
    const response = await api.get('/treinadores/');
    treinadores.value = response.data;
    allTreinadores.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar treinadores:', error);
    alert('Não foi possível carregar a lista de treinadores.');
  } finally {
    loading.value = false;
  }
};

const handleSearch = (query: string) => {
  if (!query) {
    treinadores.value = allTreinadores.value;
    return;
  }
  const q = query.toLowerCase();
  treinadores.value = allTreinadores.value.filter(treinador => 
    (treinador.nome && treinador.nome.toLowerCase().includes(q)) ||
    (treinador.sobrenome && treinador.sobrenome.toLowerCase().includes(q)) ||
    (treinador.registroCREF && treinador.registroCREF.toLowerCase().includes(q))
  );
};

const confirmDelete = async (treinador: any) => {
  if (confirm(`Tem certeza que deseja excluir o treinador ${treinador.nome}?`)) {
    try {
      await api.delete(`/treinadores/${treinador.id}/`);
      await fetchTreinadores();
    } catch (error) {
      console.error('Erro ao excluir treinador:', error);
      alert('Não foi possível excluir o treinador.');
    }
  }
};

onMounted(() => {
  fetchTreinadores();
});
</script>
