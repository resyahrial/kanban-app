<template>
  <div class="space-y-6">
    <h1 class="text-center font-medium text-3xl">
      Register Form
    </h1>
    <form class="w-full space-y-4" @submit.prevent="register">
      <input
        type="email"
        placeholder="Email"
        class="w-full px-2 py-1.5 rounded border border-gray-400"
        v-model="email"
      />
      <input
        type="password"
        placeholder="Password"
        class="w-full px-2 py-1.5 rounded border border-gray-400"
        v-model="password"
      />
      <button
        type="submit"
        class="w-full py-1.5 rounded text-white font-medium bg-blue-500 hover:bg-blue-700"
      >
        Register
      </button>
      <a
        href="#"
        class="block w-full text-center text-gray-500 hover:text-blue-600"
        @click.prevent="changeForm"
      >
        Alreaedy have an account?
      </a>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    changeForm() {
      this.$emit("changeForm");
    },
    register() {
      this.$emit("register", {
        email: this.email,
        password: this.password,
      });
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style></style>
