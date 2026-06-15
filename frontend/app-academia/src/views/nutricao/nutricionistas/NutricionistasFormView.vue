<template>
  <div>
    <form @submit.prevent="saveNutricionista">
          <FormCard
            :title="isEditing ? 'Editar Nutricionista' : 'Novo Nutricionista'"
            :subtitle="isEditing ? 'Atualize as informações do profissional.' : 'Cadastre um novo nutricionista.'"
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
              <label class="form-label">Email</label>
              <input type="email" v-model="form.email" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input type="text" v-model="form.telefone" class="form-input" />
            </div>

            <div class="form-group">
              <label class="form-label">Endereço</label>
              <input type="text" v-model="form.endereco" class="form-input" />
            </div>

            <div class="form-group">
              <label class="form-label">Registro CRN</label>
              <input type="text" v-model="form.registroCRN" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Abordagem Nutricional</label>
              <textarea v-model="form.abordagem_nutricional" class="form-input" rows="3" required></textarea>
            </div>

            <template #footer>
              <router-link to="/nutricao/nutricionistas" class="btn-cancel">Cancelar</router-link>
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Salvando...' : 'Salvar Nutricionista' }}
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
const nutriId = route.params.id;

const form = ref({
  nome: '',
  sobrenome: '',
  data_nascimento: '',
  email: '',
  telefone: '',
  endereco: '',
  registroCRN: '',
  abordagem_nutricional: ''
});

onMounted(async () => {
  if (nutriId) {
    isEditing.value = true;
    try {
      const response = await api.get(`/nutricionistas/${nutriId}/`);
      form.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Não foi possível carregar os dados.');
    }
  }
});

const saveNutricionista = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/nutricionistas/${nutriId}/`, form.value);
    } else {
      await api.post('/nutricionistas/', form.value);
    }
    router.push('/nutricao/nutricionistas');
  } catch (error: any) {
    console.error('Erro ao salvar:', error);
    alert('Erro ao salvar os dados. Verifique o console.');
  } finally {
    loading.value = false;
  }
};
</script>
