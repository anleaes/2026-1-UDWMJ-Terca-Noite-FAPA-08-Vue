<template>
  <div>
    <div class="detail-card">
          <h2 class="detail-title">📋 Detalhes do Plano Alimentar</h2>

          <div v-if="loading" class="loading-text">Carregando...</div>

          <template v-else-if="plano">
            <div class="info-row"><span class="info-label">ID:</span> <span>{{ plano.id }}</span></div>
            <div class="info-row"><span class="info-label">Nome do Plano:</span> <span>{{ plano.nome }}</span></div>
            <div class="info-row">
              <span class="info-label">Cliente:</span>
              <span>{{ plano.aluno_nome || 'Não informado' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Nutricionista:</span>
              <span>{{ plano.nutricionista_nome || 'Não informado' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Status:</span>
              <span :class="plano.esta_ativo ? 'status-ativo' : 'status-inativo'">
                {{ plano.esta_ativo ? '✓ Ativo' : '✗ Cancelado' }}
              </span>
            </div>

            <h3 class="section-subtitle">🍽️ Refeições da Dieta</h3>

            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Refeição</th>
                    <th>Alimento</th>
                    <th>Quantidade</th>
                    <th>Kcal</th>
                    <th>Proteínas (g)</th>
                    <th>Carbos (g)</th>
                    <th>Gorduras (g)</th>
                    <th>Observação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td>{{ getRefeicaoNome(item.dia_refeicao) }}</td>
                    <td>{{ item.alimento_nome || (item.alimento && item.alimento.nome) || '-' }}</td>
                    <td>{{ item.quantidade_gramas }}g</td>
                    <td>{{ item.total_calorias || '-' }}</td>
                    <td>{{ item.total_proteinas || '-' }}</td>
                    <td>{{ item.total_carboidratos || '-' }}</td>
                    <td>{{ item.total_gorduras || '-' }}</td>
                    <td>{{ item.observacao || '-' }}</td>
                  </tr>
                  <tr v-if="items.length === 0">
                    <td colspan="8" class="text-center">Nenhum item encontrado nesta dieta.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>

          <div class="detail-actions">
            <router-link to="/nutricao/planos" class="btn-back">↩️ Voltar para a Lista</router-link>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';

const route = useRoute();
const plano = ref<any>(null);
const items = ref<any[]>([]);
const loading = ref(true);

const refeicaoMap: Record<string, string> = {
  '1': 'Desjejum',
  '2': 'Lanche da Manhã',
  '3': 'Almoço',
  '4': 'Lanche da Tarde',
  '5': 'Jantar',
  '6': 'Ceia'
};

const getRefeicaoNome = (value: string | number) => {
  return refeicaoMap[String(value)] || String(value);
};

onMounted(async () => {
  const id = route.params.id;
  try {
    const response = await api.get(`/planos-alimentares/${id}/`);
    plano.value = response.data;
    if (response.data.items) {
      items.value = response.data.items;
    } else if (response.data.itens) {
      items.value = response.data.itens;
    }
  } catch (error) {
    console.error('Erro ao carregar plano alimentar:', error);
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
.status-ativo { color: #38ef7d; font-weight: 600; }
.status-inativo { color: #ef4444; font-weight: 600; }
.section-subtitle {
  font-family: 'Calistoga', serif;
  font-size: 22px;
  color: #FFB800;
  margin: 30px 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
}
.loading-text { color: #999; text-align: center; padding: 40px; }
.table-responsive { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { padding: 15px 20px; text-align: left; border-bottom: 1px solid #333; }
.data-table th { color: #999; font-weight: 500; text-transform: uppercase; font-size: 14px; }
.data-table td { color: #CCC; }
.data-table tbody tr:hover { background-color: #2B2B2B; }
.text-center { text-align: center; color: #666; }
.detail-actions { margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; }
.btn-back {
  display: inline-block; padding: 10px 24px; background-color: #FFB800; color: #141414;
  text-decoration: none; border-radius: 5px; font-weight: 600; transition: opacity 0.3s;
}
.btn-back:hover { opacity: 0.8; }
</style>
