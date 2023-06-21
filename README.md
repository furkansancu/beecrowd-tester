# Beecrowd Tester
Helps you to test your beecrowd solution scripts without having a headache.

## Getting Started
#### ⏳ Installation
1. Clone the repo by executing `git clone git@github.com:furkansancu/beecrowd-tester.git`
2. Run `npm install` to fetch dependencies.
3. Put your scripts inside `test/` folder.
4. Run `npm run test [script-path] [beecrowd-test-id] [lang-code]` command to test your script.

#### 🖐 How to use ?
```bash
node -r esm src/index.js [script-path] [beecrowd-test-id] [lang-code]
```
##### Examples:
- `node -r esm src/index.js test/test.js 1000 nodejs`

### Supported Languages
We only support NodeJS, Javascript at the moment lol.
If you would like to see your favorite lanugage to be supported in this repo, make sure to [contribute](https://github.com/furkansancu/beecrowd-tester/pulls)

| Language Name | Version | Language Code |
| ----------- | ----------- | ----------- |
| Javascript - NodeJS | +8.4.0 | node, nodejs, js |

### About the Project

#### Contributing
Feel free to [contribute](https://github.com/furkansancu/beecrowd-tester/pulls) our project from Github.

#### License
See the [License](./LICENSE) file for licensing information.