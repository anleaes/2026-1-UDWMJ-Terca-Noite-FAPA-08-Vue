<template>
  <div>
    <form @submit.prevent="saveAluno">
          <FormCard
            :title="isEditing ? 'Editar Aluno' : 'Novo Aluno'"
            :subtitle="isEditing ? 'Atualize as informações do aluno selecionado.' : 'Preencha os dados para cadastrar um novo aluno.'"
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
              <label class="form-label">Gênero</label>
              <select v-model="form.genero" class="form-select" required>
                <option value="" disabled>Selecione...</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Meta</label>
              <textarea v-model="form.meta" class="form-input" rows="3" required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Fichas Médicas</label>
              <select v-model="form.fichamedica" class="form-select" multiple>
                <option v-for="ficha in fichasMedicasOptions" :key="ficha.id" :value="ficha.id">
                  {{ ficha.nome }}
                </option>
              </select>
              <small style="color: #999;">Segure Ctrl (ou Cmd no Mac) para selecionar mais de uma opção.</small>
            </div>

            <template #footer>
              <router-link to="/alunos" class="btn-cancel">Cancelar</router-link>
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Salvando...' : 'Salvar Aluno' }}
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
const alunoId = route.params.id;
const fichasMedicasOptions = ref<any[]>([]);

const form = ref({
  nome: '',
  sobrenome: '',
  data_nascimento: '',
  email: '',
  telefone: '',
  endereco: '',
  genero: '',
  meta: '',
  fichamedica: []
});

onMounted(async () => {
  // Busca as opções de fichas médicas
  try {
    const fichasResponse = await api.get('/fichas-medicas/');
    fichasMedicasOptions.value = fichasResponse.data;
  } catch (error) {
    console.error('Erro ao carregar fichas médicas:', error);
  }

  if (alunoId) {
    isEditing.value = true;
    try {
      const response = await api.get(`/alunos/${alunoId}/`);
      form.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar dados do aluno:', error);
      alert('Não foi possível carregar os dados do aluno.');
    }
  }
});

const saveAluno = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/alunos/${alunoId}/`, form.value);
    } else {
      await api.post('/alunos/', form.value);
    }
    router.push('/alunos');
  } catch (error: any) {
    console.error('Erro ao salvar aluno:', error);
    alert('Erro ao salvar os dados. Verifique o console.');
  } finally {
    loading.value = false;
  }
};
</script>
