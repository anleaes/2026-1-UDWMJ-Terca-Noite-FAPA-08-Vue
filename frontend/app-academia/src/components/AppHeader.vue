<template>
  <header>
    <div class="container">
      <div class="logo">
        <router-link to="/">Iron <span>•</span> House</router-link>
      </div>
      <nav v-if="isDashboard" class="navbar">
        <ul class="leftside">
          <li><router-link to="/dashboard" exact-active-class="active">Meu Painel</router-link></li>
        </ul>
        
        <div class="rightside">
          <button @click="handleLogout" class="button btn-logout">Sair</button>
        </div>
      </nav>

      <nav v-else class="navbar navbar-home">
        <ul class="leftside">
          <li><router-link to="/">Início</router-link></li>
          <li><router-link to="/">Planos</router-link></li>
          <li><router-link to="/">Contato</router-link></li>
        </ul>
        
        <div class="rightside">
          <router-link to="/login" class="button btn-admin">Login</router-link>
        </div>
      </nav>

      <div class="menu">
        <div class="menu-icon">
          <div></div><div></div><div></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

defineProps({
  isDashboard: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();

const handleLogout = () => {
  if (confirm('Tem certeza que deseja sair?')) {
    localStorage.removeItem('access_token');
    router.push('/login');
  }
};
</script>

<style scoped>
.btn-logout {
  background-color: transparent;
  color: #ff4d4d;
  border: 1px solid #ff4d4d;
  padding: 8px 16px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background-color: #ff4d4d;
  color: #fff;
}

.btn-outline {
  background-color: transparent;
  color: #FFF;
  border: 1px solid #FFB800;
  padding: 8px 16px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background-color: rgba(255, 184, 0, 0.1);
}

.btn-admin {
  background-color: #FFB800;
  color: #141414;
  padding: 8px 16px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.btn-admin:hover {
  opacity: 0.9;
}

.rightside {
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>