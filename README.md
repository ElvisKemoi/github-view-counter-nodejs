# GitHub Profile View Counter API

This API allows you to display a profile view counter in your GitHub `README.md` file. With this simple tool, you can show how many people have visited your GitHub profile in real-time.

## Features

- Counts the number of times your GitHub profile has been viewed.
- Easy to integrate into any GitHub `README.md` file.
- Hosted and served on a fast and reliable platform.

## API Endpoint

```
http://githubviews.photosoko.com/user/?username=<your-github-username>
```

### Parameters

- `username` (required): Your GitHub username.

## How to Use

Follow these steps to add the profile view counter to your GitHub `README.md` file:

1. Copy the Markdown code below and paste it into your `README.md` file:

   ```markdown
   ![Profile Views](http://githubviews.photosoko.com/user/?username=<your-github-username>)
   ```

   Replace `<your-github-username>` with your actual GitHub username.

2. Commit and push your changes to your GitHub repository.

3. Open your GitHub profile page, and you will see the profile view counter displayed in your `README.md` file.

## Example

If your GitHub username is `ElvisKemoi`, use the following code in your `README.md` file:

```markdown
![Profile Views](http://githubviews.photosoko.com/user/?username=ElvisKemoi)
```

This will display the profile view counter as shown below:
<br/>
![Profile Views](http://githubviews.photosoko.com/user/?username=ElvisKemoi)

## Notes

- The view count is updated in real-time.
- Ensure that you replace `<your-github-username>` with your exact GitHub username to avoid errors.
- The API is free to use and hosted on [Vercel](https://vercel.com) for high availability.

## Contributing

Feel free to contribute to the project by submitting issues or pull requests. Your feedback is highly appreciated!

## License

This project is open source and available under the [MIT License](LICENSE).
