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
      <p class="item--title">{{ item.title }}</p>
      <p class="item--description">{{ item.description | truncate }}</p>
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
.item-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0 -5px;
}

.item--container {
  flex: 0 0 calc(50% - 10px);
  margin: 15px 5px;
  background-color: white;
  border-radius: var(--border-radius-size);
  transition: box-shadow .6s ease;

  &:hover {
    box-shadow: 0 8px 16px 0 color-mod(#000 alpha(20%));
  }
}

.item--image {
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius-size) var(--border-radius-size) 0 0;
}

.item--text {
  padding: 0 10px 10px;
}

.item--title {
  text-align: left;
}

.item--description {
  font-size: 12px;
  text-align: left;
}

img {
  max-width: 100%;
}
</style>
