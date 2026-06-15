<template>
  <div>
    <DataTable
          title="Planos Alimentares"
          :columns="columns"
          :items="planos"
          :loading="loading"
          :searchable="true"
          @search="handleSearch"
        >
          <template #actions>
            <router-link to="/nutricao/planos/novo" class="btn-action btn-primary">+ Novo Plano</router-link>
          </template>

          <template #rowActions="{ item }">
            <router-link :to="`/nutricao/planos/ver/${item.id}`" class="btn-action btn-view">Ver</router-link>
            <router-link :to="`/nutricao/planos/editar/${item.id}`" class="btn-action btn-edit">Editar</router-link>
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
const planos = ref<any[]>([]);
const allPlanos = ref<any[]>([]);

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome do Plano' },
  { key: 'aluno_nome', label: 'Aluno' },
  { key: 'nutricionista_nome', label: 'Nutricionista' },
  { key: 'esta_ativo', label: 'Status' },
  { key: 'criado_em', label: 'Data' }
];

const fetchPlanos = async () => {
  loading.value = true;
  try {
    const response = await api.get('/planos-alimentares/');
    const mapped = response.data.map((plano: any) => ({
      ...plano,
      esta_ativo: plano.esta_ativo ? 'Sim' : 'Não'
    }));
    planos.value = mapped;
    allPlanos.value = mapped;
  } catch (error) {
    console.error('Erro ao buscar planos alimentares:', error);
    alert('Não foi possível carregar a lista de planos.');
  } finally {
    loading.value = false;
  }
};

const handleSearch = (query: string) => {
  if (!query) {
    planos.value = allPlanos.value;
    return;
  }
  const q = query.toLowerCase();
  planos.value = allPlanos.value.filter(plano => 
    (plano.nome && plano.nome.toLowerCase().includes(q)) ||
    (plano.descricao && plano.descricao.toLowerCase().includes(q))
  );
};

const confirmDelete = async (plano: any) => {
  if (confirm(`Tem certeza que deseja excluir o plano ${plano.nome}?`)) {
    try {
      await api.delete(`/planos-alimentares/${plano.id}/`);
      await fetchPlanos();
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('Não foi possível excluir o plano.');
    }
  }
};

onMounted(() => {
  fetchPlanos();
});
</script>
