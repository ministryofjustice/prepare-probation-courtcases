# Prepare Probation Court Cases

### Initial setup

Install Node.JS _v12.3.1_

Alternatively if Node.js and _nvm_ (Node Version Manager) are already installed, allow _nvm_ to download and switch to this project’s version using:

```
nvm install
```

### Running

1. Install

```sh
npm ci
```

2. Build
```
npm run build
```

3. Start
```
npm start
```

### Developing

1. Install

```sh
npm ci
```

2. Start

Uses BrowserSync live-reloading proxy (automatically refreshes on CSS/JS or Node.js changes)

```
npm run dev
```

### Packaging
Creates `./dist-${version}.tgz`
```
npm run package
```
