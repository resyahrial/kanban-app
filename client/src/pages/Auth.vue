<template>
  <div>
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <img
          :src="ImageAuth"
          alt="auth"
          class="object-cover object-top h-screen w-full"
        />
      </div>
      <div class="flex flex-col justify-center pr-4" v-if="isLogin">
        <LoginForm
          :params="params"
          @changeForm="changeForm"
          @login="login"
          @googleLogin="googleLogin"
        />
      </div>
      <div class="flex flex-col justify-center pr-4" v-else>
        <RegisterForm @changeForm="changeForm" @register="register" />
      </div>
    </div>
  </div>
</template>

<script>
import ImageAuth from "../../assets/images/auth.jpg";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default {
  name: "Auth",
  props: ["params"],
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      ImageAuth,
      isLogin: true,
    };
  },
  methods: {
    changeForm() {
      this.isLogin = !this.isLogin;
    },
    refreshPage() {
      this.$emit("refreshPage");
    },
    register(payload) {
      this.$emit("register", payload);
    },
    login(payload) {
      this.$emit("login", payload);
    },
    googleLogin(user) {
      this.$emit("googleLogin", user);
    },
  },
};
</script>

<style></style>
