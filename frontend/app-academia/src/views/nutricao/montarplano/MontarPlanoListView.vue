<template>
  <div>
    <div class="data-table-container">
          <div class="data-table-header">
            <h2 class="table-title">🍽️ Lista de Alimentos Disponíveis</h2>
            <div class="table-actions">
              <router-link to="/nutricao/montar/carrinho" class="btn-action btn-primary">🛒 Ver Carrinho da Dieta ({{ carrinhoCount }})</router-link>
            </div>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Porção base</th>
                  <th>Kcal</th>
                  <th>Proteína (g)</th>
                  <th>Carbo (g)</th>
                  <th>Gordura (g)</th>
                  <th>Foto</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="11" class="text-center">Carregando...</td>
                </tr>
                <tr v-else-if="alimentos.length === 0">
                  <td colspan="11" class="text-center">Nenhum alimento encontrado.</td>
                </tr>
                <tr v-else v-for="al in alimentos" :key="al.id">
                  <td>{{ al.id }}</td>
                  <td>{{ al.nome }}</td>
                  <td>{{ al.descricao }}</td>
                  <td>{{ al.categoriaalimento_nome || al.categoriaalimento || '-' }}</td>
                  <td>{{ al.porcao_referencia_gramas }}g/ml</td>
                  <td>{{ al.calorias }}</td>
                  <td>{{ al.proteina }}</td>
                  <td>{{ al.carboidrato }}</td>
                  <td>{{ al.gordura }}</td>
                  <td>
                    <img v-if="al.foto" :src="al.foto" alt="" style="width:50px;height:50px;object-fit:cover;border-radius:4px;" />
                    <span v-else style="color:#666;">Sem foto</span>
                  </td>
                  <td>
                    <button @click="adicionarAoCarrinho(al)" class="btn-action btn-primary">➕ Adicionar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';

const loading = ref(false);
const alimentos = ref<any[]>([]);

const getCarrinho = (): Record<string, any> => {
  const raw = localStorage.getItem('carrinho_plano');
  return raw ? JSON.parse(raw) : {};
};

const saveCarrinho = (c: Record<string, any>) => {
  localStorage.setItem('carrinho_plano', JSON.stringify(c));
};

const carrinhoCount = computed(() => Object.keys(getCarrinho()).length);

const adicionarAoCarrinho = (al: any) => {
  const c = getCarrinho();
  if (c[al.id]) {
    alert('Este alimento já está no carrinho!');
    return;
  }
  c[al.id] = {
    nome: al.nome,
    refeicao: '1',
    quantidade: 100,
    observacao: ''
  };
  saveCarrinho(c);
  alert(`${al.nome} adicionado ao carrinho!`);
};

onMounted(async () => {
  loading.value = true;
  try {
    const response = await api.get('/alimentos/');
    alimentos.value = response.data.filter((a: any) => a.esta_ativo !== false);
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.data-table-container { background-color: #1F1F1F; border-radius: 8px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
.data-table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 1px solid #333; padding-bottom: 15px; }
.table-title { font-family: 'Calistoga', serif; font-size: 28px; color: #FFF; }
.table-actions { display: flex; gap: 15px; align-items: center; }
.table-responsive { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #333; }
.data-table th { color: #999; font-weight: 500; text-transform: uppercase; font-size: 13px; }
.data-table td { color: #CCC; }
.data-table tbody tr:hover { background-color: #2B2B2B; }
.text-center { text-align: center; color: #666; padding: 30px !important; }
</style>
