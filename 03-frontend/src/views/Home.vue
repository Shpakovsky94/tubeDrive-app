<template>
  <div>
    <div class="gray-background">
      <upload-files></upload-files>
    </div>
    <div class="style-chooser">
      <v-select
        inputId="searchField"
        label="name"
        :filterable="false"
        :options="userList"
        @search="onSearch"
        v-model="selectedUser"
      >
        <template slot="option" slot-scope="option">
          <div :id="'result-' + option.index">
             {{option.name}}
          </div>
        </template>

        <template slot="no-options">
            User is not presented. Try another name!
          </template>
      </v-select>
    </div>

    <div v-if="selectedUser">
      <strong>Name: </strong>
      <span>{{ selectedUser.name }}</span>
      <br />
      <strong>Team: </strong>
      <span>{{ selectedUser.team }}</span>
      <br />
      <strong>Age: </strong>
      <span>{{ selectedUser.age }}</span>
      <br />
      <strong>Address: </strong>
      <span>{{ selectedUser.address }}</span>
    </div>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import UploadFiles from "../components/UploadFiles";
import vSelect from "vue-select";
import { mapState, mapActions } from "vuex";
import _ from "lodash";

export default {
  components: {
    UploadFiles,
    vSelect,
  },
  data() {
    return {
      selectedUser: null,
    };
  },
  methods: {
    ...mapActions({
      searchUsersByName: "UsersStore/searchUsersByName",
    }),

    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },

    search: _.debounce((loading, search, vm) => {
      vm.searchUsersByName(search).then(() => {
        loading(false);
      });
    }, 350),
  },

  computed: {
    ...mapState({
      userList: ({ UsersStore }) => {
       return  UsersStore.users.map((item, index) => {
         item.index = index
         return item
       })
      }
    }),
  },
};
</script>

<style>
.gray-background {
  background-color: lightgray;
}
.style-chooser {
  padding-left: 20%;
  padding-right: 20%;
}
</style>