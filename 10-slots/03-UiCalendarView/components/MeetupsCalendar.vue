<template>
  <UiCalendarView>
    <template v-slot:item-slot="{ date }">
      <template v-if="getMeetupsByDate(date)">
        <UiCalendarEvent v-for="meetup in getMeetupsByDate(date)" tag="a" :href="`/meetups/${meetup.id}`">
          {{ meetup.title }}
        </UiCalendarEvent>
      </template>
    </template>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  methods: {

    getMeetupsByDate(date) {
      let currentDateMeetups = this.meetups.filter(meetup => {
        let meetupDate = new Date(meetup.date)
        return (meetupDate.getDate() == date.getDate() && meetupDate.getMonth() == date.getMonth() && meetupDate.getFullYear() == date.getFullYear())
      })

      return currentDateMeetups.length ? currentDateMeetups : false
    }

  },

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
