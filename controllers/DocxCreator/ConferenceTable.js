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
                children: [
                    new Paragraph('Title')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Conference')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Organizer')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Volume/Issue No./ISBN')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('First Author')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Co-Author')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Indexing')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Scopus Listed')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('SCI Listed')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Pubmed Listed')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('MMDU Affiliation')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Journal ID RM')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('National/ International')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Year and Month Of Publication')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Scopus Citation')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Scholar Citation')
                ],
            }),
            new TableCell({
                children: [
                    new Paragraph('Impact Factor')
                ],
            }),
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
                    children : [new Paragraph(`${item.title}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.conferenceName}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.organizer}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.VolNo}/${item.issueNo}/${item.isbnNo}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.areYouFirstAuthor}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.correspondingAuthor}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.indexCoperificus}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.scopusIndexed}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.sci_scie_ssci_indexed}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.isArticleInPubMedList}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.isMMDUAffilation}`)]
                }),new TableCell({
                    children : [new Paragraph(`NA`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.conferenceType}`)]
                }),new TableCell({
                    children : [new Paragraph(`${item.yearAndMonth}`)]
                }),new TableCell({
                    children : [new Paragraph(`NA`)]
                }),new TableCell({
                    children : [new Paragraph(`NA`)]
                }),new TableCell({
                    children : [new Paragraph(`NA`)]
                }),
            ]
        });   

        tableRows.push(row);
    });

    var table = new Table({ 
        style: "MyCustomTableStyle",
        // columnWidths: [5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505, 5505 ],
        rows : tableRows
    });

    return table;
};

