import jsPDF from 'jspdf'
import 'jspdf-autotable'

class PdfGenerator {
    constructor() {

    }

    static genPdf(firstTable, secondTable, header, name) {
        const doc = new jsPDF();
        let today = new Date();
        console.log(firstTable);
        console.log(secondTable);

        firstTable.forEach((data, index) => {
            doc.setFontSize(18);
            const date = `Elaborado en : ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
            doc.text("SeguPrev", 15, 20);
            doc.setFontSize(10);
            doc.text(header, 15, 30);
            doc.text(date, 15, 35);

            doc.autoTable(data);
            doc.autoTable(secondTable[index]);
            doc.addPage();
        });
        doc.save(`${name}.pdf`);
    }
}

export default PdfGenerator;