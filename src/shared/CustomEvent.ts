/* istanbul ignore file */
(function () {
  if ( typeof window.CustomEvent === 'function' ) return false;

  function CustomEvent (
    eventName, { bubbles, cancelable, detail } = { bubbles: false, cancelable: false, detail: null }
  ) {
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent(eventName, bubbles, cancelable, detail);
    return evt;
   }
  // @ts-ignore
  window.CustomEvent = CustomEvent;
})();