import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
export default defineComponent({

  name: 'PageMeetup',

  data() {
    return {
      meetup: null,
      isLoading: true,
      error: null,
    }
  },
  props: {

    meetupId: {
      type: Number,
      required: true,
    }
  },

  async created() {
    this.updateMeetup()
  },


  methods: {
    async updateMeetup() {
      this.isLoading = true
      this.error = null
      this.meetup = null;
      try {
        let meetup = await fetchMeetupById(this.meetupId);
        this.meetup = meetup;
      } catch (err) {
        this.error = err
      } finally {
        this.isLoading = false
      }
    }
  },

  watch: {
    meetupId() {
      this.updateMeetup()
    }
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="this.meetup"></MeetupView>

      <UiContainer v-if="isLoading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="error">
        <UiAlert>{{ error.message}}</UiAlert>
      </UiContainer>
      
    </div>`,
});
