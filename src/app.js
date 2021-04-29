    // ARRAY FOR HEADER.
   var arrHead = new Array(); // this is an array structure and we're putting things into that array structure (per next line down)
    arrHead = ['', 'Username', 'Password'];      // array at index 0 is '', array at index 1 is username and array at index 2 is password. //SIMPLY ADD OR REMOVE VALUES IN THE ARRAY FOR TABLE HEADERS.
   
    // ADD A NEW ROW TO THE TABLE.s


  function addRow() {
        var appendTab = document.getElementById('appendTable');
        //var parentDOM = document.getElementById('search-form');//establish hierarchy because cant grab an ID immediately if its under the top level ID
   
        var rowCount = appendTab.rows.length; //this variable gets the length of the table rows. 
        var tr = appendTab.insertRow(rowCount);      // TABLE ROW. we're inserting a row into the Table 'appendTable' ....// what this is saying is insert row at the end of the table
        //tr = appendTab.insertRow(rowCount); //I dont think this row is needed DELETE

        for (var c = 0; c < arrHead.length; c++) {  //What this is saying is:   starting at zero until the value of c is less than the length of the table rows ... then after each 'FOR' loop is done increment the value of c by 1. So, while C is less than 3 
            var td = document.createElement('td');          // TABLE DEFINITION.
            td = tr.insertCell(c); 

            if (c == 0) {           // FIRST COLUMN. 'c' = column in this case.
                // ADD A BUTTON.
                var button = document.createElement('input');

                // SET INPUT ATTRIBUTE.
                button.setAttribute('type', 'button');
                button.setAttribute('value', 'Remove');

                // ADD THE BUTTON's 'onclick' EVENT.
                button.setAttribute('onclick', 'removeRow(this)');

                td.appendChild(button);
            }
            else {
                if (c == 1) {
                    var values = document.getElementById('email-input').value;
                    //var values = parentDOM.getElementById('email-input').value;
                
                }
                if (c == 2) {
                    var values = document.getElementById('password-input').value;
                    //var values = parentDOM.getElementById('password-input').value;
                
                }

               
                //alert(values);
                // CREATE AND ADD TEXTBOX IN EACH CELL.
                var ele = document.createElement('LABEL');
                ele.setAttribute('type', 'text');
                //  ele.setAttribute('text', '1');
                ele.innerHTML = values;
                td.appendChild(ele);
            }
        }
    }

 