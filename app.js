function PrintDiv(id) {
  var data = document.getElementById(id).innerHTML;
  var myWindow = window.open("", "my div", "height=800,width=1200");
  myWindow.document.write("<html><head><title>my div</title>");
  myWindow.document.write(
    '<link rel="stylesheet" href="style.css" type="text/css" />'
  );
  myWindow.document.write(
    '<link rel="stylesheet" href="print.css" type="text/css" />'
  );
  myWindow.document.write("</head><body >");
  myWindow.document.write(data);
  myWindow.document.write("</body></html>");
  myWindow.document.close(); // necessary for IE >= 10

  myWindow.onload = function () {
    // necessary if the div contain images

    myWindow.focus(); // necessary for IE >= 10
    myWindow.print();
    myWindow.close();
  };
}
