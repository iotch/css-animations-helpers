import 'mocha';
import { expect } from 'chai';
import  { getAnimationsData } from '../src';
const makeDom = require('jsdom-global');

describe('getAnimationsData()', () => {

    beforeEach(function () {
        this.cleanup = makeDom();
    });

    afterEach(function () {
        this.cleanup();
    });

    it('should throw if window is not available', function() {
        this.cleanup();
        expect(getAnimationsData).to.throw('Browser is required');
        this.cleanup = makeDom();
    });

    it('should throw if invalid element', function() {
        expect(getAnimationsData).to.throw('Invalid element');
    });

    /**
     * TODO: browsers
     */
});