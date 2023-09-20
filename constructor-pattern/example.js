class House {
	constructor(address, numberOfRooms, squareFeet) {
		this.address = address;
		this.numberOfRooms = numberOfRooms;
		this.squareFeet = squareFeet;
		this.isHaunted = false;
	}

	describe() {
		let hauntedStatus = this.isHaunted ? "It's haunted!" : "It's not haunted.";
		console.log(
			`This house is located at ${this.address}. It has ${this.numberOfRooms} rooms and is ${this.squareFeet} square feet in size. ${hauntedStatus}`
		);
	}
	//it makes the house haunted
	haunt() {
		if (!this.isHaunted) {
			console.log(`Ooooh! ${this.address} is now haunted! `);
			this.isHaunted = true;
		} else {
			console.log(`This house is already haunted!`);
		}
	}
}

const house1 = new House("123 Main St", 3, 1500);
const house2 = new House("456 Mum St", 4, 2000);

house1.describe();
house2.describe();

// Makes one of the houses-2 haunted
house2.haunt();
house2.describe();
