<template>
  <div>
    <div class="detail-card">
          <h2 class="detail-title">Finalizar Ficha de Treino</h2>

          <div v-if="Object.keys(carrinho).length === 0" class="empty-cart">
            <b>🛒 Carrinho vazio.</b>
          </div>

          <template v-else>
            <form @submit.prevent="confirmarFicha">
              <div class="form-group">
                <label class="form-label">Nome da Ficha:</label>
                <input type="text" v-model="formData.nome" class="form-input" required placeholder="Ex: Treino Hipertrofia A" />
              </div>

              <div class="form-group">
                <label class="form-label">Descrição (Opcional):</label>
                <input type="text" v-model="formData.descricao" class="form-input" />
              </div>

              <div class="form-group">
                <label class="form-label">Ficha Ativa?</label>
                <select v-model="formData.esta_ativo" class="form-select" required>
                  <option :value="true">Sim</option>
                  <option :value="false">Não</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Aluno:</label>
                <select v-model="formData.aluno" class="form-select" required>
                  <option value="" disabled>Selecione</option>
                  <option v-for="a in alunos" :key="a.id" :value="a.id">{{ a.nome }} {{ a.sobrenome }}</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Treinador:</label>
                <select v-model="formData.treinador" class="form-select" required>
                  <option value="" disabled>Selecione</option>
                  <option v-for="t in treinadores" :key="t.id" :value="t.id">{{ t.nome }} {{ t.sobrenome }}</option>
                </select>
              </div>

              <h3 class="section-subtitle">Resumo dos Exercícios</h3>

              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Dia</th>
                      <th>Exercício</th>
                      <th>Séries</th>
                      <th>Repetições</th>
                      <th>Intervalo</th>
                      <th>Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, exId) in carrinho" :key="exId">
                      <td>{{ item.dia_treino }}</td>
                      <td>{{ item.nome }}</td>
                      <td>{{ item.serie }}</td>
                      <td>{{ item.repeticao }}</td>
                      <td>{{ item.intervalo }}</td>
                      <td>{{ item.observacao || '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="cart-footer">
                <button type="submit" class="btn-submit" :disabled="loading">
                  {{ loading ? 'Salvando...' : 'Confirmar Ficha' }}
                </button>
              </div>
            </form>
          </template>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const loading = ref(false);
const carrinho = ref<Record<string, any>>({});
const alunos = ref<any[]>([]);
const treinadores = ref<any[]>([]);

const formData = ref({
  nome: '',
  descricao: '',
  esta_ativo: true,
  aluno: '',
  treinador: ''
});

onMounted(async () => {
  const raw = localStorage.getItem('carrinho_treino');
  carrinho.value = raw ? JSON.parse(raw) : {};

  try {
    const [resAlunos, resTreinadores] = await Promise.all([
      api.get('/alunos/'),
      api.get('/treinadores/')
    ]);
    alunos.value = resAlunos.data;
    treinadores.value = resTreinadores.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
});

const confirmarFicha = async () => {
  loading.value = true;
  try {
    // Build items array from cart
    const items = Object.entries(carrinho.value).map(([exercicioId, item]: [string, any]) => ({
      exercicio: parseInt(exercicioId),
      serie: item.serie,
      repeticao: item.repeticao,
      intervalo: item.intervalo,
      dia_treino: item.dia_treino,
      observacao: item.observacao || ''
    }));

    await api.post('/fichas-treinos/', {
      nome: formData.value.nome,
      descricao: formData.value.descricao,
      esta_ativo: formData.value.esta_ativo,
      aluno: formData.value.aluno,
      treinador: formData.value.treinador,
      items: items
    });

    localStorage.removeItem('carrinho_treino');
    alert('Ficha de treino criada com sucesso!');
    router.push('/treinos/fichas');
  } catch (error: any) {
    console.error('Erro ao criar ficha:', error);
    alert('Erro ao criar ficha de treino. Verifique os dados.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.detail-card { background-color: #1F1F1F; border-radius: 8px; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
.detail-title { font-family: 'Calistoga', serif; font-size: 28px; color: #FFF; margin-bottom: 30px; border-bottom: 1px solid #333; padding-bottom: 15px; }
.section-subtitle { font-family: 'Calistoga', serif; font-size: 22px; color: #FFB800; margin: 30px 0 15px; padding-bottom: 10px; border-bottom: 1px solid #333; }
.table-responsive { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { padding: 15px 20px; text-align: left; border-bottom: 1px solid #333; }
.data-table th { color: #999; font-weight: 500; text-transform: uppercase; font-size: 14px; }
.data-table td { color: #CCC; }
.data-table tbody tr:hover { background-color: #2B2B2B; }
.cart-footer { margin-top: 25px; text-align: right; }
.empty-cart { text-align: center; padding: 60px; color: #999; font-size: 18px; }
</style>
