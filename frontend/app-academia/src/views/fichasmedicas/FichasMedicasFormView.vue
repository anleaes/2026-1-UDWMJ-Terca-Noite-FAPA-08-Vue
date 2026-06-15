<template>
  <div>
    <form @submit.prevent="saveFicha">
          <FormCard
            :title="isEditing ? 'Editar Ficha Médica' : 'Nova Ficha Médica'"
            :subtitle="isEditing ? 'Atualize as informações da ficha selecionada.' : 'Preencha os dados para cadastrar uma nova ficha médica.'"
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
              <router-link to="/fichas-medicas" class="btn-cancel">Cancelar</router-link>
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Salvando...' : 'Salvar Ficha' }}
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
const fichaId = route.params.id;

const form = ref({
  nome: '',
  descricao: ''
});

onMounted(async () => {
  if (fichaId) {
    isEditing.value = true;
    try {
      const response = await api.get(`/fichas-medicas/${fichaId}/`);
      form.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar dados da ficha:', error);
      alert('Não foi possível carregar os dados da ficha médica.');
    }
  }
});

const saveFicha = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/fichas-medicas/${fichaId}/`, form.value);
    } else {
      await api.post('/fichas-medicas/', form.value);
    }
    router.push('/fichas-medicas');
  } catch (error: any) {
    console.error('Erro ao salvar ficha:', error);
    alert('Erro ao salvar os dados. Verifique o console.');
  } finally {
    loading.value = false;
  }
};
</script>
