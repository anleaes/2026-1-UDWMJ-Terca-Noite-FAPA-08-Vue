<template>
  <div>
    <form @submit.prevent="saveExercicio">
          <FormCard
            :title="isEditing ? 'Editar Exercício' : 'Novo Exercício'"
            :subtitle="isEditing ? 'Atualize as informações do exercício selecionado.' : 'Preencha os dados para cadastrar um novo exercício.'"
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
              <label class="form-label">Grupo Muscular</label>
              <select v-model="form.grupomuscular" class="form-select" required>
                <option value="" disabled>Selecione...</option>
                <option v-for="grupo in gruposMusculares" :key="grupo.id" :value="grupo.id">
                  {{ grupo.nome }}
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

            <div class="form-group">
              <label class="form-label">Foto</label>
              <input type="file" @change="handleFileUpload" class="form-input" accept="image/*" />
              <small style="color: #999;">Deixe em branco se não quiser alterar a foto atual.</small>
            </div>

            <template #footer>
              <router-link to="/treinos/exercicios" class="btn-cancel">Cancelar</router-link>
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Salvando...' : 'Salvar Exercício' }}
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
const exercicioId = route.params.id;

const form = ref({
  nome: '',
  descricao: '',
  grupomuscular: '',
  esta_ativo: true,
});

const fileInfo = ref<File | null>(null);
const gruposMusculares = ref<any[]>([]);

onMounted(async () => {
  // Busca os grupos musculares para o select
  try {
    const gruposResponse = await api.get('/grupos-musculares/');
    gruposMusculares.value = gruposResponse.data;
  } catch (error) {
    console.error('Erro ao buscar grupos musculares', error);
  }

  if (exercicioId) {
    isEditing.value = true;
    try {
      const response = await api.get(`/exercicios/${exercicioId}/`);
      form.value = {
        nome: response.data.nome,
        descricao: response.data.descricao,
        grupomuscular: response.data.grupomuscular,
        esta_ativo: response.data.esta_ativo,
      };
    } catch (error) {
      console.error('Erro ao carregar dados do exercício:', error);
      alert('Não foi possível carregar os dados do exercício.');
    }
  }
});

const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    fileInfo.value = file;
  }
};

const saveExercicio = async () => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('nome', form.value.nome);
    formData.append('descricao', form.value.descricao);
    formData.append('grupomuscular', String(form.value.grupomuscular));
    formData.append('esta_ativo', String(form.value.esta_ativo));
    
    if (fileInfo.value) {
      formData.append('foto', fileInfo.value);
    }

    if (isEditing.value) {
      await api.put(`/exercicios/${exercicioId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      await api.post('/exercicios/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    router.push('/treinos/exercicios');
  } catch (error: any) {
    console.error('Erro ao salvar exercício:', error);
    alert('Erro ao salvar os dados. Verifique o console.');
  } finally {
    loading.value = false;
  }
};
</script>
