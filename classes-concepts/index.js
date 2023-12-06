class User {
	age = 23; //PROPERTY NAME
	constructor(name, email, password) {
		this.email = email;
		this.name = name;
		this.password = password;
	}
	getPublicDetails() {
		return `user Name ${this.name} and email is ${this.email} age is ${this.age}`;
	}
	getPrivateDetails(accessCode) {
		if (accessCode === "password222") {
			return `user Name ${this.name}, email is ${this.email} and password is ${this.password}`;
		} else {
			return `Access denied`;
		}
	}
	setUserPassword(newPassword) {
		if (newPassword.length <= 0) {
			console.log("unable to set user password");
			return;
		}
		this.password = newPassword;
		console.log("password changed successfully");
		return;
	}
}
console.log(typeof User);
const user = new User("arun", "example@example.com", "password222");
const publicDetails = user.getPublicDetails();
console.debug("🚀 ~ file: index.js:19 ~ publicDetails:", publicDetails);
const privateDetails1 = user.getPrivateDetails("password222");
console.debug("🚀 ~ file: index.js:23 ~ privateDetails:", privateDetails1);
user.setUserPassword("newPassword");
const privateDetails = user.getPrivateDetails("password222");
console.debug("🚀 ~ file: index.js:23 ~ privateDetails:", privateDetails);
