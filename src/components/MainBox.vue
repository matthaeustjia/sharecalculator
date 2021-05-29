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

.invest-header {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  letter-spacing: -0.05em;
}

.invest-sub {
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
</style>
