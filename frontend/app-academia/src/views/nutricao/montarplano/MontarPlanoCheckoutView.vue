<template>
  <div>
    <div class="detail-card">
          <h2 class="detail-title">📋 Finalizar Plano Alimentar</h2>

          <div v-if="Object.keys(carrinho).length === 0" class="empty-cart">
            <b>🛒 Carrinho vazio.</b>
          </div>

          <template v-else>
            <form @submit.prevent="confirmarPlano">
              <div class="form-group">
                <label class="form-label">Nome do Plano:</label>
                <input type="text" v-model="formData.nome" class="form-input" required placeholder="Ex: Dieta Bulking" />
              </div>

              <div class="form-group">
                <label class="form-label">Descrição (Opcional):</label>
                <input type="text" v-model="formData.descricao" class="form-input" placeholder="Descrição do plano alimentar" />
              </div>

              <div class="form-group">
                <label class="form-label">Plano Ativo?</label>
                <select v-model="formData.esta_ativo" class="form-select" required>
                  <option :value="true">Sim</option>
                  <option :value="false">Não</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Aluno:</label>
                <select v-model="formData.aluno" class="form-select" required>
                  <option value="" disabled>Selecione o Aluno</option>
                  <option v-for="a in alunos" :key="a.id" :value="a.id">{{ a.nome }} {{ a.sobrenome }}</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Nutricionista:</label>
                <select v-model="formData.nutricionista" class="form-select" required>
                  <option value="" disabled>Selecione o Nutricionista</option>
                  <option v-for="n in nutricionistas" :key="n.id" :value="n.id">{{ n.nome }} {{ n.sobrenome }}</option>
                </select>
              </div>

              <h3 class="section-subtitle">Resumo dos Alimentos</h3>

              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Cód. Refeição</th>
                      <th>Alimento</th>
                      <th>Quantidade (g)</th>
                      <th>Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, alId) in carrinho" :key="alId">
                      <td>{{ refeicaoMap[item.refeicao] || item.refeicao }}</td>
                      <td>{{ item.nome }}</td>
                      <td>{{ item.quantidade }}g</td>
                      <td>{{ item.observacao || '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="cart-footer">
                <button type="submit" class="btn-submit" :disabled="loading">
                  {{ loading ? 'Salvando...' : '✅ Confirmar Dieta' }}
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
const nutricionistas = ref<any[]>([]);

const refeicaoMap: Record<string, string> = {
  '1': 'Desjejum', '2': 'Lanche da Manhã', '3': 'Almoço',
  '4': 'Lanche da Tarde', '5': 'Jantar', '6': 'Ceia'
};

const formData = ref({
  nome: '',
  descricao: '',
  esta_ativo: true,
  aluno: '',
  nutricionista: ''
});

onMounted(async () => {
  const raw = localStorage.getItem('carrinho_plano');
  carrinho.value = raw ? JSON.parse(raw) : {};

  try {
    const [resAlunos, resNutri] = await Promise.all([
      api.get('/alunos/'),
      api.get('/nutricionistas/')
    ]);
    alunos.value = resAlunos.data;
    nutricionistas.value = resNutri.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
});

const confirmarPlano = async () => {
  loading.value = true;
  try {
    const items = Object.entries(carrinho.value).map(([alimentoId, item]: [string, any]) => ({
      alimento: parseInt(alimentoId),
      dia_refeicao: item.refeicao,
      quantidade_gramas: item.quantidade,
      observacao: item.observacao || ''
    }));

    await api.post('/planos-alimentares/', {
      nome: formData.value.nome,
      descricao: formData.value.descricao,
      esta_ativo: formData.value.esta_ativo,
      aluno: formData.value.aluno,
      nutricionista: formData.value.nutricionista,
      items: items
    });

    localStorage.removeItem('carrinho_plano');
    alert('Plano alimentar criado com sucesso!');
    router.push('/nutricao/planos');
  } catch (error: any) {
    console.error('Erro ao criar plano:', error);
    alert('Erro ao criar plano alimentar. Verifique os dados.');
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
