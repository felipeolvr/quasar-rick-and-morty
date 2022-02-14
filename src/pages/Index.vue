<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {};
  },
  methods: {
    getCharacter() {
      const endpoint = "https://rickandmortyapi.com/graphql";

      const graphqlQuery = {
        query: `query {
  characters(
page: 0,
){
    
    results {
      id, name, gender, type, image, location {
				id, name, dimension
			}
    }
  }

}`,
      };

      axios.post(endpoint, graphqlQuery).then((response) => {
        console.log(response.data.data.characters.results);
      });
    },
  },
  created() {
    this.getCharacter();
  },
});
</script>
