<template>
  <section class="repository">
    <div class="repository__header">
      <h2>Test repository</h2>
      <div class="repository__buttons buttons">
        <button class="button buttons__create-case" @click="createCase">
          Create case
        </button>
      </div>
    </div>
    <div class="repository__body">
      <Loader v-if="$store.state.loaderRepository" />
      <div class="repository__main" v-else>
        <TestCase
          v-for="testCase in testCases"
          :key="testCase.id"
          :testCase="testCase"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { defineComponent } from "vue";
import TestCase from "../components/Repository/TestCase.vue";
import Loader from "../components/Global/Loader.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Repository",
  components: { TestCase, Loader },
  setup() {
    const store = useStore();
    const router = useRouter();
    const testCases = computed(() => {
      return store.state.testCases;
    });

    store.dispatch("loadTestCases");
    function createCase() {
      router.push({ name: "CreateCase" });
    }
    return { testCases, createCase };
  },
});
</script>

<style scoped lang="scss">
.repository {
  width: 100%;
  padding: 16px;
  &__header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-content: center;
    padding: 24px;
    h2 {
      margin-bottom: 20px;
    }
  }
  &__body {
    padding: 24px;
    width: 100%;
  }
}
</style>
