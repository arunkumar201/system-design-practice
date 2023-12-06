class AuthManager {
	constructor () {
		console.log(JSON.stringify(AuthManager.instance)+"  initialized");
		if (!AuthManager.instance) {
			// Private variables
			this.loggedInUser = null;

			AuthManager.instance = this;
		}

		return AuthManager.instance;
	}

	login(username, password) {
		// Simulate authentication logic
		if (username === "admin" && password === "password") {
			this.loggedInUser = username;
			console.log(`${username} logged in.`);
			return true;
		} else {
			console.log(`Authentication failed for ${username}.`);
			return false;
		}
	}

	logout() {
		if (this.loggedInUser) {
			console.log(`${this.loggedInUser} logged out.`);
			this.loggedInUser = null;
		} else {
			console.log(`No user logged in.`);
		}
	}

	getUser() {
		return this.loggedInUser || "No user logged in";
	}
}

// Use like
const authManager1 = new AuthManager();
const authManager2 = new AuthManager();

console.log(authManager1 === authManager2); // true

authManager1.login("admin", "password"); // admin logged in.
console.log(authManager2.getUser()); // admin

authManager1.logout(); // admin logged out.
console.log(authManager2.getUser()); // No user logged in
