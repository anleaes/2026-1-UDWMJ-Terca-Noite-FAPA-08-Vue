<template>
  <div>
    <form @submit.prevent="saveInfo">
          <FormCard
            title="👤 Alterar Informações"
            subtitle="Atualize seus dados pessoais."
          >
            <div class="form-group">
              <label class="form-label">Primeiro Nome</label>
              <input type="text" v-model="form.first_name" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Sobrenome</label>
              <input type="text" v-model="form.last_name" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input type="email" v-model="form.email" class="form-input" required />
            </div>

            <div v-if="message" :style="{ color: messageType === 'success' ? '#38ef7d' : 'red', marginTop: '10px', fontSize: '14px' }">
              {{ message }}
            </div>

            <template #footer>
              <router-link to="/dashboard" class="btn-cancel">Voltar</router-link>
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Salvando...' : '💾 Salvar' }}
              </button>
            </template>
          </FormCard>
        </form>
      </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormCard from '@/components/layout/FormCard.vue';
import api from '@/services/api';

const loading = ref(false);
const message = ref('');
const messageType = ref('');

const form = ref({
  first_name: '',
  last_name: '',
  email: ''
});

onMounted(async () => {
  const username = localStorage.getItem('username');
  if (username) {
    try {
      const response = await api.get(`/contas/alterar-usuario/${username}/`);
      if (response.data) {
        form.value.first_name = response.data.first_name || '';
        form.value.last_name = response.data.last_name || '';
        form.value.email = response.data.email || '';
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  }
});

const saveInfo = async () => {
  loading.value = true;
  message.value = '';
  const username = localStorage.getItem('username');
  try {
    await api.post(`/contas/alterar-usuario/${username}/`, form.value);
    message.value = 'Informações atualizadas com sucesso!';
    messageType.value = 'success';
  } catch (error: any) {
    message.value = 'Erro ao salvar informações.';
    messageType.value = 'error';
  } finally {
    loading.value = false;
  }
};
</script>
