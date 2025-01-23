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

		if (!username || typeof username !== "string") {
			return res.status(400).send("Invalid or missing username parameter.");
		}

		let user = await User.findOne({ username });
		if (!user) {
			user = new User({ username, viewCount: 0 }); // Ensure viewCount starts at 0
			await user.save();
		}

		user.viewCount += 1;
		await user.save();

		const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="100">
                <rect width="400" height="100" fill="#f0f8ff" rx="15" />
                <text x="20" y="40" font-size="24" fill="#2c3e50" font-family="Arial, sans-serif">
                    ${username}'s Profile
                </text>
                <text x="20" y="70" font-size="18" fill="#34495e" font-family="Arial, sans-serif">
                    Views: ${user.viewCount}
                </text>
            </svg>
        `;

		const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
		res.set("Content-Type", "image/png");
		res.send(buffer);
	} catch (error) {
		console.error("Error adding count:", error);

		const errorSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="100">
                <rect width="400" height="100" fill="#ffebee" rx="15" />
                <text x="20" y="40" font-size="24" fill="#c0392b" font-family="Arial, sans-serif">
                    Error
                </text>
                <text x="20" y="70" font-size="18" fill="#e74c3c" font-family="Arial, sans-serif">
                    Unable to update view count
                </text>
            </svg>
        `;

		try {
			const errorBuffer = await sharp(Buffer.from(errorSvg)).png().toBuffer();
			res.set("Content-Type", "image/png");
			res.status(500).send(errorBuffer);
		} catch (sharpError) {
			console.error("Failed to render error SVG:", sharpError);
			res.status(500).send("Internal Server Error");
		}
	}
};
