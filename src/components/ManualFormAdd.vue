<template>
  <div class="manual-add-container">
    <h4>Добавить вручную</h4>
    <input
        v-model="newItemName"
        class="form-control mb-2"
        placeholder="Название"
        type="text"
    />
    <input
        v-model="newItemVolume"
        class="form-control mb-2"
        placeholder="Граммовка/Количество"
        type="number"
        min="0"
        step="1"
    />
    <input
        v-model="newItemPrice"
        class="form-control mb-2"
        placeholder="Цена"
        type="number"
    />
    <button @click="addItem" class="btn btn-success mb-3">Добавить</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItemName: '',
      newItemVolume: '',
      newItemPrice: ''
    };
  },
  methods: {
    addItem() {
      if (this.newItemName && this.newItemVolume && this.newItemPrice) {
        const newItem = {
          name: this.newItemName,
          volume: this.newItemVolume,
          price: this.newItemPrice,
          unit: 'г',
        };
        this.$emit('add-manual-item', newItem);
        this.newItemName = '';
        this.newItemVolume = '';
        this.newItemPrice = '';
      } else {
        alert('Пожалуйста, заполните все поля.');
      }
    }
  }
};
</script>

<style scoped>
.manual-add-container {
  margin-top: 20px;
}
</style>
