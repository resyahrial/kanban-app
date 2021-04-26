<template>
  <div>
    <template v-if="!isLogin">
      <Auth
        :params="params"
        @refreshPage="refreshPage"
        @register="register"
        @login="login"
        @googleLogin="googleLogin"
      />
    </template>
    <template v-else>
      <Board
        :baseUrl="BASE_URL"
        :params="params"
        :categories="categories"
        :tasks="tasks"
        @refreshPage="refreshPage"
        @fetchCategory="fetchCategory"
        @addTask="addTask"
        @deleteTask="deleteTask"
        @editTask="editTask"
        @updateCategory="updateCategory"
      />
    </template>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

import Auth from "./pages/Auth";
import Board from "./pages/Board";

const swalOption = {
  buttons: false,
  timer: 1500,
};

export default {
  data() {
    return {
      BASE_URL: "https://resyahrial-kanban-server.herokuapp.com",
      isLogin: !!localStorage.access_token,
      params: {
        clientId:
          "232393341664-grv4qt7d3q0bel1hhiboup6af8sp2nid.apps.googleusercontent.com",
      },
      categories: [],
      tasks: [],
    };
  },
  components: {
    Auth,
    Board,
  },
  methods: {
    refreshPage() {
      this.isLogin = !!localStorage.access_token;
      if (localStorage.access_token) {
        this.fetchCategory();
      }
    },
    register(payload) {
      axios({
        url: `${this.BASE_URL}/register`,
        method: "POST",
        data: {
          ...payload,
        },
      })
        .then(() => {
          swal({
            ...swalOption,
            text: "User created successfully",
            icon: "success",
          });
        })
        .catch((err) => {
          swal({
            ...swalOption,
            text: err.response.data.message,
            icon: "error",
          });
        });
    },
    login(payload) {
      axios({
        url: `${this.BASE_URL}/login`,
        method: "POST",
        data: {
          ...payload,
        },
      })
        .then((res) => {
          const { id, access_token } = res.data;
          localStorage.setItem("userId", id);
          localStorage.setItem("access_token", access_token);
          this.refreshPage();
        })
        .catch((err) => {
          swal({
            ...swalOption,
            text: err.response.data.message,
            icon: "error",
          });
        });
    },
    googleLogin(user) {
      if (!localStorage.access_token) {
        axios({
          url: `${this.BASE_URL}/googleLogin`,
          method: "POST",
          data: {
            token: user.uc.id_token,
          },
        })
          .then((res) => {
            const { id, access_token } = res.data;
            localStorage.setItem("userId", id);
            localStorage.setItem("access_token", access_token);
            this.refreshPage();
          })
          .catch((err) => {
            swal({
              ...swalOption,
              text: err.response.data.message,
              icon: "error",
            });
          });
      }
    },
    fetchCategory() {
      axios({
        url: `${this.BASE_URL}/categories`,
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((res) => {
          const categories = res.data;
          categories.sort((a, b) => a.order - b.order);
          this.categories = categories;
          this.fetchTask();
        })
        .catch((err) => {
          swal({
            ...swalOption,
            text: err.response.data.message,
            icon: "error",
          });
        });
    },
    fetchTask() {
      axios({
        url: `${this.BASE_URL}/tasks`,
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((res) => {
          this.tasks = res.data;
        })
        .catch((err) => {
          swal({
            ...swalOption,
            text: err.response.data.message,
            icon: "error",
          });
        });
    },
    addTask(payload) {
      axios({
        url: `${this.BASE_URL}/tasks`,
        method: "POST",
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          ...payload,
        },
      })
        .then(() => {
          this.fetchCategory();
        })
        .catch((err) => {
          swal({
            ...swalOption,
            text: err.response.data.message,
            icon: "error",
          });
        });
    },
    deleteTask(id) {
      axios({
        url: `${this.BASE_URL}/tasks/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(() => {
          this.fetchCategory();
        })
        .catch((err) => {
          swal({
            ...swalOption,
            text: err.response.data.message,
            icon: "error",
          });
        });
    },
    editTask(payload) {
      axios({
        url: `${this.BASE_URL}/tasks/${payload.id}`,
        method: "PUT",
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          ...payload,
        },
      })
        .then(() => {
          this.fetchCategory();
        })
        .catch((err) => {
          swal({
            ...swalOption,
            text: err.response.data.message,
            icon: "error",
          });
        });
    },
    updateCategory(payload) {
      axios({
        url: `${this.BASE_URL}/tasks/${payload.taskId}/category`,
        method: "PATCH",
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          CategoryId: payload.CategoryId,
        },
      })
        .then(() => {
          this.fetchCategory();
        })
        .catch((err) => {
          swal({
            ...swalOption,
            text: err.response.data.message,
            icon: "error",
          });
        });
    },
  },
  created: function() {
    if (localStorage.access_token) {
      this.fetchCategory();
    }
  },
};
</script>

<style scoped></style>
