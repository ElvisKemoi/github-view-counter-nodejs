const User = require("../models/user.model");
const sharp = require("sharp");

async function createUser(username) {
	try {
		let user = await User.findOne({ username });
		if (!user) {
			user = new User({ username });
			await user.save();
		}
		return user;
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
}
exports.addCount = async (req, res) => {
	try {
		const { username } = req.query;

		// Find or create user
		let user = await User.findOne({ username });
		if (!user) {
			user = await createUser(username);
		}

		user.viewCount += 1; // Increment view count
		await user.save();

		// Generate SVG without @import
		const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="100">
                <rect width="400" height="100" fill="#f0f8ff" rx="15" />
                <text x="20" y="40" font-size="24" fill="#2c3e50" font-family="Roboto, sans-serif">
                    ${username}'s Profile
                </text>
                <text x="20" y="70" font-size="18" fill="#34495e" font-family="Roboto, sans-serif">
                    Views: ${user.viewCount}
                </text>
            </svg>
        `;

		// Convert SVG to PNG using sharp
		const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

		// Set headers and send image
		res.set("Content-Type", "image/png");
		res.send(buffer);
	} catch (error) {
		console.error("Error adding count:", error);

		// Generate error SVG without @import
		const errorSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="100">
                <rect width="400" height="100" fill="#ffebee" rx="15" />
                <text x="20" y="40" font-size="24" fill="#c0392b" font-family="Roboto, sans-serif">
                    Error
                </text>
                <text x="20" y="70" font-size="18" fill="#e74c3c" font-family="Roboto, sans-serif">
                    Unable to update view count
                </text>
            </svg>
        `;

		// Convert error SVG to PNG using sharp
		const errorBuffer = await sharp(Buffer.from(errorSvg)).png().toBuffer();

		res.set("Content-Type", "image/png");
		res.status(500).send(errorBuffer);
	}
};
