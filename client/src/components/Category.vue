<template>
  <div @dragover.prevent="" @drop.prevent="updateCategory">
    <div class="bg-gray-100 rounded-md p-3 space-y-4">
      <category-header
        :title="category.title"
        :taskCount="taskCount"
        :isAddState="isAddState"
        @showForm="showForm"
      ></category-header>
      <task-form
        v-if="isAddState"
        :categoryId="category.id"
        @hideForm="hideForm"
        @saveChange="addTask"
      ></task-form>
      <task-card
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :id="task.id"
        @deleteTask="deleteTask"
        @editTask="editTask"
      ></task-card>
    </div>
  </div>
</template>

<script>
import CategoryHeader from "./CategoryHeader.vue";
import TaskCard from "./TaskCard.vue";
import TaskForm from "./TaskForm.vue";

export default {
  name: "Category",
  props: ["category", "tasks"],
  components: { CategoryHeader, TaskCard, TaskForm },
  data() {
    return {
      isAddState: false,
    };
  },
  methods: {
    showForm() {
      this.isAddState = true;
    },
    hideForm() {
      this.isAddState = false;
    },
    addTask(payload) {
      payload = {
        ...payload,
        CategoryId: this.category.id,
      };
      this.$emit("addTask", payload);
      this.hideForm();
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
    editTask(payload) {
      this.$emit("editTask", payload);
    },
    updateCategory(ev) {
      this.$emit("updateCategory", {
        taskId: ev.dataTransfer.getData("task_id"),
        CategoryId: this.category.id,
      });
    },
  },
  computed: {
    taskCount: function() {
      return this.tasks.length;
    },
  },
};
</script>

<style></style>
