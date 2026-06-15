<template>
  <div>
    <div class="data-table-container">
          <div class="data-table-header">
            <h2 class="table-title">Lista de Exercícios</h2>
            <div class="table-actions">
              <router-link to="/treinos/montar/carrinho" class="btn-action btn-primary">🛒 Ver Carrinho ({{ carrinhoCount }})</router-link>
            </div>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Grupo Muscular</th>
                  <th>Foto</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="6" class="text-center">Carregando...</td>
                </tr>
                <tr v-else-if="exercicios.length === 0">
                  <td colspan="6" class="text-center">Nenhum exercício encontrado.</td>
                </tr>
                <tr v-else v-for="ex in exercicios" :key="ex.id">
                  <td>{{ ex.id }}</td>
                  <td>{{ ex.nome }}</td>
                  <td>{{ ex.descricao }}</td>
                  <td>{{ ex.grupomuscular_nome || ex.grupomuscular || '-' }}</td>
                  <td>
                    <img v-if="ex.foto" :src="ex.foto" alt="" style="width:50px;height:50px;object-fit:cover;border-radius:4px;" />
                    <span v-else style="color:#666;">Sem foto</span>
                  </td>
                  <td>
                    <button @click="adicionarAoCarrinho(ex)" class="btn-action btn-primary">➕ Adicionar</button>
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
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const loading = ref(false);
const exercicios = ref<any[]>([]);

// Carrinho em localStorage
const getCarrinho = (): Record<string, any> => {
  const raw = localStorage.getItem('carrinho_treino');
  return raw ? JSON.parse(raw) : {};
};

const saveCarrinho = (c: Record<string, any>) => {
  localStorage.setItem('carrinho_treino', JSON.stringify(c));
};

const carrinhoCount = computed(() => Object.keys(getCarrinho()).length);

const adicionarAoCarrinho = (ex: any) => {
  const c = getCarrinho();
  if (c[ex.id]) {
    alert('Este exercício já está no carrinho!');
    return;
  }
  c[ex.id] = {
    nome: ex.nome,
    dia_treino: 'A',
    serie: 3,
    repeticao: 12,
    intervalo: 60,
    observacao: ''
  };
  saveCarrinho(c);
  alert(`${ex.nome} adicionado ao carrinho!`);
};

onMounted(async () => {
  loading.value = true;
  try {
    const response = await api.get('/exercicios/');
    exercicios.value = response.data.filter((e: any) => e.esta_ativo !== false);
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
.data-table th, .data-table td { padding: 15px 20px; text-align: left; border-bottom: 1px solid #333; }
.data-table th { color: #999; font-weight: 500; text-transform: uppercase; font-size: 14px; }
.data-table td { color: #CCC; }
.data-table tbody tr:hover { background-color: #2B2B2B; }
.text-center { text-align: center; color: #666; padding: 30px !important; }
</style>
