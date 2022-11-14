import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const app = createApp({
  data() {
    return {
      currMetup: null,
      id: null,
    }
  },
  watch: {
    async id() {
      let infoMetup = await fetchMeetupById(this.id)
      this.currMetup = infoMetup.title
    }
  }
}).mount('#app')