<template>
    <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register for free</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ ' ' }}
        <router-link :to="{name: 'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500">login to your account</router-link>
        </p>
    </div>
    <form @submit="register" class="mt-8 space-y-6">
        <ValidationErrors :errors="errorMsg" v-if="errorMsg" @clear-error="clearError" />

        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
            <div>
                <label for="full-name" class="sr-only">Fullname</label>
                <input id="full-name" name="name" type="text" autocomplete="name" required v-model="user.name" class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Full name" />
            </div>
            <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autocomplete="email" v-model="user.email" required="" class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" name="password" type="password" autocomplete="current-password" v-model="user.password" required="" class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
            </div>
            <div>
                <label for="password_confirmation" class="sr-only">Confirm password</label>
                <input id="password_confirmation" name="password_confirmation" v-model="user.password_confirmation" type="password" autocomplete="current-password" required="" class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Confirm password" />
            </div>
        </div>

        <div>
            <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Sign up
            </button>
        </div>
    </form>
</template>

<script setup>
    import store from "../store";
    import { useRouter } from "vue-router";
    import { ref } from "vue";
    import ValidationErrors from "../components/ValidationErrors.vue";

    const router = useRouter();

    const user = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    let errorMsg = ref([]);

    function register(ev) {
        ev.preventDefault();
        store
            .dispatch('register', user)
            .then(() => { 
                router.push({
                    name: 'Dashboard'
                })
            })
            .catch((error) => {
                if (error.response.status == 422){
                    errorMsg.value = error.response.data.errors
                } else {
                    errorMsg.value.push("Something went wrong!");
                }
            })
    }

    function clearError() {
        errorMsg.value = ''
    }
</script>

<style lang="scss" scoped>

</style>