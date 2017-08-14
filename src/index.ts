const ANIMATION = 'animation';
const TRANSITION = 'transition';

/**
 * Gets element's animation/transition data
 *
 * @param {HTMLElement}  element
 */
function getAnimationsData(element: HTMLElement, pseudo?: string): AnimationsDataInterface {

    if(typeof window === 'undefined') {
        throw new Error('Browser is required');
    }

    if((element instanceof HTMLElement) === false) {
        throw new Error('Invalid element');
    }

    const props = [ANIMATION, TRANSITION];
    const styles = window.getComputedStyle(element, pseudo);
    const getPropertyValue = styles.getPropertyValue.bind(styles);

    const info: any = {
        isWebkit: !!styles['webkit' + ucfirst(ANIMATION)],
    };

    for (let i = 0; i < props.length; i++) {
        const prop = props[i];

        info[prop] = {
            duration: parseNum(getPropertyValue(prop + '-duration')),
            delay: parseNum(getPropertyValue(prop + '-delay')),
            timingFunction: parseStr(getPropertyValue(prop + '-timing-function')),
        }

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

export interface AnimationsDataInterface {
    isWebkit: boolean,

    animation: {
        name: string[],
        duration: number[],
        delay: number[],
        timingFunction: string[],
        direction: string[],
        fillMode: string[],
        iterationCount: number[],
        playState: string[],
    },

    transition: {
        property: string[],
        duration: number[],
        delay: number[],
        timingFunction: string[],
    },
}

/**
 * Gets corresponding event name if
 * animation or transition enabled
 *
 * @param {mixed}   element
 * @param {String}  prop
 * @param {String}  phase
 */
function getEventName(
    element: any,
    prop: 'animation'|'transition',
    phase: 'start'|'end'|'iteration'
) {

    if ((element instanceof HTMLElement) === false) {
        return;
    }

    const info = getAnimationsData(element);
    const eventName = info.isWebkit
        ? 'webkit' + ucfirst(prop) + ucfirst(phase)
        : prop + phase
    ;

    // transition has the 'end' phase only
    if (prop === TRANSITION && phase !== 'end') {
        return;
    }

    return eventName;
}

export { getEventName, getAnimationsData }

/**
 * Uppercases first letter
 *
 * @param  {String} str
 * @return {String}
 */
function ucfirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Parses string props
 *
 * @param {string} time
 */
function parseStr(value: string) {
    return value.split(',').map((val) => val.trim());
}

/**
 * Parses integer props
 *
 * @param {string} value
 */
function parseNum(value: string, asIs?: boolean) {
    return value.split(',').map((val) => {
        const v = val.trim();
        return v ? parseFloat(v) * (asIs ? 1 : 1e3) : 0;
    });
}