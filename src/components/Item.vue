<template>
  <li
    class="item--container"
  >
    <div
      :style="{ backgroundImage: `url(${item.image})` }"
      class="item--image"
      :aria-label="`Image of ${item.title}`"
      role="img"
    />
    <div class="item--text">
      <div
        @click="$emit('switch-favourite', item.id)"
        class="fav--container"
        data-testid="favourite-trigger"
      >
        <div class="fav--image" :class="{ 'is-active': item.isFavourite }"/>
      </div>
      <p class="item--title">{{ item.title }}</p>
      <p class="item--description">{{ item.description }}</p>
      <div class="item--bottom">
        <p class="item--price">{{ item.price }} €</p>
        <a
          class="item--email"
          :href="`mailto:${item.email}`"
          data-testid="email-anchor"
        >
          {{ item.email }}
        </a>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import item from '@/domain/models/item.interface'
import Vue from 'vue'

export default Vue.extend({
  name: 'Item',

  props: {
    item: {
      required: true,
      type: Object as () => item
    }
  },
  filters: {
    truncate: function (text: string):string | null {
      return text.length > 90 ? text.slice(0, 90) + '...' : text
    }
  }
})
</script>

<style lang="postcss" scoped>
.item--container {
  display: flex;
  flex-flow: column nowrap;
  flex: 0 0 calc(100% - 10px);
  margin: 15px 5px;
  padding-bottom: 5px;
  background-color: white;
  border-radius: var(--border-radius-size);
  cursor: default;
  overflow: hidden;
  transition: box-shadow .6s ease;

  @media (min-width: 600px) {
    flex: 0 0 calc(50% - 10px);
  }

  @media (min-width: 1020px) {
    flex: 0 0 100%;
    flex-flow: row;
    margin: 0 0 20px;
    padding-bottom: 0;
  }

  &:hover {
    box-shadow: 0 8px 16px 0 color-mod(#000 alpha(20%));
  }
}

.item--image {
  position: relative;
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius-size) var(--border-radius-size) 0 0;

  @media (min-width: 1020px) {
    height: 100%;
    flex: 0 0 200px;
    border-radius: var(--border-radius-size) 0 0 var(--border-radius-size);
  }
}

.item--text {
  position: relative;
  display: flex;
  flex-flow: column wrap;
  flex: 1 0 auto;
  align-items: baseline;
  padding: 0 10px 5px;

  @media (min-width: 1020px) {
    padding: 0 20px 15px 20px;
    flex-flow: row wrap;
    flex: 1 1 auto;
  }
}

.fav--container {
  position: absolute;
  top: 0;
  right: 0;
  height: 50px;
  width: 50px;
}

.fav--image {
  width: 100px;
  height: 100px;
  background: url('../assets/heart-animation.png') no-repeat;
  background-position: 0 0;
  cursor: pointer;
  transition: background-position 1s steps(28);
  transition-duration: 0s;
  transform: scale(.5) translate(-50%, -50%);

  &.is-active {
    transition-duration: 1s;
    background-position: -2800px 0;
  }
}

.item--title {
  margin-bottom: 0;

  @media (min-width: 1020px) {
    flex: 1 0 100%;
    font-size: 18px;
  }
}

.item--description {
  font-size: 12px;

  @media (min-width: 1020px) {
    font-size: 14px;
  }

  @media (min-width: 1200px) {
    max-width: 1000px;
  }
}

.item--bottom {
  display: flex;
  width: 100%;
  margin-top: auto;
  padding-top: 10px;
}

.item--price {
  margin: 0;
  flex: 0 0 50%;
  font-size: 15px;
  font-weight: bold;

  @media (min-width: 1020px) {
    font-size: 20px;
    flex: 1 0 auto;
  }
}

.item--email {
  flex: 0 0 50%;
  font-size: 12px;
  color: var(--main-color);
  text-align: right;
  text-decoration: none;

  @media (min-width: 1020px) {
    font-size: 15px;
    flex: 0 1 auto;
  }
}

img {
  max-width: 100%;
}
</style>
