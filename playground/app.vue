<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(async () => {
 fetch('http://localhost:3001/api/data').then(res => res.json()).then(data => {
  console.log("data",data);
 })

})

</script>
<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>



<style scoped></style>
