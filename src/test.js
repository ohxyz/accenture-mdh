const expect = require('chai').expect;
const UTILS = require('./utils');

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
    
    
} );