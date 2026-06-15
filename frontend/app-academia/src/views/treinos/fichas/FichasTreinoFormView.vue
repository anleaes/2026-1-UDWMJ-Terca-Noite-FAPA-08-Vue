<template>
  <div>
    <form @submit.prevent="saveFicha">
          <FormCard
            :title="isEditing ? 'Editar Ficha de Treino' : 'Nova Ficha de Treino'"
            :subtitle="isEditing ? 'Atualize as informações da ficha selecionada.' : 'Preencha os dados para cadastrar uma nova ficha.'"
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
              <label class="form-label">Treinador</label>
              <select v-model="form.treinador" class="form-select" required>
                <option value="" disabled>Selecione...</option>
                <option v-for="treinador in treinadores" :key="treinador.id" :value="treinador.id">
                  {{ treinador.nome }} {{ treinador.sobrenome }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Ativa?</label>
              <select v-model="form.esta_ativo" class="form-select" required>
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </div>

            <template #footer>
              <router-link to="/treinos/fichas" class="btn-cancel">Cancelar</router-link>
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
  descricao: '',
  esta_ativo: true,
  aluno: '',
  treinador: ''
});

const alunos = ref<any[]>([]);
const treinadores = ref<any[]>([]);

onMounted(async () => {
  // Busca alunos e treinadores para os selects
  try {
    const [resAlunos, resTreinadores] = await Promise.all([
      api.get('/alunos/'),
      api.get('/treinadores/')
    ]);
    alunos.value = resAlunos.data;
    treinadores.value = resTreinadores.data;
  } catch (error) {
    console.error('Erro ao buscar dependências da ficha', error);
  }

  if (fichaId) {
    isEditing.value = true;
    try {
      const response = await api.get(`/fichas-treinos/${fichaId}/`);
      form.value = {
        nome: response.data.nome,
        descricao: response.data.descricao,
        esta_ativo: response.data.esta_ativo,
        aluno: response.data.aluno,
        treinador: response.data.treinador
      };
    } catch (error) {
      console.error('Erro ao carregar dados da ficha:', error);
      alert('Não foi possível carregar os dados da ficha de treino.');
    }
  }
});

const saveFicha = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/fichas-treinos/${fichaId}/`, form.value);
    } else {
      await api.post('/fichas-treinos/', form.value);
    }
    router.push('/treinos/fichas');
  } catch (error: any) {
    console.error('Erro ao salvar ficha:', error);
    alert('Erro ao salvar os dados. Verifique o console.');
  } finally {
    loading.value = false;
  }
};
</script>
