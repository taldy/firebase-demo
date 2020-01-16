<template>
  <div class="benchmark">
    <h1>Benchmark</h1>

    <div class="results">
      <div class="firebase-results result">
        <strong v-for="result in firestoreResults" :key="result.value"
          >{{ result.result }} ms
        </strong>
        <button type="button" @click="runFirebaseTest">Test Firebase</button>
      </div>

      <div class="rtdb-results result">
        <strong v-for="result in rtdbResults" :key="result.value"
          >{{ result.result }} ms
        </strong>
        <button type="button" @click="runRTDBTest">Test Realtime Database</button>
      </div>
    </div>
  </div>
</template>

<script>
import { firestore, rtdb } from '@/firebase';

const firebaseBenchmarkDoc = firestore.collection('benchmark').doc('firebase');
const rtdbBenchmarkDoc = rtdb.ref('benchmark');

export default {
  name: 'benchmark',
  data() {
    return {
      unsubscriber: null,
      firestoreInitialResult: false,
      firestoreResults: [],
      rtdbInitialResult: false,
      rtdbResults: [],
      persistenceMode: localStorage.firebasePersistence === 'true',
    };
  },
  mounted() {
    this.unsubscriber = firebaseBenchmarkDoc.onSnapshot((doc) => {
      const { value } = doc.data() || {};
      console.timeEnd(value);

      if (!this.firestoreInitialResult) {
        this.firestoreInitialResult = true;
      } else {
        this.firestoreResults.push({ value, result: this.getTimestamp() - value || 0 });
      }
    });

    rtdbBenchmarkDoc.on('value', (snapshot) => {
      const value = snapshot.val() || {};
      console.timeEnd(value);

      if (!this.rtdbInitialResult) {
        this.rtdbInitialResult = true;
      } else {
        this.rtdbResults.push({ value, result: this.getTimestamp() - value || 0 });
      }
    });
  },
  destroyed() {
    this.unsubscriber();
    rtdbBenchmarkDoc.off();
  },
  methods: {
    runFirebaseTest() {
      const timestamp = this.getTimestamp();
      console.time(timestamp);
      firebaseBenchmarkDoc.set({ value: timestamp });
    },
    runRTDBTest() {
      const timestamp = this.getTimestamp();
      console.time(timestamp);
      rtdbBenchmarkDoc.set(timestamp);
    },
    getTimestamp() {
      return new Date().getTime();
    },
  },
};
</script>

<style scoped>
.results {
  display: flex;
  flex-direction: row;
  margin-top: 50px;
}

.result {
  flex: 1;
  border: solid 1px #ddd;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

strong {
  line-height: 25px;
}

button {
  width: 250px;
  font-size: 20px;
}
</style>
