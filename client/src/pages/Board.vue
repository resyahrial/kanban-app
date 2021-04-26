<template>
  <div class="h-screen">
    <navbar :params="params" @refreshPage="refreshPage"></navbar>
    <div class="grid grid-cols-4 gap-4 p-4" style="height: 92.5%">
      <category
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :tasks="tasks.filter((task) => task.CategoryId === category.id)"
        @refreshPage="refreshPage"
        @addTask="addTask"
        @deleteTask="deleteTask"
        @editTask="editTask"
        @updateCategory="updateCategory"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Category from "../components/Category.vue";

export default {
  name: "Board",
  props: ["params", "categories", "tasks"],
  components: {
    Navbar,
    Category,
  },
  methods: {
    refreshPage() {
      this.$emit("refreshPage");
    },
    addTask(payload) {
      this.$emit("addTask", payload);
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
    editTask(payload) {
      this.$emit("editTask", payload);
    },
    updateCategory(payload) {
      this.$emit("updateCategory", payload);
    },
  },
};
</script>

<style></style>
