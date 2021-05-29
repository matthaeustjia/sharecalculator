<template>
  <div class="invest-box"><slot></slot></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.invest-box {
  min-height: 30vh;
  padding: 1rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: whitesmoke;
  border-radius: 0.2rem;
}
</style>
