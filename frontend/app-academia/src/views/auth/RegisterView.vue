<template>
  <div>
    <AppHeader />

    <main class="login-area">
      <div class="container">
        <div class="login-box" style="max-width: 500px;">
          <h2>Novo Usuário</h2>
          <p>Crie sua conta para acessar o sistema.</p>

          <form @submit.prevent="handleRegister">
            <div class="input-group">
              <label style="color: #CCC; font-size: 14px; margin-bottom: 5px; display: block;">Nome</label>
              <input type="text" v-model="form.first_name" placeholder="Primeiro nome" required>
            </div>
            <div class="input-group">
              <label style="color: #CCC; font-size: 14px; margin-bottom: 5px; display: block;">Sobrenome</label>
              <input type="text" v-model="form.last_name" placeholder="Sobrenome" required>
            </div>
            <div class="input-group">
              <label style="color: #CCC; font-size: 14px; margin-bottom: 5px; display: block;">Nome de usuário</label>
              <input type="text" v-model="form.username" placeholder="Nome de usuário" required>
            </div>
            <div class="input-group">
              <label style="color: #CCC; font-size: 14px; margin-bottom: 5px; display: block;">E-mail</label>
              <input type="email" v-model="form.email" placeholder="E-mail" required>
            </div>
            <div class="input-group">
              <label style="color: #CCC; font-size: 14px; margin-bottom: 5px; display: block;">Senha</label>
              <input type="password" v-model="form.password" placeholder="Senha" required>
            </div>

            <div v-if="errorMessage" style="color: red; margin-bottom: 15px; font-size: 14px; text-align: center;">
              {{ errorMessage }}
            </div>
            <div v-if="successMessage" style="color: #38ef7d; margin-bottom: 15px; font-size: 14px; text-align: center;">
              {{ successMessage }}
            </div>

            <button type="submit" class="button" :disabled="loading">
              {{ loading ? 'Salvando...' : 'Criar Conta' }}
            </button>
          </form>

          <div style="text-align: center; margin-top: 20px;">
            <router-link to="/login" style="color: #FFB800; text-decoration: none;">Já tem uma conta? Entrar</router-link>
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
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: ''
});

const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const handleRegister = async () => {
  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  try {
    await api.post('/contas/novo-usuario/', form.value);
    successMessage.value = 'Conta criada com sucesso! Redirecionando...';
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  } catch (error: any) {
    if (error.response && error.response.data) {
      const data = error.response.data;
      if (data.errors) {
        const msgs = Object.values(data.errors).flat();
        errorMessage.value = (msgs as string[]).join(' ');
      } else if (data.error) {
        errorMessage.value = data.error;
      } else {
        errorMessage.value = 'Erro ao criar conta. Tente novamente.';
      }
    } else {
      errorMessage.value = 'Erro ao criar conta. Tente novamente.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import '@/assets/css/login.css';
</style>
