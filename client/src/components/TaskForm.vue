<template>
  <form class="space-y-2" @submit.prevent="saveChange()">
    <textarea
      rows="2"
      class="w-full p-2"
      v-model="title"
      placeholder="Enter a task ..."
    ></textarea>
    <input type="date" class="w-full p-2" v-model="due_date" />
    <div class="flex items-center space-x-2">
      <button
        type="submit"
        class="rounded-sm bg-green-500 text-white px-2 py-1 hover:bg-green-700"
      >
        Save
      </button>
      <div class="icon text-gray-500 hover:text-gray-700" @click="hideForm">
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
  </form>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "TaskForm",
  props: ["task"],
  data() {
    return {
      title: this.task ? this.task.title : "",
      due_date: this.task ? dayjs(this.task.due_date).format("YYYY-MM-DD") : "",
    };
  },
  methods: {
    hideForm() {
      this.$emit("hideForm");
    },
    saveChange() {
      const payload = {
        title: this.title,
        due_date: this.due_date,
        UserId: localStorage.userId,
      };
      this.$emit("saveChange", payload);
      this.title = "";
      this.due_date = "";
    },
  },
};
</script>

<style></style>
