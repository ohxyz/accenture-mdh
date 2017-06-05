
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

function getSelectedChildren( itemsSelected, fromObject) {
    
    let children = [];
    
    itemsSelected.map( item => {
        
        if ( item in fromObject ) {
            
            children = children.concat( Object.keys( fromObject[ item ] ) );
            
        }
    } );
    
    return children;
}

module.exports = {
    isDescendant: isDescendant,
    toggleArrayItem: toggleArrayItem,
    getSelectedChildren: getSelectedChildren
};