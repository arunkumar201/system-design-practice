class ConfigurationManager {
	constructor() {
		if (!ConfigurationManager.instance) {
			// Initialize configuration settings
			this.apiKey = "123";
			this.apiUrl = "https://my-api.com";

			ConfigurationManager.instance = this;
		}

		return ConfigurationManager.instance;
	}

	getApiKey() {
		return this.apiKey;
	}

	getApiUrl() {
		return this.apiUrl;
	}
}

const configManager1 = new ConfigurationManager();
const configManager2 = new ConfigurationManager();

console.log(configManager1 === configManager2); // true

console.log(configManager1.getApiKey()); // "your_api_key"
console.log(configManager2.getApiUrl()); // "https://api.example.com"
