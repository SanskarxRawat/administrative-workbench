const fs = require('fs');
const {
    Document, Packer, Paragraph, HeadingLevel, Header, Footer, TextRun,
    ShadingType, AlignmentType, ImageRun, TextWrappingType, TextWrappingSide, PageBreak, HorizontalPositionRelativeFrom,
    VerticalPositionRelativeFrom, FrameAnchorType, HorizontalPositionAlign, VerticalPositionAlign, TableCell,
    Table, TableRow, TextDirection, VerticalAlign, WidthType, BorderStyle, UnderlineType, convertInchesToTwip, LevelFormat
} = require('docx');
const path = require('path');
const styles = fs.readFileSync("./controllers/styles/main1.xml", "utf-8");
const uf = require('../../utils/utilityFunctions');

exports.createTable = (papers) => {

    let tableRows = [];

    const headRow = new TableRow({
        children: [
            new TableCell({
                children: [new Paragraph('Sno.')],
            }),
            new TableCell({
                children: [new Paragraph('Name Of Inventor')],
            }),
            new TableCell({
                children: [
                    new Paragraph('Title')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Application No.')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Year And Month')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Status')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Name Of Agency')
                ],
            })
        ],
    });

    tableRows.push(headRow);
    
    papers.forEach(async (item, index) => {
        const row = new TableRow({
            children : [
                new TableCell({
                    children : [new Paragraph(`${index+1}`)]
                }),
                new TableCell({
                    children : [new Paragraph(`${item.nameOfInventor}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.title}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.applicationNo}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.yearAndMonth}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.status}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.nameOfAgency}`)]
                })
            ]
        });   

        tableRows.push(row);
    });

    var table = new Table({ 
        style: "MyCustomTableStyle",
        columnWidths: [5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505 ],
        rows : tableRows
    });

    return table;
};

