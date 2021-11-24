<template>
  <div class="test-case">
    <div class="test-case__priority">
      <img :src="priorityIcon" :alt="testCase.priority" />
    </div>
    <div class="test-case__name">
      <p>{{ testCase.name }}</p>
    </div>
    <div class="test-case__control">
      <img
        class="test-case__edit"
        src="../../assets/Repository/edit-case.svg"
        alt="Edit case"
      />
      <img
        class="test-case__delete"
        src="../../assets/Repository/delete-case.svg"
        alt="Delete case"
        @click="deleteCase"
      />
      <!-- <img
        class="test-case__transition"
        src="../../assets/Repository/transition.svg"
        alt="To test case"
        @click="toTestCase"
      /> -->
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "TestCase",
  components: {},
  props: {
    testCase: Object,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const priorityIcon = computed(() =>
      require(`../../assets/Repository/${props.testCase.priority}.svg`)
    );
    function deleteCase() {
      store.dispatch("deleteTestCase", props.testCase.id).then((res) => {
        store.dispatch("loadTestCases");
      });
    }
    function toTestCase() {
      router.push({ name: "EditCase", params: { id: props.testCase.id } });
    }
    return { priorityIcon, deleteCase, toTestCase };
  },
});
</script>

<style scoped lang="scss">
.test-case {
  width: 100%;
  padding: 12px;
  border-bottom: 0.5px solid #e5e5e5;
  display: flex;
  align-items: center;
  &:hover {
    .test-case__control {
      opacity: 1;
    }
  }
  &__priority {
    display: flex;
  }
  &__name {
    margin-right: 12px;
  }
  &__control {
    width: 35px;
    display: flex;
    justify-content: space-between;
    opacity: 0;
    transition: all ease 0.3s;

    img {
      transition: all ease 0.3s;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
