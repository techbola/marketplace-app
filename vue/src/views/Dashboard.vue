<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <router-link :to="{ name: 'ListingCreate' }"
                    class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
                    Add new Listing
                </router-link>
            </div>
        </template>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            <div v-for="listing in listings" :key="listing.id"
                class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
                <img :src="listing.image" :alt="listing.title" class="w-full h-48 object-cover" />
                <h4 class="mt-4 text-lg font-bold">{{ listing.title }}</h4>
                <div v-html="listing.description" class="overflow-hidden flex-1"></div>

                <div class="mt-3">
                    <router-link :to="{ name: 'ListingView', params: { id: listing.id } }"
                        class="flex justify-center py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">View</router-link>
                </div>
            </div>
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import store from '../store';
import { computed } from "vue"

const listings = computed(() => store.state.listings) 
</script>

<style lang="scss" scoped>

</style>