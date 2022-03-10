class Quote{
    constructor(id, gallonsRequested, deliveryAddress, deliveryDate){
        this.id = id;
        this.timeStamp = new Date();
        this.gallonsRequested = gallonsRequested;
        this.deliveryAddress = deliveryAddress;
        this.deliveryDate = deliveryDate;
        this.price = 1.00;
        this.totalPrice = this.price * 5;
    }
}

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('/');
};

const quote_history = []; 

console.log("reached");

let tmpDate = new Date(2022, 6, 5);
let tmpQuote = new Quote(1, 23, "133 Apple Drive", tmpDate);
quote_history.push(tmpQuote);

tmpDate = new Date(2023, 3, 17);
tmpQuote = new Quote(2, 52, "152 Orange Road", tmpDate);
quote_history.push(tmpQuote);

tmpDate = new Date(2022, 11, 20);
tmpQuote = new Quote(3, 17, "6547 Yellowstone Drive", tmpDate);
quote_history.push(tmpQuote);

let tmpStr = '';
let table = document.getElementById("quote-history-table");
for (i = 0; i < quote_history.length; i++) {
    tmpTimeStamp = quote_history[i].timeStamp.yyyymmdd()
    tmpDeliveryDate = quote_history[i].deliveryDate.yyyymmdd()
    tmpStr += '<tr>';
    tmpStr += `<td>${tmpTimeStamp}</td>`;
    tmpStr += `<td>${quote_history[i].gallonsRequested}</td>`;
    tmpStr += `<td>${quote_history[i].deliveryAddress}</td>`;
    tmpStr += `<td>${tmpDeliveryDate}</td>`;
    tmpStr += `<td>$${quote_history[i].price}</td>`;
    tmpStr += `<td>$${quote_history[i].totalPrice}</td>`;
    tmpStr += '</tr>';
}
table.innerHTML = tmpStr;