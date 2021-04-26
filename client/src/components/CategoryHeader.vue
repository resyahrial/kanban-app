<template>
  <div class="flex justify-between items-center">
    <div class="flex space-x-1">
      <h2 class="font-medium">
        {{ title }}
      </h2>
      <div class="icon bg-gray-300 font-medium">
        {{ taskCount }}
      </div>
    </div>
    <div
      class="icon bg-gray-300 text-green-500 hover:text-green-700"
      @click="showForm"
      v-if="!isAddState"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryHeader",
  props: ["title", "taskCount", "isAddState"],
  methods: {
    showForm() {
      this.$emit("showForm");
    },
  },
};
</script>

<style></style>
