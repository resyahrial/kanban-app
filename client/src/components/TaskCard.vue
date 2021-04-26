<template>
  <div :class="containerClass" :draggable="isOwnByUser" @dragstart="drag">
    <!-- card-edited -->
    <task-form
      v-if="isEditState"
      :task="task"
      @hideForm="hideForm"
      @saveChange="editTask"
    ></task-form>
    <!-- card-item -->
    <div class="space-y-2" v-else>
      <div class="flex justify-between">
        <h3>{{ task.title }}</h3>
        <div class="flex items-center space-x-1" v-if="isOwnByUser">
          <div
            class="w-5 h-5 cursor-pointer text-yellow-500  hover:text-yellow-700"
            @click="showForm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              />
            </svg>
          </div>
          <div
            class="h-5 w-5 flex justify-center items-center text-red-500 cursor-pointer hover:text-red-700"
            @click="deleteTask"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="h-0.5 bg-gray-200 w-full"></div>
      <div class="flex justify-between">
        <div class="flex space-x-1 items-center text-gray-600">
          <div class="w-4 h-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p class="text-sm">{{ remainDate }}</p>
        </div>
        <div :class="initialClass">
          {{ initialUser }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import TaskForm from "./TaskForm.vue";

export default {
  name: "TaskCard",
  components: { TaskForm },
  props: ["task"],
  data() {
    return {
      isEditState: false,
      isOwnByUser: this.task.UserId == localStorage.userId,
      containerClass: `w-full rounded-md py-2 px-3 ${
        this.task.UserId == localStorage.userId
          ? "bg-white shadow-md cursor-pointer"
          : "border border-gray-400 text-gray-500"
      }`,
      initialClass: `icon bg-gray-300 ${
        this.task.UserId == localStorage.userId
          ? "text-indigo-500 font-bold"
          : ""
      }`,
    };
  },
  methods: {
    deleteTask() {
      this.$emit("deleteTask", this.task.id);
    },
    showForm() {
      this.isEditState = true;
    },
    hideForm() {
      this.isEditState = false;
    },
    editTask(payload) {
      payload = {
        ...payload,
        CategoryId: this.task.CategoryId,
        id: this.task.id,
      };
      this.$emit("editTask", payload);
      this.hideForm();
    },
    drag(ev) {
      const { id } = ev.target;
      ev.dataTransfer.setData("task_id", id);
    },
  },
  computed: {
    remainDate() {
      return dayjs(this.task.due_date).fromNow();
    },
    initialUser() {
      return this.task.User.email[0].toUpperCase();
    },
  },
};
</script>

<style></style>
