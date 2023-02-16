<template>
    <div class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[170px]">
        <h4 class="mt-4 text-lg font-bold">{{ truncate(listing.title, 25) }}</h4>
        <div v-html="truncate(listing.description, 60)" class="overflow-hidden flex-1"></div>

        <div class="mt-3">
            <router-link :to="{ name: 'ListingView', params: { id: listing.id } }"
                class="flex justify-center py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">View</router-link>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(['listing'])

    function truncate(value, length) {
        if (value.length > length) {
            return value.substring(0, length) + "...";
        } else {
            return value;
        }
    }
</script>

<style lang="scss" scoped>

</style>