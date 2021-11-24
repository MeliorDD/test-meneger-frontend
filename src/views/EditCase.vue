<template>
  <section class="edit-case">
    <div class="edit-case__header">
      <a @click="cancel"
        ><img
          src="../assets/Repository/back.svg"
          alt="back-arrow"
          class="back-arrow"
      /></a>
      <h2>Edit case</h2>
    </div>
    <Loader v-if="$store.state.loaderEditCase" />
    <div class="edit-case__wrap" v-else>
      <div class="edit-case__fields">
        <div class="edit-case__name field">
          <label>Title</label>
          <input type="text" class="input" v-model="name" />
        </div>
        <div class="edit-case__description field">
          <label>Description</label>
          <input type="text" class="input" v-model="description" />
        </div>
        <div class="edit-case__priority field">
          <label>Priority</label>
          <select class="select" v-model="priority">
            <option
              v-for="priority in priorities"
              :key="priority.value"
              :value="priority.value"
            >
              {{ priority.text }}
            </option>
          </select>
        </div>
        <div class="edit-case__behavior field">
          <label>Behavior</label>
          <select class="select" v-model="behavior">
            <option
              v-for="behavior in behaviors"
              :key="behavior.value"
              :value="behavior.value"
            >
              {{ behavior.text }}
            </option>
          </select>
        </div>
        <div class="edit-case__criticality field">
          <label>Criticality</label>
          <select class="select" v-model="criticality">
            <option
              v-for="item in criticalityItems"
              :key="item.value"
              :value="item.value"
            >
              {{ item.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="edit-case__buttons">
        <button class="button-cancel" @click="cancel">Cancel</button>
        <button class="button" @click="editCase">Edit</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Loader from "../components/Global/Loader.vue";

export default defineComponent({
  components: {
    Loader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const priorities = [
      { text: "Not set", value: "none" },
      { text: "Low", value: "low" },
      { text: "Medium", value: "medium" },
      { text: "High", value: "high" },
    ];
    const behaviors = [
      { text: "Not set", value: "none" },
      { text: "Positive", value: "positive" },
      { text: "Negative", value: "negative" },
      { text: "Destructive", value: "dsestructive" },
    ];
    const criticalityItems = [
      { text: "Not set", value: "none" },
      { text: "Blocker", value: "blocker" },
      { text: "Critical", value: "critical" },
      { text: "Major", value: "major" },
      { text: "Normal", value: "normal" },
      { text: "Minor", value: "minor" },
      { text: "Trival", value: "trival" },
    ];

    let name = ref("");
    let description = ref("");
    let priority = ref("");
    let behavior = ref("");
    let criticality = ref("");
    let id = 0;
    store.state.loaderEditCase = true;
    store
      .dispatch("loadTestCase", route.params.id)
      .then((response) => {
        store.state.loaderEditCase = false;
        const caseToEdit = response.data.data;
        id = caseToEdit.id;
        name.value = caseToEdit.name;
        description.value = caseToEdit.description;
        priority.value = caseToEdit.priority;
        behavior.value = caseToEdit.behavior;
        criticality.value = caseToEdit.criticality;
      })
      .catch((error) => {
        console.log(error);
      });

    function cancel() {
      router.go(-1);
    }
    function editCase() {
      const editedCase = {
        name: name.value,
        description: description.value,
        priority: priority.value,
        behavior: behavior.value,
        criticality: criticality.value,
      };
      store.dispatch("editCase", { editedCase, id });
    }
    return {
      priorities,
      behaviors,
      criticalityItems,
      name,
      description,
      priority,
      behavior,
      criticality,
      cancel,
      editCase,
    };
  },
});
</script>

<style scoped lang="scss">
.edit-case {
  padding: 16px;
  &__header {
    width: 100%;
    padding: 24px;
    display: flex;
    align-items: center;
    .back-arrow {
      margin-right: 10px;
      padding-top: 4px;
      transition: ease all 0.3s;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  &__wrap {
    width: 100%;
    padding: 12px 24px;
  }
  &__fields {
    margin-bottom: 16px;
    .field {
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;
      label {
        margin-bottom: 5px;
      }
    }
  }
  &__buttons {
    button {
      margin-right: 8px;
    }
  }
}
</style>
