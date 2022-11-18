import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupDescription from '../../02-MeetupDescription/components/MeetupDescription.js';
import MeetupCover from '../../03-MeetupCover/components/MeetupCover.js';
import MeetupInfo from '../../04-MeetupInfo/components/MeetupInfo.js';
import MeetupAgenda from '../../05-MeetupAgenda/components/MeetupAgenda.js';
import MeetupAgendaItem from '../../05-MeetupAgenda/components/MeetupAgendaItem.js';

import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
    MeetupAgendaItem
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <!-- meetup cover-->
    <MeetupCover :title="meetup.title" :image="meetup.image"/>
      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <!-- meetup description -->
    <MeetupDescription :description="meetup.description"/>
            <h3>Программа</h3>
            <!-- meetup agenda -->
            <MeetupAgenda v-if="meetup.agenda.length" :agenda="meetup.agenda"/>
            <ui-alert v-else >Программа пока пуста...</ui-alert>
          </div>
          <div class="meetup__aside">
            <!-- meetup info -->
            <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date"/>
          </div>
        </div>
      </ui-container>
    </div>`,
});
