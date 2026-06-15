<template>
  <div>
    <form @submit.prevent="saveCategoria">
          <FormCard
            :title="isEditing ? 'Editar Categoria' : 'Nova Categoria'"
            :subtitle="isEditing ? 'Atualize as informações da categoria.' : 'Preencha os dados para cadastrar uma nova categoria de alimento.'"
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
              <router-link to="/nutricao/categorias" class="btn-cancel">Cancelar</router-link>
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Salvando...' : 'Salvar Categoria' }}
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
const categoriaId = route.params.id;

const form = ref({
  nome: '',
  descricao: ''
});

onMounted(async () => {
  if (categoriaId) {
    isEditing.value = true;
    try {
      const response = await api.get(`/categorias-alimentos/${categoriaId}/`);
      form.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar categoria:', error);
      alert('Não foi possível carregar os dados.');
    }
  }
});

const saveCategoria = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/categorias-alimentos/${categoriaId}/`, form.value);
    } else {
      await api.post('/categorias-alimentos/', form.value);
    }
    router.push('/nutricao/categorias');
  } catch (error: any) {
    console.error('Erro ao salvar:', error);
    alert('Erro ao salvar os dados. Verifique o console.');
  } finally {
    loading.value = false;
  }
};
</script>
