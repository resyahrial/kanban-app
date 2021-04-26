<template>
  <nav
    class="flex justify-end items-center px-4 w-full bg-indigo-500"
    style="height: 7.5%;"
  >
    <GoogleLogin
      :params="params"
      :logoutButton="true"
      class="text-lg font-medium text-white"
      :onSuccess="logout"
    >
      Logout
    </GoogleLogin>
  </nav>
</template>

<script>
import GoogleLogin from "vue-google-login";

export default {
  name: "Navbar",
  props: ["params"],
  components: {
    GoogleLogin,
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$emit("refreshPage");
    },
  },
};
</script>

<style></style>
