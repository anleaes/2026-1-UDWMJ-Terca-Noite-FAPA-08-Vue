<template>
  <div>
    <div class="detail-card">
          <h2 class="detail-title">Detalhes da Ficha de Treino</h2>

          <div v-if="loading" class="loading-text">Carregando...</div>

          <template v-else-if="ficha">
            <div class="info-row"><span class="info-label">ID:</span> <span>{{ ficha.id }}</span></div>
            <div class="info-row"><span class="info-label">Nome:</span> <span>{{ ficha.nome }}</span></div>
            <div class="info-row">
              <span class="info-label">Cliente:</span>
              <span>{{ ficha.aluno_nome || 'Não informado' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Treinador:</span>
              <span>{{ ficha.treinador_nome || 'Não informado' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Status:</span>
              <span :class="ficha.esta_ativo ? 'status-ativo' : 'status-inativo'">
                {{ ficha.esta_ativo ? '✓ Ativo' : '✗ Inativo' }}
              </span>
            </div>

            <h3 class="section-subtitle">Itens da Ficha de Treino</h3>

            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Exercício</th>
                    <th>Séries</th>
                    <th>Repetições</th>
                    <th>Intervalo</th>
                    <th>Dia Treino</th>
                    <th>Observação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td>{{ item.exercicio_nome || (item.exercicio && item.exercicio.nome) || '-' }}</td>
                    <td>{{ item.serie }}</td>
                    <td>{{ item.repeticao }}</td>
                    <td>{{ item.intervalo }}</td>
                    <td>{{ item.dia_treino }}</td>
                    <td>{{ item.observacao || '-' }}</td>
                  </tr>
                  <tr v-if="items.length === 0">
                    <td colspan="6" class="text-center">Nenhum item encontrado.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>

          <div class="detail-actions">
            <router-link to="/treinos/fichas" class="btn-back">↩️ Voltar</router-link>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';

const route = useRoute();
const ficha = ref<any>(null);
const items = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  const id = route.params.id;
  try {
    const response = await api.get(`/fichas-treinos/${id}/`);
    ficha.value = response.data;
    // Items may come nested in the ficha response or in a separate endpoint
    if (response.data.items) {
      items.value = response.data.items;
    } else if (response.data.itens) {
      items.value = response.data.itens;
    }
  } catch (error) {
    console.error('Erro ao carregar ficha de treino:', error);
    alert('Não foi possível carregar os detalhes.');
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
  min-width: 160px;
  color: #FFB800;
  font-weight: 600;
}
.status-ativo {
  color: #38ef7d;
  font-weight: 600;
}
.status-inativo {
  color: #ef4444;
  font-weight: 600;
}
.section-subtitle {
  font-family: 'Calistoga', serif;
  font-size: 22px;
  color: #FFB800;
  margin: 30px 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
}
.loading-text {
  color: #999;
  text-align: center;
  padding: 40px;
}
.table-responsive {
  overflow-x: auto;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th, .data-table td {
  padding: 15px 20px;
  text-align: left;
  border-bottom: 1px solid #333;
}
.data-table th {
  color: #999;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 14px;
}
.data-table td {
  color: #CCC;
}
.data-table tbody tr:hover {
  background-color: #2B2B2B;
}
.text-center {
  text-align: center;
  color: #666;
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
