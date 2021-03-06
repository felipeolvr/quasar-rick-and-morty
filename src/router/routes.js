
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { name: 'exibirCharacter', path: '/character/:id', component: () => import('pages/exibirCharacter.vue') },
      { name: 'exibirEpisode', path: '/episode/:id', component: () => import('pages/exibirEpisode.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
