<template>
  <div>
    <AppHeader :isDashboard="true" />

    <main class="dashboard-area">
      <div class="container dashboard-container">
        <aside class="user-sidebar">
          <div class="user-profile-mini">
            <div class="avatar">{{ avatar }}</div>

            <h3>{{ username }}</h3>

            <p>Aluno Black Pass</p>

            <button
              @click="logout"
              style="
                margin-top: 10px;
                width: 100%;
                padding: 8px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
              "
            >
              Sair
            </button>
          </div>

          <nav class="user-menu">
            <ul>
              <li><router-link to="/dashboard" exact-active-class="active">Meu Painel</router-link></li>
              <li><router-link to="/alunos" active-class="active">Alunos</router-link></li>
              <li><router-link to="/treinadores" active-class="active">Treinadores</router-link></li>
              <li><router-link to="/fichas-medicas" active-class="active">Fichas Médicas</router-link></li>
              <li><router-link to="/treinos/grupos-musculares" active-class="active">Grupos Musculares</router-link></li>
              <li><router-link to="/treinos/exercicios" active-class="active">Exercícios</router-link></li>
              <li><router-link to="/treinos/fichas" active-class="active">Fichas de Treino</router-link></li>
              <li><router-link to="/treinos/montar" active-class="active">Montar Treinos</router-link></li>
              <li><router-link to="/nutricao/categorias" active-class="active">Cat. Alimentos</router-link></li>
              <li><router-link to="/nutricao/alimentos" active-class="active">Alimentos</router-link></li>
              <li><router-link to="/nutricao/nutricionistas" active-class="active">Nutricionistas</router-link></li>
              <li><router-link to="/nutricao/planos" active-class="active">Planos Alimentares</router-link></li>
              <li><router-link to="/nutricao/montar" active-class="active">Montar Plano Alimentar</router-link></li>
              <li><router-link to="/avaliacoes-fisicas" active-class="active">Avaliações Físicas</router-link></li>
              <li><router-link to="/conta/alterar-info" active-class="active">Minha Conta</router-link></li>
              <li><router-link to="/conta/alterar-senha" active-class="active">Alterar Senha</router-link></li>
            </ul>
          </nav>
        </aside>

        <section class="dashboard-content">
          <h2>
            Bem-vindo de volta, {{ username }}! 🏋️‍♂️
          </h2>

          <div class="dashboard-summary">
            <h3>Seus Treinos</h3>
            <p>
              Confira abaixo todas as suas fichas de treino registradas.
            </p>
          </div>

          <div class="training-preview" v-for="treino in treinos" :key="treino.id">
            <div class="training-header">
              <div>
                <span class="training-tag">
                  FICHA DE TREINO
                </span>

                <h3>{{ treino.nome }}</h3>

                <p v-if="treino.descricao">
                  {{ treino.descricao }}
                </p>
              </div>

              <router-link
                to="/treinos/fichas"
                class="start-btn"
              >
                Visualizar Treino
              </router-link>
            </div>
          </div>

          <div v-if="treinos.length === 0" style="text-align: center; padding: 30px; color: #888;">
            <p>Nenhum treino registrado até o momento.</p>
          </div>
        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const router = useRouter()

const username = localStorage.getItem('username') || 'Usuário'

const avatar = computed(() => {
  return username.charAt(0).toUpperCase()
})

const treinos = ref<any[]>([])

const carregarTreinos = async () => {
  try {
    // Usando o serviço 'api' centralizado que já deve lidar com a BaseURL e Token
    const response = await api.get('/fichas-treinos/')

    const dados = Array.isArray(response.data)
      ? response.data
      : response.data.results || []

    treinos.value = dados

  } catch (error) {
    console.error('Erro ao carregar treinos:', error)
  }
}

onMounted(() => {
  carregarTreinos()
})

const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<style scoped>
@import '@/assets/css/dashboard.css';
</style>
