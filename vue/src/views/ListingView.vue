<template>
    <PageComponent :title="listing.title">
        
    </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import { ref } from "vue";
import store from '../store';
import { useRoute } from "vue-router";

const route = useRoute();

let listing = ref({
    title: '',
    image: null,
    description: null,
    date_online: null,
    date_offline: null,
    price: null,
    currency: null,
    mobile: null,
    email: '',
    category: null

});

if (route.params.id) {
    listing.value = store.state.listings.find((listing) => listing.id === parseInt(route.params.id))
}
</script>

<style lang="scss" scoped>

</style>