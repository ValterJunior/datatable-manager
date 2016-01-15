# DataTable Manager

## Synopsis
DataTable Manager is a **JavaScript** class that works as a controller for a given **"DataTable" object**. 

By using this class on your DataTable object you has a new layer over your table to manage simple requests as an **edit** or **remove** rows. You can also load quickly data from a **array of JSON objects** and defines **fields** that are not to be displayed on screen.

## Installation

Just get the `datatable-manager.js` file and attach to your own project.
> Make sure that you also have a [DataTable plugin](https://www.datatables.net) attached to your project.

## API Reference

```
// Creating a new DataTable Manager object
var man = new DataTableManager('dataTableID', 'fieldKey');
```
### Methods

#### loadData(data)

Method to load a given array of JSON objects into the table data.

##### Examples

```
// Array of JSON objects
var data = [ {id: '1', name: 'John', surname: 'Doe'}, {id: '2', name: 'Luiza', surname: 'Silva'} ];
    
// Loading data from a given array of JSON objects
man.loadData( data );
```

#### addRow(row)

Method to add a new row into the DataTable.

##### Examples

```
// JSON object as a new row
var row = {id: '3', name: 'Jimmy', surname: 'Lanne'};
    
// Adding the new row
man.addRow(row);
```

#### postRow(row)

Replace values of a row with new values using the given key.

##### Examples

```
// JSON object to replace the row with id === '1'
var row = {id: '1', name: 'Morgan', surname: 'Freeman'};
    
// Replace the row with id === '1'
man.postRow(row);
```

#### postRowByIndex(index,row)

Replace values of a row with new values using a given position.

##### Examples

```
// JSON object to replace the row values in position 2
var row = {id: '1', name: 'Morgan', surname: 'Freeman'};
    
// Replacing row values in position 2
man.postRowByIndex(2,row);
```

#### removeRowAndData(index)

Remove Datatable's row as well as the own data

##### Examples

```
// Removing row in position 2
man.removeRowAndData(2);
```

#### executeEdit(index)

Execute the edit action calling the OnEdit *callback* event.

##### Examples

```
// Calling the edit event from row in position 2.
man.executeEdit(2);
```

#### clear()

Clear all data.

##### Examples

```
// Remove all data and rows from datatable
man.clear();
```

#### refresh()

Reload all data into the datatable's rows.

##### Examples

```
// Reloading all data 
man.refresh();
```

#### getData()

Returns an array of JSON objects containing the data.

##### Examples

```
// Returns the data
var data = man.getData();
```

#### getRow(index)

Returns a JSON object containing the row values from a given position (index).

##### Examples

```
// Returns the row of position 2
var row = man.getRow();
```

#### getIndex(keyValue)

Return the row's position that contains the key value given.

##### Examples

```
// Returns the row position
var index = man.getIndex('1'); // id = '1'
```

#### getDataToString(convertHTML)

Return a JSON array data in a `string` format.
> **convertHTML** - if true, convert all HTML code inside of the string into scape code. (Useful when you need to send the whole data via POST message)

##### Examples

```
// Returns the data in string format
var data = man.getDataToSTring(true);
```

#### enableEditButton(enable)

Turns visible/hide the button to edit a **Datatable row**.

##### Examples

```
// Turning off the edit button
man.enableEditButton(false);
```

#### enableDeleteButton(enable)

Turns visible/hide the button to delete a **Datatable row**.

##### Examples

```
// Turning on the delete button
man.enableEditButton(true);
```

> By default only the **edit button** starts visible.

#### setButtonEditCSSClass(code)

Changes the CSS default of the edit button to a personal one.

##### Examples

```
// Changing the class CSS of the edit button
man.setButtonEditCSSClass('my-own-class-btn');
```

#### setIconEditCSSClass(code)

Changes the CSS default of the edit icon from the edit button to a personal one.

##### Examples

```
// Changing the class CSS of the edit icon's button
man.setIconEditCSSClass('my-own-class-icon');
```

#### setButtonRemoveCSSClass(code)

Changes the CSS default of the remove button to a personal one.

##### Examples

```
// Changing the class CSS of the remove button
man.setButtonRemoveCSSClass('my-own-class-btn');
```

#### setIconRemoveCSSClass(code)

Changes the CSS default of the remove icon from the remove button to a personal one.

##### Examples

```
// Changing the class CSS of the remove icon's button
man.setIconRemoveCSSClass('my-own-class-icon');
```

#### setHiddenFields(fields)

Array with name of fields to be hidden on grid.

##### Examples

```
// Hidding the surname field on grid.
man.setHiddenFields(['surname']);
```

### Events

#### onPrint(field, callback)

Event called when the field is printed on screen.

##### Examples

```
// Formatting the given column value before print on screen
man.onPrint( 'id', function( value ){
   
   if(value === '1'){
      return 'First row';
   }else{
      return 'Other';
   }
});
```

#### onAfterDelete(callback)

Event called after delete a row

##### Examples

```
// Executing log message after delete a row
man.onAfterDelete( function(){
    log.message('row deleted!');
});
```

#### onEdit(callback)

Event called when editting a row.

##### Examples

```
// Executing log message after delete a row
man.onEdit( function(row){
    log.message('The row id in edition is ' + row.id );
});
```


## License (MIT)

Copyright (c) Valter Junior ("Author")

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
