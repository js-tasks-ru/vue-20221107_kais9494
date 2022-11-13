import { createApp } from './vendor/vue.esm-browser.js';


const app = createApp({
    data() {
        return {
            a: 0,
            b: 0,
            action: '',
        }
    },
    computed: {
        result() {
            switch (this.action) {
                case 'sum':
                    return this.a + this.b
                    break;
                case 'subtract':
                    return this.a - this.b
                    break;
                case 'multiply':
                    return this.a * this.b
                    break;
                case 'divide':
                    return this.a / this.b
                    break;
            }
        }
    }
}).mount('#app');