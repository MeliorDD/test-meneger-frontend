import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: () => ({
    testCases: [],
    loaderRepository: false,
    loaderEditCase: false,
  }),
  mutations: {
    SET_TEST_CASES(state, payload) {
      state.testCases = payload;
    },
  },
  actions: {
    loadTestCases({ commit, state }) {
      state.loaderRepository = true;
      return axios({
        url: "http://127.0.0.1:8000/api/test-cases",
        method: "GET",
      })
        .then((response) => {
          state.loaderRepository = false;
          commit("SET_TEST_CASES", response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createCase(_, newCase) {
      axios({
        url: "http://127.0.0.1:8000/api/test-cases",
        method: "POST",
        data: newCase,
      }).then((res) => {
        console.log(res);
      });
    },
    deleteTestCase(_, id) {
      return axios({
        url: `http://127.0.0.1:8000/api/test-cases/${id}`,
        method: "DELETE",
      });
    },
    loadTestCase(_, id) {
      return axios({
        url: `http://127.0.0.1:8000/api/test-cases/${id}`,
        method: "GET",
      });
    },
    editCase(_, { editedCase, id }) {
      axios({
        url: `http://127.0.0.1:8000/api/test-cases/${id}`,
        method: "PUT",
        data: editedCase,
      }).then((res) => {
        console.log(res);
      });
    },
  },
  modules: {},
});
