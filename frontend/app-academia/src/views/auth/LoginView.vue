<template>
  <div>
    <AppHeader />

    <main class="login-area">
      <div class="container">
        <div class="login-box">
          <h2>Acesso Restrito</h2>
          <p>Área exclusiva para administradores da Titan Gym.</p>

          <form @submit.prevent="handleLogin">
            <div class="input-group">
              <input type="text" v-model="form.usuario" placeholder="Usuário" required>
            </div>
            <div class="input-group">
              <input type="password" v-model="form.senha" placeholder="Senha" required>
            </div>

            <div v-if="errorMessage" style="color: red; margin-bottom: 15px; font-size: 14px; text-align: center;">
              {{ errorMessage }}
            </div>

            <button type="submit" class="button" :disabled="loading">
              {{ loading ? 'Entrando...' : 'Entrar no sistema' }}
            </button>
          </form>

          <div style="text-align: center; margin-top: 20px;">
            <router-link to="/registro" style="color: #FFB800; text-decoration: none;">Criar uma conta</router-link>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

const router = useRouter();

const form = ref({
  usuario: '',
  senha: ''
});

const loading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    const response = await api.post('/contas/login/', {
      usuario: form.value.usuario,
      senha: form.value.senha
    });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('username', response.data.username);
    router.push('/dashboard');
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage.value = error.response.data.error;
    } else {
      errorMessage.value = 'Erro ao fazer login. Tente novamente.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import '@/assets/css/login.css';
</style>
