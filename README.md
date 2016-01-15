# DataTable Manager

## Synopsis
DataTable Manager is a **JavaScript** class that works as a controller for a given **"DataTable" object**. 

By using this class on your DataTable object you has a new layer over your table to manager simple requests as an **edit** or **remove** rows. You can also load quickly data from a **array of JSON objects** and defines **fields** that are not be displayed on screen.

## Installation

Just get the `datatable-manager.js` file and attach in your own project.

## API Reference (Methods)

    // Creating a new DataTable Manager object
    var man = new DataTableManager('dataTableID', 'fieldKey');

### man.loadData(data)

Method to load a given array of JSON objects into the table data.

#### Examples

    // Array of JSON objects
    var data = [ { id: '1', name: 'John', surname: 'Doe'  }, {id: '2', name: 'Luiza', surname: 'Silva'} ];
    
    // Loading data from a given array of JSON objects
    man.loadData( data );

## License (MIT)

Copyright (c) Valter Junior ("Author")

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
