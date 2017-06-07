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
        
        return null;
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
        
        return null;
        
    } );
    
    return objects;
}

function getObjectsByDepth( depth, fromObject ) {
    
    
    
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


module.exports = {
    isDescendant: isDescendant,
    toggleArrayItem: toggleArrayItem,
    getMappedKeys: getMappedKeys,
    getMappedObjects: getMappedObjects,
    JSONCopy: JSONCopy,
    intersectArrays: intersectArrays
};