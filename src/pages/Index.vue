<template>
  <div class="q-pa-md">
    <q-table
      grid
      v-if="data"
      :card-container-class="cardContainerClass"
      title=""
      :rows="data"
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
          <q-card>
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
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { ref, computed, watch, onMounted } from "vue";

export default defineComponent({
  name: "PageIndex",

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

    const data = ref(null);

    function getCharacter() {
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
        data.value = response.data.data.characters.results;
        console.log(response.data.data.characters.results);
      });
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
      getCharacter();
    });

    return {
      data,
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
  methods: {
    //     getCharacter() {
    //       const endpoint = "https://rickandmortyapi.com/graphql";
    //       const graphqlQuery = {
    //         query: `query {
    //   characters(
    // page: 0,
    // ){
    //     results {
    //       id, name, gender, type, image, location {
    // 				id, name, dimension
    // 			}
    //     }
    //   }
    // }`,
    //       };
    //       axios.post(endpoint, graphqlQuery).then((response) => {
    //         this.data = response.data.data.characters.results;
    //         console.log(this.data);
    //       });
    //     },
  },
  created() {
    // this.getCharacter();
  },
});
</script>
