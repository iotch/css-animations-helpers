"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ANIMATION = 'animation';
var TRANSITION = 'transition';
/**
 * Gets element's animation/transition data
 *
 * @param {HTMLElement}  element
 */
function getAnimationsData(element, pseudo) {
    if (typeof window === 'undefined') {
        throw new Error('Browser is required');
    }
    if ((element instanceof HTMLElement) === false) {
        throw new Error('Invalid element');
    }
    var props = [ANIMATION, TRANSITION];
    var styles = window.getComputedStyle(element, pseudo);
    var getPropertyValue = styles.getPropertyValue.bind(styles);
    var info = {
        isWebkit: !!styles['webkit' + ucfirst(ANIMATION)],
    };
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        info[prop] = {
            duration: parseNum(getPropertyValue(prop + '-duration')),
            delay: parseNum(getPropertyValue(prop + '-delay')),
            timingFunction: parseStr(getPropertyValue(prop + '-timing-function')),
        };
        if (prop === TRANSITION) {
            info[prop].property = parseStr(getPropertyValue(prop + '-property'));
        }
        if (prop === ANIMATION) {
            info[prop].name = parseStr(getPropertyValue(prop + '-name'));
            info[prop].direction = parseStr(getPropertyValue(prop + '-direction'));
            info[prop].fillMode = parseStr(getPropertyValue(prop + '-fill-mode'));
            info[prop].iterationCount = parseNum(getPropertyValue(prop + '-iteration-count'), true);
            info[prop].playState = parseStr(getPropertyValue(prop + '-play-state'));
        }
    }
    return info;
}
exports.getAnimationsData = getAnimationsData;
/**
 * Gets corresponding event name if
 * animation or transition enabled
 *
 * @param {mixed}   element
 * @param {String}  prop
 * @param {String}  phase
 */
function getEventName(element, prop, phase) {
    if ((element instanceof HTMLElement) === false) {
        return;
    }
    var info = getAnimationsData(element);
    var eventName = info.isWebkit
        ? 'webkit' + ucfirst(prop) + ucfirst(phase)
        : prop + phase;
    // transition has the 'end' phase only
    if (prop === TRANSITION && phase !== 'end') {
        return;
    }
    return eventName;
}
exports.getEventName = getEventName;
/**
 * Uppercases first letter
 *
 * @param  {String} str
 * @return {String}
 */
function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Parses string props
 *
 * @param {string} time
 */
function parseStr(value) {
    return value.split(',').map(function (val) { return val.trim(); });
}
/**
 * Parses integer props
 *
 * @param {string} value
 */
function parseNum(value, asIs) {
    return value.split(',').map(function (val) {
        var v = val.trim();
        return v ? parseFloat(v) * (asIs ? 1 : 1e3) : 0;
    });
}
