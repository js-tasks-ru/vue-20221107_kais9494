import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
export default defineComponent({

  name: 'PageMeetup',

  data() {
    return {
      meetup: {},
      isLoading: true,
      isError: false

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
      this.isError = false
      this.meetup = {};
      try {
        let meetup = await fetchMeetupById(this.meetupId);
        if (meetup) {
          this.meetup = meetup;
        }

      } catch {
        this.isError = true
        this.meetup = {};
      }
      this.isLoading = false
    }
  },

  watch: {
    meetupId(old, newVal) {
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
      <MeetupView v-if="!isLoading && !isError" :meetup="this.meetup"></MeetupView>
      <!-- meetup view -->
      <UiContainer v-if="isLoading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="isError">
        <UiAlert>Test Error</UiAlert>
      </UiContainer>
      
    </div>`,
});
