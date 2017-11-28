/**
 * Created by dcordova on 10/19/17.
 */
const WORKER = require('inbound-util').Worker;

class QuarantineWork extends WORKER {

    constructor( _activityParams ){
        super( _activityParams );
    }

    work( _err, _data ){
        console.log('!I was overWritten!');

        /** When there's an error reaching ec2 instance */
        if( _err ){
            this.softFail( _err, _data );
        } else {


            /** Insert all work here <-- */


            /** If Else example of when worker must make a decision to fail or succeed */
            if( true ){
                this.success( _data );
            } else {
                this.softFail( {err: 'stack'}, _data );
            }
        }
    }
}

module.exports = QuarantineWork;