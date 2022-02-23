<template>
  <div class="q-pa-md">
    <q-card class="my-card" v-if="episode">
      <q-card-section>
        <div class="text-h6">Nome: {{ episode.name }}</div>
        <div class="text-subtitle2">Episódio: {{ episode.episode }}</div>
        <div class="text-subtitle2">
          Data de Exibição: {{ episode.air_date }}
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-h6">Personagens deste Episódio</div>

        <q-table
          grid
          :card-container-class="cardContainerClass"
          title=""
          :rows="episode.characters"
          :columns="columns"
          row-key="name"
          :filter="filter"
          hide-header
          v-model:pagination="pagination"
          :rows-per-page-options="rowsPerPageOptions"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Pesquisar"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card
                style="cursor: pointer"
                clickable
                @click="exibirCharacter(props.row.id)"
              >
                <q-card-section class="text-center">
                  <q-img :src="props.row.image"></q-img>
                  <br />
                  <strong>{{ props.row.name }}</strong>
                </q-card-section>
                <q-separator />
                <q-card-section class="flex flex-center">
                  <div>{{ props.row.gender }}</div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import axios from "axios";
import { ref, watch, onMounted, computed } from "vue";
import { useQuasar } from "quasar";

import { useRoute } from "vue-router";

export default defineComponent({
  name: "exibirEpisode",
  setup() {
    const $q = useQuasar();

    function getItemsPerPage() {
      if ($q.screen.lt.sm) {
        return 3;
      }
      if ($q.screen.lt.md) {
        return 6;
      }
      return 9;
    }

    const route = useRoute();

    const episode = ref(null);

    function getEpisode() {
      const endpoint = "https://rickandmortyapi.com/graphql";

      const graphqlQuery = {
        query: `query {
  episode(id: "${route.params.id}") {
		id, name, air_date, episode, characters{
			id, name, image, gender
		},
	
	}
}`,
      };

      axios.post(endpoint, graphqlQuery).then((response) => {
        episode.value = response.data.data.episode;
      });
    }

    function exibirCharacter(id) {
      this.$router.push({
        name: "exibirCharacter",
        params: {
          id: id,
        },
      });
      console.log(id);
    }

    const filter = ref("");
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage(),
    });

    watch(
      () => $q.screen.name,
      () => {
        pagination.value.rowsPerPage = getItemsPerPage();
      }
    );

    onMounted(async () => {
      getEpisode();
    });

    return {
      exibirCharacter,
      episode,
      filter,
      pagination,

      columns: [
        { name: "name", label: "Name", field: "name" },
        { name: "gender", label: "Gênero", field: "gender" },
      ],

      cardContainerClass: computed(() => {
        return $q.screen.gt.xs
          ? "grid-masonry grid-masonry--" + ($q.screen.gt.sm ? "3" : "2")
          : null;
      }),

      rowsPerPageOptions: computed(() => {
        return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
      }),
    };
  },
});
</script>

<style>
</style>