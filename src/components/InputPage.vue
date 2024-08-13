<template>
  <div class="container mt-4">
    <input
        type="text"
        class="form-control mb-3"
        placeholder="Введите данные"
        v-model="searchQuery"
    />
    <ul class="list-group" v-if="searchQuery">
      <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="item in filteredItems"
          :key="item.name"
          @click="prepareToAddToBill(item)"
          style="cursor: pointer;"
      >
        {{ item.name }} - {{ calculatePrice(item, item.base_volume) }} UAH за {{ item.base_volume }} {{ getUnit(item.type) }}
      </li>
    </ul>
    <p v-if="searchQuery && !filteredItems.length" class="text-danger">Нет результатов</p>

    <div v-if="selectedItem && (selectedItem.type === 'drink' || selectedItem.type === 'alcohol')" class="mb-3">
      <p>Выберите объем для {{ selectedItem.name }}:</p>
      <select v-model="selectedVolume" class="form-select">
        <option :value="50">50 мл</option>
        <option :value="100">100 мл</option>
        <option :value="150">150 мл</option>
        <option :value="200">200 мл</option>
        <option :value="250">250 мл</option>
        <option :value="300">300 мл</option>
        <option :value="350">350 мл</option>
        <option :value="400">400 мл</option>
        <option :value="500">500 мл</option>
        <option :value="1000">1 л</option>
      </select>
      <button @click="addToBillWithVolume" class="btn btn-primary mt-2">Добавить</button>
    </div>

    <div v-if="selectedItem && (selectedItem.type === 'bread' || selectedItem.type === 'picled')" class="mb-3">
      <p>Выберите количество для {{ selectedItem.name }}:</p>
      <select v-model="selectedVolume" class="form-select">
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>
        <option :value="4">4</option>
        <option :value="5">5</option>
        <option :value="6">6</option>
        <option :value="7">7</option>
        <option :value="8">8</option>
        <option :value="9">9</option>
        <option :value="10">10</option>
      </select>
      <button @click="addToBillWithVolume" class="btn btn-primary mt-2">Добавить</button>
    </div>

    <!-- Grill Weight Selection -->
    <div v-if="selectedItem && selectedItem.type === 'grill'" class="mb-3">
      <p>Выберите вес для {{ selectedItem.name }}:</p>
      <select v-model="selectedVolume" class="form-select">
        <option :value="200">200 г</option>
        <option :value="300">300 г</option>
        <option :value="400">400 г</option>
        <option :value="500">500 г</option>
        <option :value="600">600 г</option>
        <option :value="1000">1 кг</option>
        <option :value="1500">1.5 кг</option>
        <option :value="2000">2 кг</option>
      </select>
      <button @click="addToBillWithVolume" class="btn btn-primary mt-2">Добавить</button>
    </div>
    <h3 class="mt-4">Список для формирования счета:</h3>
    <ul class="list-group mb-3" v-if="billItems.length">
      <li
          class="list-group-item d-flex justify-content-between align-items-center m-2 p-2"
          v-for="(item, index) in billItems"
          :key="index"
      >
        {{ item.name }} - {{ item.volume }} {{ item.unit }} - {{ item.price }} UAH
        <button @click="removeFromBill(index)" class="btn btn-sm btn-danger m-2">Удалить</button>
      </li>
    </ul>
    <p v-else class="text-muted">Список пуст</p>
    <div v-if="billItems.length" class="mb-3">
      <label for="serviceCharge" class="form-label">Процент за обслуживание:</label>
      <select v-model="serviceCharge" id="serviceCharge" class="form-select mb-3">
        <option :value="0">0%</option>
        <option :value="10">10%</option>
        <option :value="15">15%</option>
        <option :value="20">20%</option>
      </select>
      <h3>Итоговая сумма: {{ calculateTotal() }} UAH</h3>
      <button @click="saveBill" class="btn btn-primary ">Сохранить счет</button>
      <button @click="clearBill" class="btn btn-outline-danger m-2">Очистить счет</button>
    </div>
  </div>
</template>
<script>
import menuData from '@/data/menu.json';

export default {
  name: 'InputPage',
  data() {
    return {
      searchQuery: '',
      menuItems: menuData.menu,
      billItems: [],
      selectedItem: null,
      selectedVolume: null,
      serviceCharge: 0
    };
  },
  computed: {
    filteredItems() {
      const query = this.searchQuery.toLowerCase();
      return this.menuItems.filter(item =>
          item.name.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    prepareToAddToBill(item) {
      this.selectedItem = item;
      if (item.type === 'drink'
          || item.type === 'alcohol'
          || item.type === 'bread'
          || item.type === 'picled'
          || item.type === 'grill'
      ) {
        this.selectedVolume = item.base_volume;
      } else {
        this.addToBillWithVolume();
      }
    },
    addToBillWithVolume() {
      if (this.selectedItem) {
        const calculatedPrice = this.calculatePrice(this.selectedItem, this.selectedVolume);
        const itemToAdd = {
          name: this.selectedItem.name,
          price: calculatedPrice,
          volume: this.selectedVolume || this.selectedItem.base_volume,
          unit: this.getUnit(this.selectedItem.type)
        };
        this.billItems.push(itemToAdd);
        this.selectedItem = null;
        this.selectedVolume = null;
        this.saveBill();
      }
    },
    removeFromBill(index) {
      this.billItems.splice(index, 1);
      this.saveBill();
    },
    calculatePrice(item, volume) {
      if (item.type === 'drink' || item.type === 'alcohol') {
        return ((item.price / item.base_volume) * volume).toFixed(2);
      }
      if (item.type === 'bread' || item.type === 'picled') {
        return (item.price * volume).toFixed(2);
      }
      if (item.type === 'grill') {
        return ((item.price / item.base_volume) * volume).toFixed(2);
      }
      return item.price;
    },
    getUnit(type) {
      if (type === 'drink' || type === 'alcohol') {
        return 'мл';
      }
      if (type === 'bread') {
        return 'шматочків';
      }
      if (type === 'soup'
          || type === 'grill'
          || type === 'kebab'
          || type === 'second_course'
          || type === 'appetizer'
          || type === 'dessert') {
        return 'г';
      }
      return 'шт';
    },
    calculateTotal() {
      const subtotal = this.billItems.reduce((total, item) => total + parseFloat(item.price), 0);
      const serviceChargeAmount = (subtotal * this.serviceCharge) / 100;
      return (subtotal + serviceChargeAmount).toFixed(2);
    },
    saveBill() {
      localStorage.setItem('billItems', JSON.stringify(this.billItems));
      localStorage.setItem('serviceCharge', this.serviceCharge);
    },
    loadBill() {
      const savedBill = localStorage.getItem('billItems');
      const savedServiceCharge = localStorage.getItem('serviceCharge');
      if (savedBill) {
        this.billItems = JSON.parse(savedBill);
      }
      if (savedServiceCharge) {
        this.serviceCharge = parseFloat(savedServiceCharge);
      }
    },
    clearBill() {
      this.billItems = [];
      this.serviceCharge = 0;
      localStorage.removeItem('billItems');
      localStorage.removeItem('serviceCharge');
    }
  },
  mounted() {
    this.loadBill();
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}
input {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 5px 0;
  border: 1px solid;
  font-size: 16px;
}
select {
  margin-right: 10px;
  padding: 5px;
  font-size: 16px;
}
button {
  padding: 5px 10px;
  font-size: 16px;
  margin-left: 10px;
}
</style>
