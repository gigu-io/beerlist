<p align="center">
    <a href="https://squidfunk.github.io/mkdocs-material/">
        <img height="120px" src="public/images/logo/beerlist_logo.png" />
    </a>
</p>

<p align="center">
  <strong>
    A <br />
    <a href="https://beer.gigu.io/">Beer List</a>
    <br />
    for handling beer betting debts 
  </strong>
</p>

<p align="center">
  <a href="https://github.com/gigu-io/beerlist/issues"><img
    src="https://img.shields.io/github/issues/gigu-io/beerlist"
    alt="Build"
  /></a>
  <a href="https://github.com/sponsors/janlauber"><img
    src="https://img.shields.io/github/sponsors/janlauber" 
    alt="Sponsors"
  /></a>
  <a href="https://github.com/gigu-io/beerlist"><img 
    src="https://img.shields.io/github/license/gigu-io/beerlist" 
    alt="License"
  /></a>
  <a href="https://www.codefactor.io/repository/github/gigu-io/beerlist"><img 
    src="https://www.codefactor.io/repository/github/gigu-io/beerlist/badge" 
    alt="CodeFactor" 
  /></a>
</p>

<p align="center">
  See who owes me beer and how much I owe them. Also show the debt history. Choose between 4 different styles of beer (Lager, Dark, IPA, Stout) and 3 sizes (small, medium, big) for each debt. Write a short reason about why someone owes you beer (max 100 characters). Each user can owe you max. 24 beers. Delete old debts and add new ones if your limit is reached.
</p>

<p align="center">
  <em>
    Check out the website – 
    <a
      href="https://beer.gigu.io/"
    >https://beer.gigu.io/</a>.
  </em>
</p>

<h2></h2>
<p>&nbsp;</p>

## Everything you would expect

### It's a simple web app

Focus on the beer list and the debt history.  
The app is simple and easy to use.  
Define who owns the beer and how much they owe you.

### Works on mobile and desktop

Because the app is a web app, it works on mobile and desktop.

### It's free

Everything is free (except the beer of course:wink:).  
If you want to support me, you can buy me a beer with a Github Sponsorship.  
Also you can host the app yourself.

### Open Source

Trust me, I'm open source.  
You can find the source code on [Github](https://github.com/gigu-io/beerlist).  
The frontend is written in Next.js and the backend is Firebase.  
License: MIT.

<h2></h2>
<p>&nbsp;</p>

## Setup Self Hosted

### Env

Set the following environment variables via `.env.local` file:
```
NEXT_PUBLIC_FIREBASE_API_KEY=<redacted>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<redacted>
NEXT_PUBLIC_FIREBASE_DATABASE_URL=<redacted>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<redacted>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<redacted>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<redacted>
NEXT_PUBLIC_FIREBASE_APP_ID=<redacted>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<redacted>
NEXT_PUBLIC_APP_VERSION=local
SMTP_USER=<redacted>
SMTP_PASSWORD=<redacted>
```

### Node.js

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

#### Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

##### Tailwind Reference

https://github.com/danvega/nuxt3-tailwind3-starter

#### Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information.

### Docker

```bash
docker build . -t beerlist:local
docker run -p 3000:3000 beerlist:local
```

### Firebase

**TODO**