<template>
  <h2>chegou aqui</h2>
  {{ data }}
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
		id, name, image, location{
			name
		},
		episode {
			id, name
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