<template>
  <div>
    <div class="detail-card">
          <h2 class="detail-title">Detalhes do Aluno</h2>

          <div v-if="loading" class="loading-text">Carregando...</div>

          <template v-else-if="aluno">
            <div class="info-row"><span class="info-label">ID:</span> <span>{{ aluno.id }}</span></div>
            <div class="info-row"><span class="info-label">Nome Completo:</span> <span>{{ aluno.nome }} {{ aluno.sobrenome }}</span></div>
            <div class="info-row"><span class="info-label">Data de Nascimento:</span> <span>{{ aluno.data_nascimento }}</span></div>
            <div class="info-row"><span class="info-label">Endereço:</span> <span>{{ aluno.endereco }}</span></div>
            <div class="info-row"><span class="info-label">Telefone:</span> <span>{{ aluno.telefone }}</span></div>
            <div class="info-row"><span class="info-label">E-mail:</span> <span>{{ aluno.email }}</span></div>
            <div class="info-row"><span class="info-label">Gênero:</span> <span>{{ aluno.genero }}</span></div>
            <div class="info-row"><span class="info-label">Meta:</span> <span>{{ aluno.meta }}</span></div>

            <!-- Avaliação Física -->
            <div class="info-row" v-if="aluno.avaliacaofisica">
              <span class="info-label">Avaliação Física:</span>
              <span>
                Nº {{ aluno.avaliacaofisica.numero }} — 
                Peso: {{ aluno.avaliacaofisica.peso || 'N/I' }}kg | 
                Altura: {{ aluno.avaliacaofisica.altura || 'N/I' }}m | 
                % Gordura: {{ aluno.avaliacaofisica.percentual_gordura || 'N/I' }}% | 
                Massa Magra: {{ aluno.avaliacaofisica.massa_magra || 'N/I' }}kg |
                IMC: {{ aluno.avaliacaofisica.calcular_imc || 'N/C' }}
              </span>
            </div>
            <div class="info-row" v-else>
              <span class="info-label">Avaliação Física:</span> <span class="no-data">Não gerada</span>
            </div>

            <!-- Fichas Médicas -->
            <div class="info-row">
              <span class="info-label">Fichas Médicas:</span>
              <template v-if="aluno.fichamedica && aluno.fichamedica.length > 0">
                <ul class="ficha-list">
                  <li v-for="ficha in aluno.fichamedica" :key="ficha.id || ficha">
                    {{ typeof ficha === 'object' ? ficha.nome : ficha }}
                  </li>
                </ul>
              </template>
              <span v-else class="no-data">Nenhuma registrada</span>
            </div>
          </template>

          <div class="detail-actions">
            <router-link to="/alunos" class="btn-back">↩️ Voltar para a Lista</router-link>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';

const route = useRoute();
const aluno = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
  const id = route.params.id;
  try {
    const response = await api.get(`/alunos/${id}/`);
    aluno.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar aluno:', error);
    alert('Não foi possível carregar os detalhes do aluno.');
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.detail-card {
  background-color: #1F1F1F;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: 0 auto;
}
.detail-title {
  font-family: 'Calistoga', serif;
  font-size: 28px;
  color: #FFF;
  margin-bottom: 30px;
  border-bottom: 1px solid #333;
  padding-bottom: 15px;
}
.info-row {
  padding: 12px 0;
  border-bottom: 1px solid #2B2B2B;
  color: #CCC;
}
.info-label {
  display: inline-block;
  min-width: 180px;
  color: #FFB800;
  font-weight: 600;
}
.no-data {
  color: #666;
  font-style: italic;
}
.loading-text {
  color: #999;
  text-align: center;
  padding: 40px;
}
.ficha-list {
  list-style: disc;
  padding-left: 20px;
  margin: 5px 0 0 0;
  display: inline-block;
}
.ficha-list li {
  margin: 3px 0;
}
.detail-actions {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #333;
}
.btn-back {
  display: inline-block;
  padding: 10px 24px;
  background-color: #FFB800;
  color: #141414;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: opacity 0.3s;
}
.btn-back:hover {
  opacity: 0.8;
}
</style>
