/**
 * @description Class responsible for manage data into a DataTable object
 * 
 * @param {string} dataTableID Datatable's id to manage (required)
 * @param {string} keyField Field used as key in the data
 * @returns {object}
 */
function DataTableManager( dataTableID, keyField ){
    
    this.table                 = $('#' + dataTableID).DataTable();
    this.key                   = keyField;
    this.classesButtons        = { buttonEdit: 'btn-circle bg-color-blue txt-color-white', iconEdit: 'fa fa-edit', buttonRemove: 'btn-circle btn-danger', iconRemove: 'fa fa-trash-o' };
    this.CLASS_DELETE          = 'tbl-man-' + dataTableID + '-del';
    this.CLASS_EDIT            = 'tbl-man-' + dataTableID + '-edit';
    this.BTN_EDIT              = 0;
    this.BTN_DELETE            = 1;
    this.enableDelete          = true;
    this.enableEdit            = false;
    this.data                  = [];
    this.onPrintCallBack       = [];
    this.onAfterDeleteCallBack = null;
    this.onEditCallBack        = null;
    this.hiddenFields          = [];

    var self = this;

    $('#' + dataTableID + ' tbody').on('click', 'tr a.' + this.CLASS_DELETE, function(){
        var index = self.table.row( $(this).closest("tr") ).index();
        self.removeRowAndData(index);
        
    });
    
    $('#' + dataTableID + ' tbody').on('click', 'tr a.' + this.CLASS_EDIT, function(){
        var index = self.table.row( $(this).closest("tr") ).index();
        self.executeEdit( index );
        
    });
    
    this.getButtonCode = function( btn ){
        
        var result = '';
        
        if( btn === this.BTN_EDIT ){
            result = '<a href="javascript:void(0);" class="' + this.classesButtons.buttonEdit   + ' dtm-edit-btn '   + this.CLASS_EDIT   + '"><i class="' + this.classesButtons.iconEdit   + ' dtm-edit-icon"></i></a>';
        }else if( btn === this.BTN_DELETE ){
            result = '<a href="javascript:void(0);" class="' + this.classesButtons.buttonRemove + ' dtm-remove-btn ' + this.CLASS_DELETE + '"><i class="' + this.classesButtons.iconRemove + ' dtm-remove-icon"></i></a>';
        }
        
        return result;
        
    };
    
    this.getCallBackPrint = function( field ){
      
        for( var x in this.onPrintCallBack ){
            if( this.onPrintCallBack[x].field === field ){
                return this.onPrintCallBack[x].callback;
            }
        }
        
    };
    
    this.isIndexOnRange = function( index ){
        return (this.getData().length > 0) && (index >= 0) && (index < this.getData().length);
    };
    
    this.isHiddenField = function( field ){
        return $.inArray( field, this.hiddenFields, 0 ) >= 0;
    };
    
    this.setButton = function( row ){

        var buttons = '';

        if( this.enableEdit ){
           buttons += this.getButtonCode( this.BTN_EDIT );
        }

        if( this.enableDelete ){
            buttons += this.getButtonCode( this.BTN_DELETE );
        }

        if( buttons.length > 0 ){
            row.push( buttons );
        }

    };

    this.clear();
    
};

/**
 * @description Set the CSS classes to the grid's edit button
 * @param {string} code String containing the CSS class(es) to be attached
 */
DataTableManager.prototype.setButtonEditCSSClass = function( code ){
    
    if( (typeof code === 'string') && code.length > 0 ){
        this.classesButtons.buttonEdit = code;
    }
    
};

/**
 * @description Set the CSS classes to the grid's edit icon (into grid's edit button)
 * @param {string} code String containing the CSS class(es) to be attached
 */
DataTableManager.prototype.setIconEditCSSClass = function( code ){
    
    if( (typeof code === 'string') && code.length > 0 ){
        this.classesButtons.iconEdit = code;
    }
    
};

/**
 * @description Set the CSS classes to the grid's remove button
 * @param {string} code String containing the CSS class(es) to be attached
 */
DataTableManager.prototype.setButtonRemoveCSSClass = function( code ){
    
    if( (typeof code === 'string') && code.length > 0 ){
        this.classesButtons.buttonRemove = code;
    }
    
};

/**
 * @description Set the CSS classes to the grid's 'remove icon' (into grid's 'remove button')
 * @param {string} code String containing the CSS class(es) to be attached
 */
DataTableManager.prototype.setIconRemoveCSSClass = function( code ){
    
    if( (typeof code === 'string') && code.length > 0 ){
        this.classesButtons.iconRemove = code;
    }
    
};

/**
 * @description Enable the button to delete a Datatable's row
 * @param {bool} enable Enable delete button
 */
DataTableManager.prototype.enableDeleteButton = function( enable ){
    this.enableDelete = enable;
};

/**
 * @descrition Enable the button to edit a Datatable's row
 * @param {bool} enable Enable edit button
 */
DataTableManager.prototype.enableEditButton = function( enable ){
    this.enableEdit = enable;
};

/**
 * @description Load data from a JSON array to Datatable
 * @param {JSON} data JSON array with data
 */
DataTableManager.prototype.loadData = function( data ){

    if( data ){
        
        for( var i = 0; i < data.length; i++ ){
            this.addRow(data[i]);    
        }
        
    }
    
};

/**
 * @description Add a new row to the table
 * @param {JSON} row New row to add
 */
DataTableManager.prototype.addRow = function( row ){

    var keys    = Object.keys(row);
    var rowTemp = [];
    
    for( var i = 0; i < keys.length; i++ ){
        
        if( keys[i] !== this.key && !this.isHiddenField( keys[i] ) ){
            
            var callback = this.getCallBackPrint( keys[i] );
            
            if( callback ){
                rowTemp.push( callback( row[keys[i]] ) );
            }else{
                rowTemp.push( row[keys[i]] );
            }
        }
    }
    
    if( rowTemp.length > 0 ){
        this.setButton(rowTemp);
        this.table.row.add( rowTemp ).draw().index();
    }
    
    this.data.push(row);
    
};

/**
 * @description Remove Datatable's row as well as the own data
 * @param {int} index Row's position
 */
DataTableManager.prototype.removeRowAndData = function( index ){

    this.table.row( index ).remove().draw();
    
    if( this.isIndexOnRange( index ) ){
        this.data.splice(index,1);
    }
    
    if( this.onAfterDeleteCallBack ){
        this.onAfterDeleteCallBack();
    }
    
};

/**
 * @description Execute the edit action calling the OnEdit CallBack
 * @param {int} index Row's position to edit
 */
DataTableManager.prototype.executeEdit = function( index ){
    
    if( this.isIndexOnRange( index ) ){
        
        if( this.onEditCallBack ){
            this.onEditCallBack( this.data[index] );
        }
        
    }
    
};

/**
 * @description Returns the JSON array data updated
 * @return {JSON} JSON array with data
 */
DataTableManager.prototype.getData = function(){
    return this.data;
};

/**
 * @description Return a JSON array with the row values
 * @param {int} index Row's position
 * @return {JSON} JSON array with the row's data
 */
DataTableManager.prototype.getRow = function( index ){
    
    if( this.isIndexOnRange( index )  ){
        return this.getData()[index];
    }else{
        return null;
    }
    
};

/**
 * @description Return the row's position that contains the key value
 * @param {string} key Key value to search
 * @return {int} row's position
 */
DataTableManager.prototype.getIndex = function( key ){

    if( this.getData().length > 0 ){
    
        var i;
    
        for( i in this.getData() ){

            if( this.getData()[i][this.key] === key ){
                return i;
            }

        }
        
    }
    
    return -1;
    
};

/**
 * @description Replace a row's values with new values using a given position
 * @param {int} index Row's position
 * @param {JSON} newRow JSON array with the new row values
 */
DataTableManager.prototype.postRowByIndex = function( index, newRow ){
  
    if( index >= 0 ){

        var keys   = Object.keys( newRow );
        var oldRow = this.getRow( index );

        if( oldRow ){

          var i;

          for( i in keys ){

            if( keys[i] !== this.key && oldRow.hasOwnProperty( keys[i] ) ){
              oldRow[ keys[i] ] = newRow[ keys[i] ];
            }

          }

          this.refresh();

        }

    }
      
};

/**
 * @description Replace a row's values with new values using the key value given
 * @param {JSON} newRow JSON array with the new row values
 */
DataTableManager.prototype.postRow = function( newRow ){
    
    var index = this.getIndex( newRow[this.key] );
    
    if( newRow.hasOwnProperty( this.key ) ){
        this.postRowByIndex( index, newRow );
    }
    
};

/**
 * @description Return a JSON array data in a string format
 * @param {bool} convertHTML Convert the HTML characters to string escape code
 * @return {string} String of the JSON array
 */
DataTableManager.prototype.getDataToString = function( convertHTML ){
    
    var json = JSON.stringify( this.getData() );
    
    if( convertHTML ){
        return escapeHtmlJson( json );
    }else{
        return json;
    }
    
};

/**
 * @description Clear all data
 */
DataTableManager.prototype.clear = function(){
    this.data = [];
    this.table.clear().draw();
};

/**
 * @description Reload all data
 */
DataTableManager.prototype.refresh = function(){
    
    var dataTemp = this.data;
    
    this.clear();
    this.loadData( dataTemp );
    
};

/**
 * @description Event called when the field is printed
 * @param {string} field Field's name
 * @param {function} callback Event function
 */
DataTableManager.prototype.onPrint = function( field, callback ){
    this.onPrintCallBack.push( { field: field, callback: callback } );
};

/**
 * @description Event called after delete a row
 * @param {function} callback Event function
 */
DataTableManager.prototype.onAfterDelete = function( callback ){
    this.onAfterDeleteCallBack = callback;
};

/**
 * @description Event called on edit
 * @param {function} callback Event function
 */
DataTableManager.prototype.onEdit = function( callback ){
    this.onEditCallBack = callback;
};

/**
 * @description Array with name of field to hidden on grid
 * @param {array} fields Array with the field's name
 */
DataTableManager.prototype.setHiddenFields = function( fields ){
    this.hiddenFields = fields;
};
