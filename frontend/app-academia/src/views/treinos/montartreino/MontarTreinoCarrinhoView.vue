<template>
  <div>
    <div class="data-table-container">
          <div class="data-table-header">
            <h2 class="table-title">🛒 Carrinho de Treino</h2>
            <div class="table-actions">
              <router-link to="/treinos/montar" class="btn-action btn-secondary">Continuar montando treino</router-link>
            </div>
          </div>

          <div v-if="Object.keys(carrinho).length === 0" class="empty-cart">
            <p>🛒 Carrinho vazio.</p>
            <router-link to="/treinos/montar" class="btn-action btn-primary" style="margin-top:15px;display:inline-block;">Adicionar exercícios</router-link>
          </div>

          <template v-else>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Dia (A-F)</th>
                    <th>Séries</th>
                    <th>Repetições</th>
                    <th>Intervalo (s)</th>
                    <th>Observação</th>
                    <th></th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, exId) in carrinho" :key="exId">
                    <td>{{ exId }}</td>
                    <td>{{ item.nome }}</td>
                    <td>
                      <select v-model="item.dia_treino" class="cart-input">
                        <option value="A">Treino A</option>
                        <option value="B">Treino B</option>
                        <option value="C">Treino C</option>
                        <option value="D">Treino D</option>
                        <option value="E">Treino E</option>
                        <option value="F">Treino F</option>
                      </select>
                    </td>
                    <td><input type="number" v-model.number="item.serie" min="1" class="cart-input cart-num" /></td>
                    <td><input type="number" v-model.number="item.repeticao" min="1" class="cart-input cart-num" /></td>
                    <td><input type="number" v-model.number="item.intervalo" min="1" class="cart-input cart-num" /></td>
                    <td><input type="text" v-model="item.observacao" class="cart-input" /></td>
                    <td><button @click="atualizarItem(exId)" class="btn-action btn-edit">Atualizar</button></td>
                    <td><button @click="removerItem(exId)" class="btn-action btn-delete">Remover</button></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="cart-footer">
              <router-link to="/treinos/montar/checkout" class="btn-action btn-primary btn-large">Finalizar Pedido</router-link>
            </div>
          </template>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const carrinho = ref<Record<string, any>>({});

const loadCarrinho = () => {
  const raw = localStorage.getItem('carrinho_treino');
  carrinho.value = raw ? JSON.parse(raw) : {};
};

const saveCarrinho = () => {
  localStorage.setItem('carrinho_treino', JSON.stringify(carrinho.value));
};

const atualizarItem = (exId: string) => {
  saveCarrinho();
  alert('Item atualizado!');
};

const removerItem = (exId: string) => {
  delete carrinho.value[exId];
  saveCarrinho();
};

onMounted(() => {
  loadCarrinho();
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
.cart-input { background-color: #2B2B2B; color: #FFF; border: 1px solid #444; padding: 8px; border-radius: 4px; font-size: 14px; }
.cart-num { width: 70px; }
.cart-footer { margin-top: 25px; text-align: right; }
.btn-large { padding: 12px 30px !important; font-size: 16px !important; }
.empty-cart { text-align: center; padding: 60px 20px; color: #999; font-size: 18px; }
.btn-secondary { background-color: transparent; color: #FFB800; border: 1px solid #FFB800; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: 500; transition: all 0.3s; }
.btn-secondary:hover { background-color: rgba(255,184,0,0.1); }
</style>
