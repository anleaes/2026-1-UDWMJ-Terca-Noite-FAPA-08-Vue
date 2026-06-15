<template>
  <div>
    <form @submit.prevent="saveSenha">
          <FormCard
            title="🔒 Alterar Senha"
            subtitle="Informe sua senha atual e a nova senha desejada."
          >
            <div class="form-group">
              <label class="form-label">Senha Anterior</label>
              <input type="password" v-model="form.old_password" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Nova Senha</label>
              <input type="password" v-model="form.new_password1" class="form-input" required />
            </div>

            <div class="form-group">
              <label class="form-label">Confirmar Nova Senha</label>
              <input type="password" v-model="form.new_password2" class="form-input" required />
            </div>

            <div v-if="message" :style="{ color: messageType === 'success' ? '#38ef7d' : 'red', marginTop: '10px', fontSize: '14px' }">
              {{ message }}
            </div>

            <template #footer>
              <router-link to="/dashboard" class="btn-cancel">Voltar</router-link>
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Atualizando...' : '🔑 Atualizar' }}
              </button>
            </template>
          </FormCard>
        </form>
      </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormCard from '@/components/layout/FormCard.vue';
import api from '@/services/api';

const loading = ref(false);
const message = ref('');
const messageType = ref('');

const form = ref({
  old_password: '',
  new_password1: '',
  new_password2: ''
});

const saveSenha = async () => {
  if (form.value.new_password1 !== form.value.new_password2) {
    message.value = 'As senhas não coincidem.';
    messageType.value = 'error';
    return;
  }
  loading.value = true;
  message.value = '';
  try {
    await api.post('/contas/alterar-senha/', form.value);
    message.value = 'Senha alterada com sucesso!';
    messageType.value = 'success';
    form.value = { old_password: '', new_password1: '', new_password2: '' };
  } catch (error: any) {
    message.value = 'Erro ao alterar senha. Verifique os dados informados.';
    messageType.value = 'error';
  } finally {
    loading.value = false;
  }
};
</script>
