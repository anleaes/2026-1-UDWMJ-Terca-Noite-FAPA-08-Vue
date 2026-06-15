<template>
  <div>
    <AppHeader :isDashboard="true" />

    <main class="dashboard-area">
      <div class="container dashboard-container">
        <aside class="user-sidebar">
          <div class="user-profile-mini">
            <div class="avatar">WL</div>
            <h3>Willian Lopes</h3>
            <p>Aluno Black Pass</p>
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
          <h2>Bem-vindo de volta, Willian! 🏋️‍♂️</h2>
          <p class="subtitle">Aqui está o resumo do seu desempenho nesta semana.</p>

          <div class="info-cards">
            <div class="card">
                <h3>Plano Atual</h3>
                <p class="highlight">Black Pass</p>
            </div>
             <div class="card">
                <h3>Frequência Mensal</h3>
                <p>12 Treinos</p>
            </div>
            <div class="card">
                <h3>Próximo Vencimento</h3>
                <p>15/07/2026</p>
            </div>
          </div>

          <div class="training-preview">
            <div class="training-header">
              <h3>Treino do Dia: Peito e Tríceps</h3>
              <a href="#" class="start-btn">Iniciar Treino</a>
            </div>
            <ul class="exercise-list">
              <li><span>Supino Reto com Barra</span> <span>4x 10-12</span></li>
              <li><span>Supino Inclinado com Halteres</span> <span>3x 12</span></li>
              <li><span>Crucifixo no Crossover</span> <span>4x 15</span></li>
              <li><span>Tríceps Testa</span> <span>3x 12</span></li>
              <li><span>Tríceps na Polia (Corda)</span> <span>4x 15</span></li>
            </ul>
          </div>
        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped>
@import '@/assets/css/dashboard.css';
</style>
