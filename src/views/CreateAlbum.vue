<template>
  <section>
    <h1 class="collection-title">Створити альбом</h1>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
section {
  padding: 76px 32px 0px 32px;
}
.search-grid {
  grid-gap: 24px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
.collection-title {
  color: #fff;
  overflow: hidden;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 28px;
}
.category-title-big {
  font-size: 40px;
  letter-spacing: -0.04em;
  line-height: 1.3em;
  font-weight: 600;
  max-width: 100%;
  overflow-wrap: break-word;
  padding: 16px;
  position: absolute;
}
.category-title {
  font-size: 24px;
  letter-spacing: -0.04em;
  line-height: 1.3em;
  max-width: 100%;
  overflow-wrap: break-word;
  padding: 16px;
  position: absolute;
}
.gategory {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
  padding-bottom: 100%;
}
.gategory-img {
  right: 0;
  transform: rotate(25deg) translate(18%, -2%);
  bottom: 0;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  height: 128px;
  position: absolute;
  width: 128px;
  object-fit: cover;
  object-position: center center;
}
</style>
