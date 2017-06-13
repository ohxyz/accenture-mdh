const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );
const UTILS = require( './utils' );
const expect = chai.expect;

chai.use( chaiHttp );

describe( 'Utils: getMappedKeys & getMappedObjects', () => {
    
    let fromO = {
        
        A: {
            'a1': {
                
                'a1 I': null,
                'a1 II': null
            },
            
            'a2': {
                
                'a2 III': null,
                'a2 IV': null
            }
        },
        
        B: {
            'b1': true,
            'b2': true,
            'b3': true
        },
        
        C: {
            'c1': {},
            
            'c2': {
                
                'c2 I': null,
                'c2 II': null
                
            },
            
            'c3': {
                
                'c3 III': null
            }
        }
        
    };
    
    describe( 'Test getMappedKeys', () => {
        
        it( 'returns normal resutls', () => {
        
            let names = [ 'A', 'C' ];
            let array = UTILS.getMappedKeys( names, fromO );
            let want = [ 'a1', 'a2', 'c1', 'c2', 'c3' ];
            
            expect( array ).to.eql( want );
        } );
        
        it( 'should be empty array', () => {
            
            let array = UTILS.getMappedKeys( [], fromO );
            expect( array ).to.eql( [] );
        } );
        
        it( 'should get third tier keys', () => {
            
            let firstTierKeys = [ 'A', 'C' ];
            let o = UTILS.getMappedObjects( firstTierKeys, fromO );
            // console.log( o );
            let secondTierKeys = Object.keys( o );
            
            console.log( 'second tier keys', secondTierKeys );
            let r = UTILS.getMappedKeys( secondTierKeys, o );
            console.log( 'third tier keys', r );
            
        } );
        
    } );
    
    describe( 'Test getMappedObjects', () => {
        
        it( 'returns normal resutls', () => {
        
            let names = [ 'A', 'C' ];
            let o = UTILS.getMappedObjects( names, fromO );
            
            // console.log( o );
        } );
        
        
    } );
    
    describe( 'Utils: intersectArrays', () => {
        
        it( 'should be b and c', () => {
            
            let a1 = [ 'a', 'b', 'c' ];
            let a2 = [ 'b', 'c', 'd' ];
            
            let result = UTILS.intersectArrays( a1, a2 );
            
            expect( result ).to.eql( ['b', 'c'] );
            
        } );
        
        it( 'should be b and c again', () => {
            
            let a1 = [ 'a', 'b', 'c' ];
            let a2 = [ 'b', 'c', 'd' ];
            
            let result = UTILS.intersectArrays( a2, a1 );

            expect( result ).to.eql( ['b', 'c'] );
            
        } );
        
    } );
    
    describe( 'Utils: sortArrayByObjectKey', () => {
        
        const arr = [
        
            {   
                'key 1': 2,
                'key 2': 'a'
            },
            
            {
                'key 1': 1,
                'key 2': 'c'
            },
            
            {
                'key 1': 3,
                'key 2': 'b'
            },
        ];
        
        const serverAddress = 'http://localhost:3000';
        
        chai.request( serverAddress )
            .get( '/transactions-gas.json' )
            .then( response => {

                return response.body;
            } )
            .then( body  => {
               
                console.log( body );
            } )
            .catch( error => {
                
                throw error;
                
            } );
        

        it( 'should sorted by key 1', () => { 
        
            let result = UTILS.sortArrayByObjectKey( arr, 'key 1' );
            
            console.log( arr );
        } );
        
        
         it( 'should sorted by key 2', () => { 
        
            let result = UTILS.sortArrayByObjectKey( arr, 'key 2' );
            
            console.log( arr );
        } );
        
    } );
    
    
} );