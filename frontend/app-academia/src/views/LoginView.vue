<template>
  <div>
    <AppHeader />

    <main class="login-area">
      <div class="container">
        <div class="login-box">
          <h2>{{ isRegistering ? 'Matricule-se' : 'Acesse sua conta' }}</h2>
          <p>{{ isRegistering ? 'Preencha os dados abaixo.' : 'Entre com seus dados para acessar seus treinos.' }}</p>

          <form v-if="!isRegistering" @submit.prevent="handleLogin">
            <div class="input-group">
              <input type="text" v-model="loginForm.usuario" placeholder="Usuário" required>
            </div>
            <div class="input-group">
              <input type="password" v-model="loginForm.senha" placeholder="Senha" required>
            </div>

            <div v-if="errorMessage" style="color: red; margin-bottom: 15px; font-size: 14px; text-align: center;">
              {{ errorMessage }}
            </div>

            <div class="options">
              <label><input type="checkbox"> Lembrar de mim</label>
              <a href="#">Esqueceu a senha?</a>
            </div>

            <button type="submit" class="button" :disabled="loading">
              {{ loading ? 'Entrando...' : 'Entrar no sistema' }}
            </button>
          </form>

          <form v-else @submit.prevent="handleRegister">
            <div class="input-group">
              <input type="text" v-model="registerForm.first_name" placeholder="Nome" required>
            </div>
            <div class="input-group">
              <input type="text" v-model="registerForm.last_name" placeholder="Sobrenome" required>
            </div>
            <div class="input-group">
              <input type="text" v-model="registerForm.username" placeholder="Nome de Usuário" required>
            </div>
            <div class="input-group">
              <input type="email" v-model="registerForm.email" placeholder="E-mail" required>
            </div>
            <div class="input-group">
              <input type="password" v-model="registerForm.password" placeholder="Senha" required>
            </div>

            <div v-if="errorMessage" style="color: red; margin-bottom: 15px; font-size: 14px; text-align: center;">
              {{ errorMessage }}
            </div>
            <div v-if="successMessage" style="color: green; margin-bottom: 15px; font-size: 14px; text-align: center;">
              {{ successMessage }}
            </div>

            <button type="submit" class="button" :disabled="loading">
              {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
            </button>
          </form>

          <div class="register-link">
            <a href="#" @click.prevent="toggleMode">
              {{ isRegistering ? 'Já tem uma conta? Faça login' : 'Ainda não é aluno? Matricule-se agora' }}
            </a>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const router = useRouter()
const route = useRoute()

const isRegistering = ref(route.query.register === 'true')

watch(() => route.query.register, (newVal) => {
  isRegistering.value = newVal === 'true'
  errorMessage.value = ''
  successMessage.value = ''
})

const loginForm = ref({
  usuario: '',
  senha: ''
});

const registerForm = ref({
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: ''
});

const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const toggleMode = () => {
  isRegistering.value = !isRegistering.value
  errorMessage.value = ''
  successMessage.value = ''
}

const handleLogin = async () => {
  loading.value = true;
  
  // Simulando login: removido a requisição para o backend
  setTimeout(() => {
    localStorage.setItem('access_token', 'dev-bypass-token');
    router.push('/dashboard');
    loading.value = false;
  }, 500);
}

const handleRegister = async () => {
  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
    const response = await api.post('/contas/novo-usuario/', registerForm.value);
    successMessage.value = 'Cadastro realizado com sucesso! Faça login.';
    isRegistering.value = false; // Volta para a tela de login
  } catch (error: any) {
    console.error('Erro no cadastro:', error);
    if (error.response?.data?.errors) {
       errorMessage.value = 'Preencha os dados corretamente: ' + JSON.stringify(error.response.data.errors);
    } else {
       errorMessage.value = 'Erro ao cadastrar. Verifique os dados.';
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
@import '@/assets/css/login.css';
</style>