<template>
    <PageComponent title="Create a Listing">
        <form @submit.prevent="saveListing">
            <ValidationErrors :errors="errorMsg" v-if="Object.keys(errorMsg).length > 0" @clear-error="clearError" />

            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" name="title" id="title" v-model="listing.title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-6">
                            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                            <div class="mt-1">
                                <textarea id="description" name="description" v-model="listing.description" required rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="date_online" class="block text-sm font-medium text-gray-700">Date online</label>
                            <input type="date" name="date_online" id="date_online" v-model="listing.date_online" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="date_offline" class="block text-sm font-medium text-gray-700">Date offline</label>
                            <input type="date" name="date_offline" id="date_offline" v-model="listing.date_offline" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                            <input type="text" name="price" id="price" v-model="listing.price" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
                            <select id="currency" name="currency" v-model="listing.currency" required class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option value="Naira">Naira</option>
                                <option value="Rand">Rand</option>
                            </select>
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="mobile" class="block text-sm font-medium text-gray-700">Mobile</label>
                            <input type="text" name="mobile" id="mobile" v-model="listing.mobile" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" id="email" v-model="listing.email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                            <select id="category" name="category" v-model="listing.category" required class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option value="Furniture">Furniture</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Cars">Cars</option>
                                <option value="Property">Property</option>
                            </select>
                        </div>

                    </div>

                    <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                    </div>

                </div>
            </div>
        </form>
    </PageComponent>
</template>

<script setup>
    import PageComponent from '../components/PageComponent.vue';
    import { ref } from "vue";
    import store from '../store';
    import { useRouter } from "vue-router";
    import ValidationErrors from "../components/ValidationErrors.vue";

    const router = useRouter();

    let listing = ref({
        title: '',
        description: null,
        date_online: null,
        date_offline: null,
        price: null,
        currency: '',
        mobile: null,
        email: '',
        category: ''
    });

    let errorMsg = ref([]);

    function saveListing(ev) {
        ev.preventDefault();
        store
            .dispatch('createListing', listing.value)
            .then((data) => {
                router.push({
                    name: 'ListingView',
                    params: { id: data.listing.id }
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