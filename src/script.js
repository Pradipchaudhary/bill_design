const onPrint = (element) => {
  var divContents = document.getElementById(element);
  var divContents1 = document.getElementById(element).cloneNode(true);
  var copy = divContents1.querySelector("#copy");
  copy.innerHTML = "Parent Copy";
  var a = window.open("", "", "height=500, width=500");
  var head = document.querySelector("head");
  a.document.write("<html>");
  a.document.write(head.innerHTML);
  a.document.write('<body><div id="print-parent-div">');
  a.document.write(divContents.innerHTML);
  a.document.write('<div id="divider-div"></div>');
  a.document.write(divContents1.innerHTML);
  a.document.write("</div></body></html>");
  a.document.close();
  a.onload = function () {
    a.onafterprint = a.close;
    a.print();
  };
};
