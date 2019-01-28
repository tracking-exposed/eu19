# eu19 Hugo development environment
This is a Hugo development environment running Hugo v. 0.51

## Installation
If you are on macOS and using [Homebrew](https://brew.sh/), you can install Hugo with the following one-liner: `brew install hugo`. 
For any reference go to [Hugo installation page](https://gohugo.io/getting-started/installing)

## Running development server
Run the command `hugo server` to lunch LiveReload as local server, visit [http://localhost:1313/](http://localhost:1313/) to see the website.
Run `hugo server -D` to have content in draft status published, do it and enjoy the *typography.md*

## Deployment
The command `hugo` renders your site into public/ dir and is ready to be deployed to your web server. 
For any refercence go to [Hugo basic usage page](https://gohugo.io/getting-started/usage/)

##Create content
To create a new content, run the command `hugo new FOLDER/FILE-NAME.md` i.e. `hugo new faq/what-is-rss.md`. It will make a .md file stored in the relative folder under `content` folder.
In front-matte of the new .md file, change the `draft` value to `false` to publish the post.