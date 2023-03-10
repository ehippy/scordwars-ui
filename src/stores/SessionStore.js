import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import jwt_decode from "jwt-decode";

export const useSessionStore = defineStore('session', {
  state: () => ({
    jwt: '',
    id: 0,
    name: '',
    avatar: ''
  }),
  getters: {
    isLoggedIn: (state) => state.id != 0,
  },
  actions: {
    login(jwt) {
      var dJWT = jwt_decode(jwt);

      this.jwt = jwt
      this.id = dJWT.id
      this.name = dJWT.username
      this.avatar = dJWT.avatar

      localStorage.setItem('jwt', jwt)
      console.log(`Logged in ` + this.name)

    },
    logout() {
      localStorage.removeItem('jwt')
      this.jwt = ''
      this.id = 0
      this.name = ''
      this.avatar = ''
    },
  },
})
