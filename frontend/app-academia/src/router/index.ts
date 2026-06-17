import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import LoginAlunosView from '../views/LoginView.vue'

// Auth
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import AlterarInfoView from '../views/auth/AlterarInfoView.vue'
import AlterarSenhaView from '../views/auth/AlterarSenhaView.vue'

// Alunos
import AlunosListView from '../views/alunos/AlunosListView.vue'
import AlunosFormView from '../views/alunos/AlunosFormView.vue'
import AlunosDetailView from '../views/alunos/AlunosDetailView.vue'

// Treinadores
import TreinadoresListView from '../views/treinadores/TreinadoresListView.vue'
import TreinadoresFormView from '../views/treinadores/TreinadoresFormView.vue'

// Fichas Médicas
import FichasMedicasListView from '../views/fichasmedicas/FichasMedicasListView.vue'
import FichasMedicasFormView from '../views/fichasmedicas/FichasMedicasFormView.vue'

// Treinos - Grupos Musculares
import GruposMuscularesListView from '../views/treinos/gruposmusculares/GruposMuscularesListView.vue'
import GruposMuscularesFormView from '../views/treinos/gruposmusculares/GruposMuscularesFormView.vue'

// Treinos - Exercícios
import ExerciciosListView from '../views/treinos/exercicios/ExerciciosListView.vue'
import ExerciciosFormView from '../views/treinos/exercicios/ExerciciosFormView.vue'

// Treinos - Fichas
import FichasTreinoListView from '../views/treinos/fichas/FichasTreinoListView.vue'
import FichasTreinoFormView from '../views/treinos/fichas/FichasTreinoFormView.vue'
import FichasTreinoDetailView from '../views/treinos/fichas/FichasTreinoDetailView.vue'

// Treinos - Montar Treino (carrinho)
import MontarTreinoListView from '../views/treinos/montartreino/MontarTreinoListView.vue'
import MontarTreinoCarrinhoView from '../views/treinos/montartreino/MontarTreinoCarrinhoView.vue'
import MontarTreinoCheckoutView from '../views/treinos/montartreino/MontarTreinoCheckoutView.vue'

// Nutrição - Categorias
import CategoriasListView from '../views/nutricao/categorias/CategoriasListView.vue'
import CategoriasFormView from '../views/nutricao/categorias/CategoriasFormView.vue'

// Nutrição - Alimentos
import AlimentosListView from '../views/nutricao/alimentos/AlimentosListView.vue'
import AlimentosFormView from '../views/nutricao/alimentos/AlimentosFormView.vue'

// Nutrição - Nutricionistas
import NutricionistasListView from '../views/nutricao/nutricionistas/NutricionistasListView.vue'
import NutricionistasFormView from '../views/nutricao/nutricionistas/NutricionistasFormView.vue'

// Nutrição - Planos Alimentares
import PlanosListView from '../views/nutricao/planos/PlanosListView.vue'
import PlanosFormView from '../views/nutricao/planos/PlanosFormView.vue'
import PlanosDetailView from '../views/nutricao/planos/PlanosDetailView.vue'

// Nutrição - Montar Plano (carrinho)
import MontarPlanoListView from '../views/nutricao/montarplano/MontarPlanoListView.vue'
import MontarPlanoCarrinhoView from '../views/nutricao/montarplano/MontarPlanoCarrinhoView.vue'
import MontarPlanoCheckoutView from '../views/nutricao/montarplano/MontarPlanoCheckoutView.vue'

// Avaliações Físicas
import AvaliacoesFisicasListView from '../views/avaliacoesfisicas/AvaliacoesFisicasListView.vue'
import AvaliacoesFisicasFormView from '../views/avaliacoesfisicas/AvaliacoesFisicasFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/registro', name: 'registro', component: RegisterView },
    { path: '/login-alunos', name: 'login-alunos', component: LoginAlunosView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView , meta: { layout: 'dashboard' } },

    // Conta do Usuário
    { path: '/conta/alterar-info', name: 'alterar-info', component: AlterarInfoView , meta: { layout: 'dashboard' } },
    { path: '/conta/alterar-senha', name: 'alterar-senha', component: AlterarSenhaView , meta: { layout: 'dashboard' } },

    // Alunos
    { path: '/alunos', name: 'alunos', component: AlunosListView , meta: { layout: 'dashboard' } },
    { path: '/alunos/novo', name: 'alunos-novo', component: AlunosFormView , meta: { layout: 'dashboard' } },
    { path: '/alunos/editar/:id', name: 'alunos-editar', component: AlunosFormView , meta: { layout: 'dashboard' } },
    { path: '/alunos/ver/:id', name: 'alunos-ver', component: AlunosDetailView , meta: { layout: 'dashboard' } },

    // Treinadores
    { path: '/treinadores', name: 'treinadores', component: TreinadoresListView , meta: { layout: 'dashboard' } },
    { path: '/treinadores/novo', name: 'treinadores-novo', component: TreinadoresFormView , meta: { layout: 'dashboard' } },
    { path: '/treinadores/editar/:id', name: 'treinadores-editar', component: TreinadoresFormView , meta: { layout: 'dashboard' } },

    // Fichas Médicas
    { path: '/fichas-medicas', name: 'fichas-medicas', component: FichasMedicasListView , meta: { layout: 'dashboard' } },
    { path: '/fichas-medicas/novo', name: 'fichas-medicas-novo', component: FichasMedicasFormView , meta: { layout: 'dashboard' } },
    { path: '/fichas-medicas/editar/:id', name: 'fichas-medicas-editar', component: FichasMedicasFormView , meta: { layout: 'dashboard' } },
    
    // Treinos - Grupos Musculares
    { path: '/treinos/grupos-musculares', name: 'grupos-musculares', component: GruposMuscularesListView , meta: { layout: 'dashboard' } },
    { path: '/treinos/grupos-musculares/novo', name: 'grupos-musculares-novo', component: GruposMuscularesFormView , meta: { layout: 'dashboard' } },
    { path: '/treinos/grupos-musculares/editar/:id', name: 'grupos-musculares-editar', component: GruposMuscularesFormView , meta: { layout: 'dashboard' } },
    
    // Treinos - Exercícios
    { path: '/treinos/exercicios', name: 'exercicios', component: ExerciciosListView , meta: { layout: 'dashboard' } },
    { path: '/treinos/exercicios/novo', name: 'exercicios-novo', component: ExerciciosFormView , meta: { layout: 'dashboard' } },
    { path: '/treinos/exercicios/editar/:id', name: 'exercicios-editar', component: ExerciciosFormView , meta: { layout: 'dashboard' } },
    
    // Treinos - Fichas de Treino
    { path: '/treinos/fichas', name: 'fichas-treino', component: FichasTreinoListView , meta: { layout: 'dashboard' } },
    { path: '/treinos/fichas/novo', name: 'fichas-treino-novo', component: FichasTreinoFormView , meta: { layout: 'dashboard' } },
    { path: '/treinos/fichas/editar/:id', name: 'fichas-treino-editar', component: FichasTreinoFormView , meta: { layout: 'dashboard' } },
    { path: '/treinos/fichas/ver/:id', name: 'fichas-treino-ver', component: FichasTreinoDetailView , meta: { layout: 'dashboard' } },

    // Treinos - Montar Treino (carrinho)
    { path: '/treinos/montar', name: 'montar-treino', component: MontarTreinoListView , meta: { layout: 'dashboard' } },
    { path: '/treinos/montar/carrinho', name: 'montar-treino-carrinho', component: MontarTreinoCarrinhoView , meta: { layout: 'dashboard' } },
    { path: '/treinos/montar/checkout', name: 'montar-treino-checkout', component: MontarTreinoCheckoutView , meta: { layout: 'dashboard' } },
    
    // Nutrição - Categorias
    { path: '/nutricao/categorias', name: 'categorias', component: CategoriasListView , meta: { layout: 'dashboard' } },
    { path: '/nutricao/categorias/novo', name: 'categorias-novo', component: CategoriasFormView , meta: { layout: 'dashboard' } },
    { path: '/nutricao/categorias/editar/:id', name: 'categorias-editar', component: CategoriasFormView , meta: { layout: 'dashboard' } },
    
    // Nutrição - Alimentos
    { path: '/nutricao/alimentos', name: 'alimentos', component: AlimentosListView , meta: { layout: 'dashboard' } },
    { path: '/nutricao/alimentos/novo', name: 'alimentos-novo', component: AlimentosFormView , meta: { layout: 'dashboard' } },
    { path: '/nutricao/alimentos/editar/:id', name: 'alimentos-editar', component: AlimentosFormView , meta: { layout: 'dashboard' } },
    
    // Nutrição - Nutricionistas
    { path: '/nutricao/nutricionistas', name: 'nutricionistas', component: NutricionistasListView , meta: { layout: 'dashboard' } },
    { path: '/nutricao/nutricionistas/novo', name: 'nutricionistas-novo', component: NutricionistasFormView , meta: { layout: 'dashboard' } },
    { path: '/nutricao/nutricionistas/editar/:id', name: 'nutricionistas-editar', component: NutricionistasFormView , meta: { layout: 'dashboard' } },
    
    // Nutrição - Planos Alimentares
    { path: '/nutricao/planos', name: 'planos', component: PlanosListView , meta: { layout: 'dashboard' } },
    { path: '/nutricao/planos/novo', name: 'planos-novo', component: PlanosFormView , meta: { layout: 'dashboard' } },
    { path: '/nutricao/planos/editar/:id', name: 'planos-editar', component: PlanosFormView , meta: { layout: 'dashboard' } },
    { path: '/nutricao/planos/ver/:id', name: 'planos-ver', component: PlanosDetailView , meta: { layout: 'dashboard' } },

    // Nutrição - Montar Plano Alimentar (carrinho)
    { path: '/nutricao/montar', name: 'montar-plano', component: MontarPlanoListView , meta: { layout: 'dashboard' } },
    { path: '/nutricao/montar/carrinho', name: 'montar-plano-carrinho', component: MontarPlanoCarrinhoView , meta: { layout: 'dashboard' } },
    { path: '/nutricao/montar/checkout', name: 'montar-plano-checkout', component: MontarPlanoCheckoutView , meta: { layout: 'dashboard' } },
    
    // Avaliações Físicas
    { path: '/avaliacoes-fisicas', name: 'avaliacoes-fisicas', component: AvaliacoesFisicasListView , meta: { layout: 'dashboard' } },
    { path: '/avaliacoes-fisicas/novo', name: 'avaliacoes-fisicas-novo', component: AvaliacoesFisicasFormView , meta: { layout: 'dashboard' } },
    { path: '/avaliacoes-fisicas/editar/:id', name: 'avaliacoes-fisicas-editar', component: AvaliacoesFisicasFormView , meta: { layout: 'dashboard' } },
  ]
})

// Guarda global de rotas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')

  const publicRoutes = [
    '/',
    '/login',
    '/login-alunos',
    '/registro'
  ]

  if (
    (
      to.path === '/' ||
      to.path === '/login' ||
      to.path === '/login-alunos' ||
      to.path === '/registro'
    ) &&
    token
  ) {
    return next('/dashboard')
  }

  if (!publicRoutes.includes(to.path) && !token) {
    return next('/login')
  }

  next()
})

export default router
