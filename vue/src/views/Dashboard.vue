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

        <div v-if="listings.length > 0">
            <!-- Search box -->
            <div class="bg-gray-50 px-4 py-3 sm:px-6 mb-6">
                <form @submit.prevent="searchListing">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-2">
                            <select id="category" name="category" v-model="search.category" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option value="Furniture">Furniture</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Cars">Cars</option>
                                <option value="Property">Property</option>
                            </select>
                        </div>
                        <div class="col-span-6 sm:col-span-2">
                            <input type="text" name="search_query" v-model="search.search_query" id="search_query" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-2">
                            <button type="submit" class="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Search</button>
                        </div>
                    </div>
                </form>
            </div>
            
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <Listing 
                    v-for="listing in listings" 
                    :key="listing.id" 
                    :listing="listing"
                    class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[170px]" 
                />
            </div>
        </div>
        <div v-else>
            <h2 class="text-xl font-medium leading-6 text-gray-900">No Listings...</h2>
        </div>
    </PageComponent>
</template>

<script setup>
    import PageComponent from '../components/PageComponent.vue';
    import Listing from '../components/Listing.vue';
    import store from '../store';
    import { ref, onMounted } from "vue";

    const listings = ref([]);

    const search = ref({
        category: '',
        search_query: ''
    })

    onMounted(() => {
        store
            .dispatch('getAllListing')
            .then((data) => {
                listings.value = data.listings;
            });
    });

    function searchListing() {
        store
            .dispatch('searchListing', search.value)
            .then((data) => {
                listings.value = data.listings;
            })
    }
</script>

<style lang="scss" scoped>

</style>