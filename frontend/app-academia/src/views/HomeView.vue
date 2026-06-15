<template>
  <div>
    <AppHeader />
    
    <section class="hero">
      <div class="container">
        <div class="leftside">
          <h1>Sua melhor versão começa aqui.💪</h1>
          <p>Uma estrutura de alta performance com equipamentos de última geração e profissionais prontos para acelerar os seus resultados.</p>
          <router-link to="/login" class="button">Começar agora</router-link>
        </div>
        <div class="rightside">
          <img src="@/assets/images/heroGym.png" alt="Treino de alta performance">
        </div>
      </div>
    </section>

    <section class="search">
      <div class="container">
        <div class="title">Encontre a sua<br /> Modalidade favorita!</div>
        <div class="sides">
          <div class="leftside">
            <input type="search" placeholder="Digite o nome da modalidade">
          </div>
          <div class="rightside">
            <select>
              <option value="">Selecionar categoria</option>
              <option value="musculacao">Musculação</option>
              <option value="cardio">Cardio / HIIT</option>
              <option value="lutas">Artes Marciais</option>
              <option value="danca">Dança / Pilates</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <main>
      <div class="container">
        <div class="products-grid">
          
          <a href="#" class="product-item">
            <div class="warning">Mais Vendido</div>
            <div class="photo">
              <img src="@/assets/images/planos/cartao-preto.png" alt="Black Pass">
            </div>
            <div class="info">
              <div class="product-category">Plano Anual</div>
              <div class="product-name">Black Pass</div>
              <div class="product-price">R$ 99,90<span style="font-size: 14px; color: #999; font-family: 'Inter';">/mês</span></div>
            </div>
          </a>

          <a href="#" class="product-item">
            <div class="photo">
              <img src="@/assets/images/planos/cartao-prata.png" alt="Smart Pass">
            </div>
            <div class="info">
              <div class="product-category">Plano Mensal</div>
              <div class="product-name">Smart Pass</div>
              <div class="product-price">R$ 129,90<span style="font-size: 14px; color: #999; font-family: 'Inter';">/mês</span></div>
            </div>
          </a>

          <a href="#" class="product-item">
            <div class="photo">
              <img src="@/assets/images/planos/cartao-dourado.png" alt="Elite VIP">
            </div>
            <div class="info">
              <div class="product-category">Combo Especial</div>
              <div class="product-name">Elite VIP</div>
              <div class="product-price">R$ 179,90<span style="font-size: 14px; color: #999; font-family: 'Inter';">/mês</span></div>
            </div>
          </a>

        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>