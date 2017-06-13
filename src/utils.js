/* Utils */

function isDescendant( childElem, parentElem ) {
    
    let node = childElem.parentNode;
    while ( node !== null ) {
        
        if ( node === parentElem ) {
            return true;
        }
        
        node = node.parentNode;
    }
    
    return false;
}

function toggleArrayItem( item, array ) {
    
    let index = array.indexOf( item );
    
    if ( index === -1 ) {
        
        array.push( item );
    }
    else {
        
        array.splice( index, 1 );
    }
    
}

function getMappedKeys( keysSelected, fromObject ) {
    
    let keys = [];
    
    keysSelected.map( key => {
        
        if ( key in fromObject ) {
            
            keys = keys.concat( Object.keys( fromObject[ key ] ) );
            
        }
        
        return true;
    } );
    
    return keys;
}

function getMappedObjects( keysSelected, fromObject ) {
    
    let objects = {};
    
    keysSelected.map( key => {
        
        if ( key in fromObject ) {
            
            let objectFromKey = fromObject[ key ];
            
            for ( let subKey in objectFromKey ) {
                
                objects[ subKey ] = objectFromKey[ subKey ];
            }
        }
        
        return true;
        
    } );
    
    return objects;
}

function JSONCopy( obj ) {
    
    return JSON.parse( JSON.stringify( obj ) );
}

function intersectArrays( array, array2 ) {
    
    let newArray = array.filter( el => {
        
        if ( array2.indexOf( el ) !== -1  ) {
            
            return true;
        }
        
        return false;
    } );
    
    return newArray;
}

function isNumber( obj ) {
    
    if ( isNaN( obj ) === true ) {
        
        return false;
    }
    
    return true;
}

function sortArrayByObjectKey( array, objectKey, secondObjectKey ) {
    
    function sortFn( item1, item2 ) {
        
        let a = item1[ objectKey ];
        let b = item2[ objectKey ];
        
        if ( a === null ) {
            
            a = '';
        }
        
        if ( b === null ) {
            
            b = '';
        }
        
        if ( isNumber( a ) === true 
                && isNumber( b ) === true )
        {
            return a - b;
        }
        
        return a.localeCompare( b );
    } 
    
    

    let sorted = array.sort( sortFn);
    
    return sorted;
}

module.exports = {
    isDescendant: isDescendant,
    toggleArrayItem: toggleArrayItem,
    getMappedKeys: getMappedKeys,
    getMappedObjects: getMappedObjects,
    JSONCopy: JSONCopy,
    intersectArrays: intersectArrays,
    sortArrayByObjectKey: sortArrayByObjectKey
};