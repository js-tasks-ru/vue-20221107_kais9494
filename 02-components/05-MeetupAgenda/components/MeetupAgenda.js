import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
  props: {
    agenda: Array,
  },
  components: {
    'MeetupAgendaItem': MeetupAgendaItem,
  },
  template: `
    <ul class="agenda">
      <li v-for="agendaItem in agenda" class="agenda__item">
        <MeetupAgendaItem  :agendaItem="agendaItem" :key="agendaItem.id" />
    </li>
    </ul>`,
});
