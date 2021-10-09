<template>
  <div class="top-bar" :class="{ 'accent' : pageScrolled }">
    <div class="container">
      <div class="top-bar--container">
        <i class="top-bar--logo" />
        <button
          class="top-bar--button"
          data-testid="see-favourite-button"
          @click="$emit('see-favourite-modal')"
        >
        Ver Favoritos
      </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TopBar',

  data () {
    return {
      pageScrolled: false
    }
  },

  mounted () {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        this.pageScrolled = true

        return
      }
      this.pageScrolled = false
    })
  }
})
</script>

<style lang="postcss" scoped>
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid white;
  transition: border .3s ease;

  &.accent {
    border-bottom: 1px solid var(--main-color);
  }
}

.top-bar--container {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.top-bar--logo {
  flex: 0 0 38px;
  height: 38px;
  background: url('../assets/logo.svg');
  background-size: contain;
  border-radius: 10px;
  box-shadow: 2px 2px 5px 0 color-mod(#000 alpha(20%));
}

.top-bar--button {
  font-size: 13px;
  color: var(--main-color);
  background-color: white;
  border: 1px solid var(--main-color);
  border-radius: var(--border-radius-size);
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    color: white;
    background-color: var(--main-color);
  }
}
</style>
