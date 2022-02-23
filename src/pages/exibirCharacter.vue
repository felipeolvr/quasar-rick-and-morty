<template>
  <div v-if="data" class="q-pa-md">
    <q-card class="my-card">
      <img style="height: 600px; width: auto" :src="data.image" />
      <q-card-section>
        <div class="text-h6">{{ data.name }}</div>
        <div class="text-subtitle2">Gênero: {{ data.gender }}</div>
        <div class="text-subtitle2">Status: {{ data.status }}</div>
        <div class="text-subtitle2">Localidade: {{ data.location.name }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-h6">Episódios que aparece:</div>

        <q-list bordered separator>
          <q-item
            clickable
            v-ripple
            v-for="episodio in data.episode"
            :key="episodio.name"
            @click="exibirEpisode(episodio.id)"
          >
            <div>
              <q-item-section
                >{{ episodio.episode }} - {{ episodio.name }}
              </q-item-section>
            </div>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import axios from "axios";
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "exibirCharacter",
  setup() {
    const $q = useQuasar();

    const route = useRoute();

    const data = ref(null);

    function getCharacter() {
      const endpoint = "https://rickandmortyapi.com/graphql";

      const graphqlQuery = {
        query: `query {
  character(id: "${route.params.id}") {
		id, name, gender, status, image, location{
			name
		},
		episode {
			id, name, air_date, episode
		}
	}
}`,
      };

      axios.post(endpoint, graphqlQuery).then((response) => {
        data.value = response.data.data.character;
        console.log(response.data.data.character);
      });
    }

    function exibirEpisode(id) {
      this.$router.push({
        name: "exibirEpisode",
        params: {
          id: id,
        },
      });
      console.log(id);
    }

    onMounted(async () => {
      getCharacter();
    });

    return {
      exibirEpisode,
      data,
    };
  },
});
</script>

<style>
</style>