<template>
  <div>
    <form @submit.prevent="saveAlimento">
          <FormCard
            :title="isEditing ? 'Editar Alimento' : 'Novo Alimento'"
            :subtitle="isEditing ? 'Atualize as informações do alimento.' : 'Cadastre um novo alimento.'"
          >
            <div class="form-group">
              <label class="form-label">Nome</label>
              <input type="text" v-model="form.nome" class="form-input" required />
            </div>
            
            <div class="form-group">
              <label class="form-label">Descrição</label>
              <textarea v-model="form.descricao" class="form-input" rows="3" required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Categoria</label>
              <select v-model="form.categoriaalimento" class="form-select" required>
                <option value="" disabled>Selecione...</option>
                <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
                  {{ cat.nome }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Porção Referência (g)</label>
              <input type="number" step="0.1" v-model="form.porcao_referencia_gramas" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Calorias (kcal)</label>
              <input type="number" step="0.1" v-model="form.calorias" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Proteína (g)</label>
              <input type="number" step="0.1" v-model="form.proteina" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Carboidrato (g)</label>
              <input type="number" step="0.1" v-model="form.carboidrato" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Gordura (g)</label>
              <input type="number" step="0.1" v-model="form.gordura" class="form-input" required />
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
              <router-link to="/nutricao/alimentos" class="btn-cancel">Cancelar</router-link>
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Salvando...' : 'Salvar Alimento' }}
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
const alimentoId = route.params.id;

const form = ref({
  nome: '',
  descricao: '',
  porcao_referencia_gramas: 100,
  calorias: 0,
  proteina: 0,
  carboidrato: 0,
  gordura: 0,
  esta_ativo: true,
  categoriaalimento: ''
});

const fileInfo = ref<File | null>(null);
const categorias = ref<any[]>([]);

onMounted(async () => {
  try {
    const catResponse = await api.get('/categorias-alimentos/');
    categorias.value = catResponse.data;
  } catch (error) {
    console.error('Erro ao buscar categorias', error);
  }

  if (alimentoId) {
    isEditing.value = true;
    try {
      const response = await api.get(`/alimentos/${alimentoId}/`);
      form.value = {
        nome: response.data.nome,
        descricao: response.data.descricao,
        porcao_referencia_gramas: response.data.porcao_referencia_gramas,
        calorias: response.data.calorias,
        proteina: response.data.proteina,
        carboidrato: response.data.carboidrato,
        gordura: response.data.gordura,
        esta_ativo: response.data.esta_ativo,
        categoriaalimento: response.data.categoriaalimento
      };
    } catch (error) {
      console.error('Erro ao carregar dados do alimento:', error);
      alert('Não foi possível carregar os dados.');
    }
  }
});

const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    fileInfo.value = file;
  }
};

const saveAlimento = async () => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('nome', form.value.nome);
    formData.append('descricao', form.value.descricao);
    formData.append('porcao_referencia_gramas', String(form.value.porcao_referencia_gramas));
    formData.append('calorias', String(form.value.calorias));
    formData.append('proteina', String(form.value.proteina));
    formData.append('carboidrato', String(form.value.carboidrato));
    formData.append('gordura', String(form.value.gordura));
    formData.append('esta_ativo', String(form.value.esta_ativo));
    formData.append('categoriaalimento', String(form.value.categoriaalimento));
    
    if (fileInfo.value) {
      formData.append('foto', fileInfo.value);
    }

    if (isEditing.value) {
      await api.put(`/alimentos/${alimentoId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      await api.post('/alimentos/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    router.push('/nutricao/alimentos');
  } catch (error: any) {
    console.error('Erro ao salvar alimento:', error);
    alert('Erro ao salvar os dados. Verifique o console.');
  } finally {
    loading.value = false;
  }
};
</script>
