const FRAPPLESS = require('frappless-mocha');
const INDEX     = require('../index');

describe('describe', () => {

    /**
     Specs Start
    */
    let event, errorObj, dynamoResponse, requestResponse;

    beforeEach( () => {
        event           = {};
        errorObj        = {};
        dynamoResponse  = {};
        requestResponse = {};

        FRAPPLESS.nock('https://www.google.com')
            .post   ('')
            .reply  ((_response) => {
                return requestResponse;
            })
        ;

        FRAPPLESS.aws( 'DynamoDB', 'getItem', function (params, callback) {
            callback(errorObj, dynamoResponse);
        });
    });

    afterEach( () => {
        FRAPPLESS.clean();
    });
    /**
     Specs End
    */

    /**
     Tests Start
    */
    context( 'context', () => {

        it.EtoE('should', ( _done ) => {
            INDEX.handler(event, {}, function( __err, __data ){
                expect(false).to.be.equal(true);
                _done();
            })
        });

        it('should', ( _done ) => {
            INDEX.handler(event, {}, function( __err, __data ){
                expect(false).to.be.equal(true);
                _done();
            })
        });

    });
    /**
     Tests End
     */

});
