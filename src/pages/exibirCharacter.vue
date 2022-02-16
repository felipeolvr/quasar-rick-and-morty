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
          >
            <q-item-section
              >{{ episodio.episode }} - {{ episodio.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "exibirCharacter",
  setup() {
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
    onMounted(async () => {
      getCharacter();
    });

    return {
      data,
    };
  },
};
</script>

<style>
</style>