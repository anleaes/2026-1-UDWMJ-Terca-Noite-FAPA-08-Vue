<template>
  <div>
    <form @submit.prevent="saveGrupo">
          <FormCard
            :title="isEditing ? 'Editar Grupo Muscular' : 'Novo Grupo Muscular'"
            :subtitle="isEditing ? 'Atualize as informações do grupo selecionado.' : 'Preencha os dados para cadastrar um novo grupo muscular.'"
          >
            <div class="form-group">
              <label class="form-label">Nome</label>
              <input type="text" v-model="form.nome" class="form-input" required />
            </div>
            
            <div class="form-group">
              <label class="form-label">Descrição</label>
              <textarea v-model="form.descricao" class="form-input" rows="4" required></textarea>
            </div>

            <template #footer>
              <router-link to="/treinos/grupos-musculares" class="btn-cancel">Cancelar</router-link>
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Salvando...' : 'Salvar Grupo' }}
              </button>
            </template>
          </FormCard>
        </form>
      </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormCard from '@/components/layout/FormCard.vue';
import api from '@/services/api';

const route = useRoute();
const router = useRouter();

const isEditing = ref(false);
const loading = ref(false);
const grupoId = route.params.id;

const form = ref({
  nome: '',
  descricao: ''
});

onMounted(async () => {
  if (grupoId) {
    isEditing.value = true;
    try {
      const response = await api.get(`/grupos-musculares/${grupoId}/`);
      form.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar dados do grupo:', error);
      alert('Não foi possível carregar os dados do grupo muscular.');
    }
  }
});

const saveGrupo = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/grupos-musculares/${grupoId}/`, form.value);
    } else {
      await api.post('/grupos-musculares/', form.value);
    }
    router.push('/treinos/grupos-musculares');
  } catch (error: any) {
    console.error('Erro ao salvar grupo muscular:', error);
    alert('Erro ao salvar os dados. Verifique o console.');
  } finally {
    loading.value = false;
  }
};
</script>
