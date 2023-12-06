//abstract class
class Document {
	constructor(content) {
		//here we could have multiple business requirement so
		//we can pass  or initialize at the time of creation like category,where to upload or anything
		this.content = content;
	}
	//supported methods
	display() {}
	uploadOnServer(context) {}
	// many more as per the business requirements
}

//lets create subClass or Concrete class
class PDFDocument extends Document {
	display() {
		return `Displaying PDF: ${this.content}`;
	}
	uploadOnServer(context) {
		return `Uploading PDF: ${this.content}`;
	}
	//so on for other business requirements
}

class WordDocument extends Document {
	display() {
		return `Displaying Word Document ${this.content}`;
	}
	uploadOnServer(context) {
		return `Uploading Word Document: ${this.content}`;
	}
}

class SpreadsheetDocument extends Document {
	display() {
		return `Displaying Spreadsheet Document ${this.content}`;
	}
	uploadOnServer(context) {
		return `Upload Spreadsheet Document: ${this.content}`;
	}
}

//lets create Document Factory
class DocumentFactory {
	createDocument(type, content) {
		switch (type) {
			case "pdf":
				return new PDFDocument(content);
			case "word":
				return new WordDocument(content);
			case "spreadsheet":
				return new SpreadsheetDocument(content);
			default:
				throw new Error("Invalid document type");
		}
	}
}

//use like
//create Instance of the factory
const documentFactory = new DocumentFactory();

//now lets decide ,which document we want to handle
const pdfDoc = documentFactory.createDocument(
	"pdf",
	"this is Content for PDF Document"
);
const wordDoc = documentFactory.createDocument(
	"word",
	"this is Content for Word Document"
);
const spreadsheetDoc = documentFactory.createDocument(
	"spreadsheet",
	"this is Content for Spreadsheet Document"
);

//Now once we done with objects creation

console.log(pdfDoc.display()); //Displaying PDF: this is Content for PDF Document
console.log(wordDoc.display()); //Displaying Word Document this is Content for Word Document
console.log(spreadsheetDoc.display()); //Displaying Spreadsheet Document this is Content for Spreadsheet Document

//same for Uploading things
console.log(pdfDoc.uploadOnServer({ context: "context for PDF" }));
console.log(wordDoc.uploadOnServer({ context: "context for Word" }));
console.log(
	spreadsheetDoc.uploadOnServer({ context: "context for Spreadsheet" })
);
