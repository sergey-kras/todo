import React, {Component} from 'react';
import WeekView from './weekView';
import CalendarEventHandler from './calendarEventHandler';
import { getItems, updateItems } from "../api";

class GoogleCalendar extends Component {
  constructor (props) {
    super (props);

    this.state = {
      events: {},
    };

    // saving data to the local storage
    window.addEventListener ('beforeunload', () => {
      const stringEvents = JSON.stringify(this.state.events);
      localStorage.setItem('events', stringEvents);
    });
  }

  async componentDidMount() {
    const items = await getItems();
    localStorage.setItem('events', JSON.stringify(items.data));

    setTimeout(() => {
      this.setState(
        {
          events: items.data || {},
        }
      );
    }, 1000);
  }

  /**
   * Add new event in the event list in the state
   * @param {Object} event - Event object
   * {
   *  start: {timeStamp} - Time stamp for the start of the event,
   *  title: {string} - Title fo the new event,
   *  end: {timeStamp} - Time stamp for the end of the event,
   * }
  */
  addNewEvent = event => {
    event = {
      ...event,
      id: CalendarEventHandler.generateId (event),
    };
    this.setState (previousSate => ({
      events: CalendarEventHandler.add (previousSate.events, event),
    }));

    setTimeout(updateItems(this.state.events), 1000);
  };

  /**
   * Updates an already existing event in the state event list
   * @param {string} event eventID id of the event
   * @param {Object} updatedEvent updated details of the event
   * {
   *  start: {timeStamp} - Time stamp for the start of the event,
   *  title: {string} - Title fo the new event,
   *  end: {timeStamp} - Time stamp for the end of the event,
   * }
  */
  updateEvent = (eventId, updatedEvent) => {
    this.setState (previousState => {
      return {
        events: CalendarEventHandler.update (
          eventId,
          updatedEvent,
          previousState.events
        ),
      };
    });

    setTimeout(updateItems(this.state.events), 1000);
  };

  /**
   * Deletes an event from the event list in the state
   * @param {String} eventId - Id of the event
  */
  deleteEvent = eventId => {
    this.setState (previousState => {
      return {
        events: CalendarEventHandler.delete (eventId, previousState.events),
      };
    });

    setTimeout(updateItems(this.state.events), 1000);
  };

  render () {
    const {events} = this.state;
    return (
      <WeekView
        events={events}
        onNewEvent={this.addNewEvent}
        onEventUpdate={this.updateEvent}
        onEventDelete={this.deleteEvent}
      />
    );
  }
}

export default GoogleCalendar;
