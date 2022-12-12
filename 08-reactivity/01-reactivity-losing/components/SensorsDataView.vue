<template>
  <div v-if="!sensors">Loading...</div>
  <template v-else>
    <!-- <template v-for="sensor in sensors">
      {{ sensor.value }}
    </template> -->

    <sensors-data-row v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" />
  </template>
</template>

<script>
import { SensorsDataController } from '../services/SensorsDataController';
import { SensorsDataStreamingService } from '../services/SensorsDataStreamingService';
import SensorsDataRow from './SensorsDataRow';
import { reactive, toRefs, ref, toRef, triggerRef } from 'vue'

export default {
  name: 'SensorsDataView',

  components: { SensorsDataRow },

  data() {
    return {
      sensors: {},
    };
  },

  mounted() {
    this.sensorsDataController = new SensorsDataController(new SensorsDataStreamingService());
    this.sensorsDataController.addDataCallback(this.callback);

    // Раз в секунду запрашиваем и выводим новые данные сенсоров
    setInterval(() => {
      this.sensorsDataController.getData();
    }, 1000);
  },

  beforeUnmount() {
    this.sensorsDataController.removeDataCallback(this.callback);
    this.sensorsDataController.close();
  },

  methods: {
    callback(data) {
      this.setData(data);
    },
    setData(sensors) {
      const keys = Object.keys(sensors);
      keys.forEach(key => {
        this.sensors[key] = toRefs(reactive(sensors[key]))
      });
    },
  },
};
</script>

<style scoped>

</style>
