<template>
  <div class="container">
    <button @click="navigateToInputPage" class="btn btn-primary">Start Calculating</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToInputPage() {
      this.$router.push({ name: 'InputPage' });
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
button {
  padding: 10px 20px;
  font-size: 18px;
}
</style>
