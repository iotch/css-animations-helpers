/**
 * Gets element's animation/transition data
 *
 * @param {HTMLElement}  element
 */
declare function getAnimationsData(element: HTMLElement, pseudo?: string): AnimationsDataInterface;
export interface AnimationsDataInterface {
    isWebkit: boolean;
    animation: {
        name: string[];
        duration: number[];
        delay: number[];
        timingFunction: string[];
        direction: string[];
        fillMode: string[];
        iterationCount: number[];
        playState: string[];
    };
    transition: {
        property: string[];
        duration: number[];
        delay: number[];
        timingFunction: string[];
    };
}
/**
 * Gets corresponding event name if
 * animation or transition enabled
 *
 * @param {mixed}   element
 * @param {String}  prop
 * @param {String}  phase
 */
declare function getEventName(element: any, prop: 'animation' | 'transition', phase: 'start' | 'end' | 'iteration'): string | undefined;
export { getEventName, getAnimationsData };
