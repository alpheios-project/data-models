import PsEventData from '../../src/ps-events/ps-event-data.js'

/**
 * An event in pub/sub (publish–subscribe) design pattern
 */
export default class PsEvent {
  /**
   * @param {string} name - A name of the event.
   * @param {Function} publisher - A constructor function of a publisher.
   *        PsEvent uses its `name` property to set its publisher name field.
   */
  constructor (name, publisher) {
    /**
     * A name of the event.
     * @type {string}
     */
    this.name = name

    /**
     * A name of the publisher.
     * @type {string}
     */
    this.publisher = publisher.name

    /**
     * A subscribers that listens to the published event.
     * @type {Function[]} - A subscriber function
     */
    this._subscribers = []
  }

  /**
   * This function is called when an event is published.
   * @callback EventSubscriber
   * @param {Object} data - An event-specific data associated with the event.
   * @param {PsEventData} eventData - A data about the event being published.
   *        PsEvent data allows generic subscribers (i.e. functions that are subscribed to
   *        more than one event) to distinguish between an event being published.
   */

  /**
   * Return a list of subscribers for the current event.
   * @return {EventSubscriber[]} An array of event subscriber functions.
   */
  get subscribers () {
    return this._subscribers
  }

  /**
   * Subscribes a function to the published event.
   * When event is published, a @type {Event~subscriber} function is called.
   * @param {EventSubscriber} subscriber - A subscriber function.
   */
  sub (subscriber) {
    this._subscribers.push(subscriber)
  }

  /**
   * Publishes an event with data related to it. All subscribers will receive an
   * event notification along with event data.
   * @param {Object} [data={}] - An event-specific data associated with the event.
   * @param {string} [caller=''] - The name of the function that called `pub`.
   */
  pub (data = {}, caller = '') {
    this._subscribers.forEach(l => l(data, new PsEventData(this, caller)))
  }
}
