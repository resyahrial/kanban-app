<template>
  <div class="space-y-6">
    <h1 class="text-center font-medium text-3xl">
      Login Form
    </h1>
    <GoogleLogin
      class="w-full py-1.5 rounded text-white font-medium bg-blue-500 hover:bg-blue-700"
      :params="params"
      :onSuccess="googleLogin"
      :onFailure="onFailure"
    >
      Google Login
    </GoogleLogin>
    <form class="w-full space-y-4" @submit.prevent="login">
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
        Login
      </button>
      <a
        href="#"
        class="block w-full text-center text-gray-500 hover:text-blue-600"
        @click.prevent="changeForm"
      >
        Don't have an account?
      </a>
    </form>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";

export default {
  name: "LoginForm",
  components: {
    GoogleLogin,
  },
  props: ["params"],
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
    login() {
      this.$emit("login", {
        email: this.email,
        password: this.password,
      });
      this.email = "";
      this.password = "";
    },
    googleLogin(user) {
      this.$emit("googleLogin", user);
    },
    onFailure(err) {
      console.log(err);
    },
  },
};
</script>

<style></style>
