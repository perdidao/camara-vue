<template>
  <nav>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Dados abertos | Câmara dos Deputados</v-toolbar-title>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    items: [
      {
        icon: 'mdi-apps',
        title: 'Deputados',
        to: '/',
      },
    ],
  }),
}
</script>
