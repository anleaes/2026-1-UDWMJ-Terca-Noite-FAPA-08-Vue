<template>
  <div>
    <form @submit.prevent="saveAvaliacao">
          <FormCard
            :title="isEditing ? 'Editar Avaliação Física' : 'Nova Avaliação Física'"
            :subtitle="isEditing ? 'Atualize as métricas do aluno.' : 'Cadastre uma nova avaliação física para o aluno.'"
          >
            <div class="form-group">
              <label class="form-label">Aluno</label>
              <select v-model="form.aluno" class="form-select" required :disabled="isEditing">
                <option value="" disabled>Selecione...</option>
                <option v-for="aluno in alunos" :key="aluno.id" :value="aluno.id">
                  {{ aluno.nome }} {{ aluno.sobrenome }}
                </option>
              </select>
              <small v-if="!isEditing" style="color: #999;">Cada aluno só pode possuir 1 avaliação física vinculada simultaneamente.</small>
            </div>

            <div class="form-group">
              <label class="form-label">Número da Avaliação</label>
              <input type="text" v-model="form.numero" class="form-input" required placeholder="Ex: AV-001" />
            </div>

            <div class="form-group">
              <label class="form-label">Peso (kg)</label>
              <input type="number" step="0.1" v-model="form.peso" class="form-input" @input="calcularIMC" />
            </div>

            <div class="form-group">
              <label class="form-label">Altura (m)</label>
              <input type="number" step="0.01" v-model="form.altura" class="form-input" @input="calcularIMC" />
            </div>

            <div class="form-group">
              <label class="form-label">IMC Calculado</label>
              <input type="number" step="0.1" v-model="form.imc" class="form-input" readonly style="background-color: #2a2a2a;" />
            </div>

            <div class="form-group">
              <label class="form-label">Percentual de Gordura (%)</label>
              <input type="number" step="0.1" v-model="form.percentual_gordura" class="form-input" />
            </div>

            <div class="form-group">
              <label class="form-label">Massa Magra (kg)</label>
              <input type="number" step="0.1" v-model="form.massa_magra" class="form-input" />
            </div>

            <template #footer>
              <router-link to="/avaliacoes-fisicas" class="btn-cancel">Cancelar</router-link>
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Salvando...' : 'Salvar Avaliação' }}
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
const avaliacaoId = route.params.id;

const form = ref({
  aluno: '',
  numero: '',
  peso: null as number | null,
  altura: null as number | null,
  imc: null as number | null,
  percentual_gordura: null as number | null,
  massa_magra: null as number | null
});

const alunos = ref<any[]>([]);

onMounted(async () => {
  try {
    const resAlunos = await api.get('/alunos/');
    alunos.value = resAlunos.data;
  } catch (error) {
    console.error('Erro ao buscar alunos', error);
  }

  if (avaliacaoId) {
    isEditing.value = true;
    try {
      const response = await api.get(`/avaliacoes-fisicas/${avaliacaoId}/`);
      form.value = {
        aluno: response.data.aluno,
        numero: response.data.numero,
        peso: response.data.peso,
        altura: response.data.altura,
        imc: response.data.imc,
        percentual_gordura: response.data.percentual_gordura,
        massa_magra: response.data.massa_magra
      };
    } catch (error) {
      console.error('Erro ao carregar avaliação:', error);
      alert('Não foi possível carregar os dados.');
    }
  }
});

const calcularIMC = () => {
  if (form.value.peso && form.value.altura && form.value.altura > 0) {
    const imc = form.value.peso / (form.value.altura * form.value.altura);
    form.value.imc = parseFloat(imc.toFixed(2));
  } else {
    form.value.imc = null;
  }
};

const saveAvaliacao = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/avaliacoes-fisicas/${avaliacaoId}/`, form.value);
    } else {
      await api.post('/avaliacoes-fisicas/', form.value);
    }
    router.push('/avaliacoes-fisicas');
  } catch (error: any) {
    console.error('Erro ao salvar:', error);
    if (error.response?.data?.aluno) {
      alert('Este aluno já possui uma avaliação física cadastrada.');
    } else if (error.response?.data?.numero) {
      alert('Este número de avaliação já está em uso.');
    } else {
      alert('Erro ao salvar os dados. Verifique o console.');
    }
  } finally {
    loading.value = false;
  }
};
</script>
