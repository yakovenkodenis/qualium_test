import {
    truncate
} from '../../src/util/text-util';


describe('Text Util module', () => {
    it ('it should truncate the string correctly', () => {
        let str = 'hello world!',
            maxLength = 8,
            useWordBoundary = true;

        expect(
            truncate(str, maxLength, useWordBoundary)
        ).to.be.equal('hello ...');

        useWordBoundary = false;

        expect(
            truncate(str, maxLength, useWordBoundary)
        ).to.be.equal('hello w ...');

        maxLength = 300;

        expect(
            truncate(str, maxLength, useWordBoundary)
        ).to.be.equal(str);
    });
})
