<template>
  <div>
    <h1>Register</h1>
    <input type="email"
           name="email"
           v-model="email"
           placeholder="email" />
    <br/>
    <input type="password"
           name="password"
           v-model="password"
           placeholder="password"/>
    <br/>
    <button @click="register">Register</button>
  </div>

</template>

<script>
import {ref, watch} from "vue";
import AuthenticationService from "../../services/AuthenticationService"

export default {
  setup(){
    const email = ref('')
    const password = ref('')

    const register = async () => {
      const response = await AuthenticationService.register({
        email: email,
        password: password
      })
      console.log(response)
    }

    watch(email, (newValue, oldValue) => {
      console.log(newValue)
      console.log(oldValue)
      console.log(email)

    })


    return {
      email,
      password,
      register
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
