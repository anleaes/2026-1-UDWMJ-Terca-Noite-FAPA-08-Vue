<template>
  <div>
    <form @submit.prevent="saveTreinador">
          <FormCard
            :title="isEditing ? 'Editar Treinador' : 'Novo Treinador'"
            :subtitle="isEditing ? 'Atualize as informações do treinador selecionado.' : 'Preencha os dados para cadastrar um novo treinador.'"
          >
            <div class="form-group">
              <label class="form-label">Nome</label>
              <input type="text" v-model="form.nome" class="form-input" required />
            </div>
            
            <div class="form-group">
              <label class="form-label">Sobrenome</label>
              <input type="text" v-model="form.sobrenome" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Data de Nascimento</label>
              <input type="date" v-model="form.data_nascimento" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input type="email" v-model="form.email" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input type="text" v-model="form.telefone" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Endereço</label>
              <input type="text" v-model="form.endereco" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Registro CREF</label>
              <input type="text" v-model="form.registroCREF" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Tipo de Treinamento (Especialidade)</label>
              <input type="text" v-model="form.tipo_treinamento" class="form-input" required />
            </div>

            <template #footer>
              <router-link to="/treinadores" class="btn-cancel">Cancelar</router-link>
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Salvando...' : 'Salvar Treinador' }}
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
const treinadorId = route.params.id;

const form = ref({
  nome: '',
  sobrenome: '',
  data_nascimento: '',
  email: '',
  telefone: '',
  endereco: '',
  registroCREF: '',
  tipo_treinamento: ''
});

onMounted(async () => {
  if (treinadorId) {
    isEditing.value = true;
    try {
      const response = await api.get(`/treinadores/${treinadorId}/`);
      form.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar dados do treinador:', error);
      alert('Não foi possível carregar os dados do treinador.');
    }
  }
});

const saveTreinador = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/treinadores/${treinadorId}/`, form.value);
    } else {
      await api.post('/treinadores/', form.value);
    }
    router.push('/treinadores');
  } catch (error: any) {
    console.error('Erro ao salvar treinador:', error);
    alert('Erro ao salvar os dados. Verifique o console.');
  } finally {
    loading.value = false;
  }
};
</script>
