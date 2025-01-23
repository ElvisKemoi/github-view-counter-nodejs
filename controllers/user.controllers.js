const User = require("../models/user.model");

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
		let user = await User.findOne({ username });
		if (!user) {
			user = await createUser(username);
		}
		user.viewCount += 1;
		await user.save();

		const htmlResponse = `
			<div style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; width: 250px; text-align: center; font-family: Arial, sans-serif; background-color: #f0f8ff;">
				<h3 style="color: #2c3e50; margin-bottom: 10px;">${username}'s</h3>
				<p style="font-size: 18px; color: #34495e;">Profile Views: <strong>${user.viewCount}</strong></p>
			</div>
		`;

		res.send(htmlResponse);
	} catch (error) {
		console.error("Error adding count:", error);
		const errorResponse = `
			<div style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; width: 250px; text-align: center; font-family: Arial, sans-serif; background-color: #ffebee;">
				<h3 style="color: #c0392b; margin-bottom: 10px;">Error</h3>
				<p style="font-size: 18px; color: #e74c3c;">Unable to update view count. Please try again later.</p>
			</div>
		`;
		res.status(500).send(errorResponse);
	}
};
