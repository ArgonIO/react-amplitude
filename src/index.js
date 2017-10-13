/**
 * React Amplitude Analytics
 *
 * @package react-amplitude
 * @author  Rory Garand <rory@mettleup.com>
 */

import {log, warn} from './utils/console';

var _debug = false;

const __ENV__ = process.env.NODE_ENV || 'development'; // eslint-disable-line no-underscore-dangle

if (__ENV__ !== 'test') {
  let amplitude = require('amplitude-js');
  
  const Amplitude = {
    initialize: function (amplitudeTrackingCode) {
      if (!amplitudeTrackingCode) {
        warn('amplitudeTrackingCode is required in initialize()');
        return;
      }
  
      amplitude.getInstance().init(amplitudeTrackingCode);
    },
  
    /**
     * amplitude:
     * Returns the original Amplitude object.
     */
    amplitude: function () {
      if (arguments.length > 0) {
        amplitude.apply(this, arguments);
        if (_debug) {
          log('called amplitude(\'arguments\');');
          log('with arguments: ' + JSON.stringify([].slice.apply(arguments)));
        }
        return;
      }
  
      return amplitude;
    },
  
    /**
     * event:
     * Event tracking
     * @param eventName {String} required
     * @param eventProperties {Object} optional
     */
    event: function (eventName, eventProperties) {
      if(!eventName) {
        warn('event name is required');
        return;
      }
  
      amplitude.getInstance().logEvent(eventName, eventProperties);
    },
  
    /**
     * resetUserId:
     * 
     */
    resetUserId: function () {
      amplitude.getInstance().setUserId(null);
      amplitude.getInstance().regenerateDeviceId();
    },
  
    /**
     * setUserId:
     * 
     * @param userID {String} required
     */
    setUserId: function (userID) {
      if(!userID) {
        warn('userID is required');
        return;
      }
  
      amplitude.getInstance().setUserId(userID);
    }
  };
}


export default Amplitude;