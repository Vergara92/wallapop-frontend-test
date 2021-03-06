<template>
  <li
    class="item--container"
    data-test-id="item-general"
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
        data-test-id="favourite-trigger"
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
          data-test-id="email-anchor"
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

  .favourite-modal & {
    position: relative;
  }

  &:last-child {
    .favourite-modal & {
      &::before {
        content: none;
      }
    }
  }

  &:hover {
    box-shadow: 0 8px 16px 0 color-mod(#000 alpha(20%));

    .favourite-modal & {
      box-shadow: none;
    }
  }

  &::before {
    .favourite-modal & {
      content: '';
      position: absolute;
      right: 0;
      bottom: -5px;
      left: 0;
      height: 1px;
      background-color: color-mod(#000 alpha(50%));

      @media (min-width: 600px) {
        display: none;
      }

      @media (min-width: 1020px) {
        display: block;
        bottom: -10px;
      }
    }
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

  .favourite-modal & {
    @media (min-width: 600px) {
      border: 1px solid color-mod(#000 alpha(50%));
      border-top: 0;
      border-radius: 0 0 var(--border-radius-size) var(--border-radius-size);
    }

    @media (min-width: 1020px) {
      border: 0;
    }
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

  .favourite-modal & {
    display: none;
  }
}

.item--bottom {
  display: flex;
  width: 100%;
  margin-top: auto;
  padding-top: 10px;

  .favourite-modal & {
    display: none;
  }
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
