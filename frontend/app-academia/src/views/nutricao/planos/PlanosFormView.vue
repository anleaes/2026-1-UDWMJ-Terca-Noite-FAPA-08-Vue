<template>
  <div>
    <form @submit.prevent="savePlano">
          <FormCard
            :title="isEditing ? 'Editar Plano Alimentar' : 'Novo Plano Alimentar'"
            :subtitle="isEditing ? 'Atualize as informações do plano.' : 'Cadastre um novo plano alimentar.'"
          >
            <div class="form-group">
              <label class="form-label">Nome</label>
              <input type="text" v-model="form.nome" class="form-input" required />
            </div>
            
            <div class="form-group">
              <label class="form-label">Descrição</label>
              <textarea v-model="form.descricao" class="form-input" rows="4" required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Aluno</label>
              <select v-model="form.aluno" class="form-select" required>
                <option value="" disabled>Selecione...</option>
                <option v-for="aluno in alunos" :key="aluno.id" :value="aluno.id">
                  {{ aluno.nome }} {{ aluno.sobrenome }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Nutricionista</label>
              <select v-model="form.nutricionista" class="form-select" required>
                <option value="" disabled>Selecione...</option>
                <option v-for="nutri in nutricionistas" :key="nutri.id" :value="nutri.id">
                  {{ nutri.nome }} {{ nutri.sobrenome }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Ativo?</label>
              <select v-model="form.esta_ativo" class="form-select" required>
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </div>

            <template #footer>
              <router-link to="/nutricao/planos" class="btn-cancel">Cancelar</router-link>
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Salvando...' : 'Salvar Plano' }}
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
const planoId = route.params.id;

const form = ref({
  nome: '',
  descricao: '',
  esta_ativo: true,
  aluno: '',
  nutricionista: ''
});

const alunos = ref<any[]>([]);
const nutricionistas = ref<any[]>([]);

onMounted(async () => {
  try {
    const [resAlunos, resNutri] = await Promise.all([
      api.get('/alunos/'),
      api.get('/nutricionistas/')
    ]);
    alunos.value = resAlunos.data;
    nutricionistas.value = resNutri.data;
  } catch (error) {
    console.error('Erro ao buscar dependências do plano', error);
  }

  if (planoId) {
    isEditing.value = true;
    try {
      const response = await api.get(`/planos-alimentares/${planoId}/`);
      form.value = {
        nome: response.data.nome,
        descricao: response.data.descricao,
        esta_ativo: response.data.esta_ativo,
        aluno: response.data.aluno,
        nutricionista: response.data.nutricionista
      };
    } catch (error) {
      console.error('Erro ao carregar dados do plano:', error);
      alert('Não foi possível carregar os dados.');
    }
  }
});

const savePlano = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/planos-alimentares/${planoId}/`, form.value);
    } else {
      await api.post('/planos-alimentares/', form.value);
    }
    router.push('/nutricao/planos');
  } catch (error: any) {
    console.error('Erro ao salvar:', error);
    alert('Erro ao salvar os dados. Verifique o console.');
  } finally {
    loading.value = false;
  }
};
</script>
