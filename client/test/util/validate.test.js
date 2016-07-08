import {
    validateUrl,
    validateEmail,
    validateUrlImage
} from '../../src/util/validate';


describe('validate util module', () => {

    it ('should correctly validate urls', () => {
        const good_url1 = 'https://google.com/',
              good_url2 = 'http://www.hello.ua',
              good_url3 = 'http://fb.com';

        const bad_url1 = 'adgasdg.sdag',
              bad_url2 = 'hello',
              bad_url3 = 'google/com';

        expect(validateUrl(good_url1)).to.be.true;
        expect(validateUrl(good_url2)).to.be.true;
        expect(validateUrl(good_url3)).to.be.true;

        expect(validateUrl(bad_url3)).to.be.false;
        expect(validateUrl(bad_url3)).to.be.false;
        expect(validateUrl(bad_url3)).to.be.false;
    });

    it ('should correctly validate emails', () => {
        const good_email1 = 'example@test.com',
              good_email2 = 'whatever@bk.com',
              good_email3 = 'sas@sdg.eu';

        const bad_email1 = 'a@b.c',
              bad_email2 = 'email',
              bad_email3 = 'this.is.@not.an.email';

        expect(validateEmail(good_email1)).to.be.true;
        expect(validateEmail(good_email2)).to.be.true;
        expect(validateEmail(good_email3)).to.be.true;

        expect(validateEmail(bad_email3)).to.be.false;
        expect(validateEmail(bad_email3)).to.be.false;
        expect(validateEmail(bad_email3)).to.be.false;
    });

    it ('should correctly validate image urls', () => {
        const good_url1 = 'https://google.com/whatever.jpg',
              good_url2 = 'http://www.hello.ua/hello.gif',
              good_url3 = 'http://fb.com/images/2016/something.png';

        const bad_url1 = 'https://images.google.com/',
              bad_url2 = 'image.url.com',
              bad_url3 = 'imgur.com/i/picture.mp4';

        expect(validateUrlImage(good_url1)).to.be.true;
        expect(validateUrlImage(good_url2)).to.be.true;
        expect(validateUrlImage(good_url3)).to.be.true;

        expect(validateUrlImage(bad_url3)).to.be.false;
        expect(validateUrlImage(bad_url3)).to.be.false;
        expect(validateUrlImage(bad_url3)).to.be.false;
    });
})
