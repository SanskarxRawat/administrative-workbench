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
const journalTable = require('./JournalTable');
const conferenceTable = require('./ConferenceTable');
const patentTable = require('./PatentTable');
const copyrightTable = require('./CopyrightTable');
const url = require('url');



exports.createDocx = async (req, res) => {

    var papers = [];
    var table;

    const currentUrl = new URL(`http://localhost:3001/${req.originalUrl}`);
    const searchParams = currentUrl.searchParams;
    const type = searchParams.get('type');

    if(searchParams.get('type') === 'Journal') {
        papers = await uf.getJournalPapers(req.user._id);
        if(papers.length === 0){
            return res.status(404).send("No Research Papers found.");
        }
        table = await journalTable.createTable(papers);
    }
    if(searchParams.get('type') === 'Conference') {
        papers = await uf.getConferencePapers(req.user._id);
        if(papers.length === 0){
            return res.status(404).send("No Research Papers found.");
        }
        table = await conferenceTable.createTable(papers);
    }
    if(searchParams.get('type') === 'Patent') {
        papers = await uf.getPatentPapers(req.user._id);
        if(papers.length === 0){
            return res.status(404).send("No Research Papers found.");
        }
        table = await patentTable.createTable(papers);
    }
    if(searchParams.get('type') === 'Copyright') {
        papers = await uf.getCopyrightPapers(req.user._id);
        if(papers.length === 0){
            return res.status(404).send("No Research Papers found.");
        }
        table = await copyrightTable.createTable(papers);
    }

    
    var doc = new Document({
        externalStyles : styles,
        sections: [
            {
                children : [
                    new Paragraph({
                        frame: {
                            position: {
                                x : -900,
                                y : -1000
                            },
                            width: 900,
                            height: 700,
                            anchor: {
                                horizontal: FrameAnchorType.MARGIN,
                                vertical: FrameAnchorType.MARGIN,
                            },
                            alignment: {
                                x: HorizontalPositionAlign.CENTER,
                                y: VerticalPositionAlign.TOP,
                            },
                        },
                        children : [
                            new ImageRun({
                                data: fs.readFileSync('./images/mmulogo.jpg'),
                                transformation: {
                                    width: 60,
                                    height: 60,
                                },
                            }), 
                        ]
                    }),
                    new Paragraph({
                            frame: {
                                position: {
                                    x : 300,
                                    y : -1000
                                },
                                width: 9500,
                                height: 300,
                                anchor: {
                                    horizontal: FrameAnchorType.MARGIN,
                                    vertical: FrameAnchorType.MARGIN,
                                },
                                alignment: {
                                    x: HorizontalPositionAlign.CENTER,
                                    y: VerticalPositionAlign.TOP,
                                },
                            },
                            children : [
                                new TextRun({
                                    text : "Maharishi Markandeshwar (Deemed to be University), Mullana", 
                                    heading : HeadingLevel.TITLE, 
                                    alignment : AlignmentType.CENTER,
                                    font: "Calibri",
                                    bold : true,
                                    size : 35
                                }), 
                            ]
                    }),
                    new Paragraph({
                        frame: {
                            position: {
                                x : 2000,
                                y : -500
                            },
                            width: 5000,
                            height: 200,
                            anchor: {
                                horizontal: FrameAnchorType.MARGIN,
                                vertical: FrameAnchorType.MARGIN,
                            },
                            alignment: {
                                x: HorizontalPositionAlign.CENTER,
                                y: VerticalPositionAlign.TOP,
                            },
                        },
                        children : [
                            new TextRun({
                                text : "NAAC Accredited 'A++' Grade University", 
                                heading : HeadingLevel.TITLE, 
                                alignment : AlignmentType.CENTER,
                                font: "Calibri",
                                size : 30,
                                bold : true
                        }),
                        ]
                    }),
                    new Paragraph({
                        frame: {
                            position: {
                                x : -200,
                                y : 200
                            },
                            width: 10000,
                            height: 100,
                            anchor: {
                                horizontal: FrameAnchorType.MARGIN,
                                vertical: FrameAnchorType.MARGIN,
                            },
                            alignment: {
                                x: HorizontalPositionAlign.CENTER,
                                y: VerticalPositionAlign.TOP,
                            },
                        },
                        children : [
                            new TextRun({
                                text : `Publications in ${type} (Approved Publications) of the Faculty Dr. ${req.user.name} of computer Science & Engineering Department, M M Engineering College, M M (Deemed to be University), Mullana upto 2021`, 
                                alignment : AlignmentType.CENTER,
                                font: "Calibri",
                                size : 20,
                                bold : true, 
                                italics : true,
                            })
                        ]
                    }), 
                    new Paragraph({
                        frame: {
                            position: {
                                x : 100,
                                y : 700
                            },
                            width: 100000,
                            height: 500,
                            anchor: {
                                horizontal: FrameAnchorType.MARGIN,
                                vertical: FrameAnchorType.MARGIN,
                            },
                            alignment: {
                                x: HorizontalPositionAlign.CENTER,
                                y: VerticalPositionAlign.TOP,
                            },
                        },
                        children : [
                            
                        ]
                    }), table
                ]
            }
        ],
    });


    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("outputFiles/My Document.docx", buffer);
    });

    const b64string = await Packer.toBase64String(doc);

    fs.writeFileSync("outputFiles/My Document.docx", Buffer.from(b64string, 'base64'));
    
    await res.setHeader('Content-Disposition', 'attachment; filename=My Document.docx');
    await res.download("outputFiles/My Document.docx");
    
    setTimeout(() => {
        fs.unlinkSync("outputFiles/My Document.docx");
    }, 1000);

};

