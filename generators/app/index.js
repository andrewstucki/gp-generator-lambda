"use strict";
const Generator = require("yeoman-generator");

const files = [
  ".babelrc",
  ".dockerignore",
  ".env",
  ".gitignore",
  "Dockerfile",
  "docker-compose.yml",
  "inflections.json",
  "Makefile",
  "package.json",
  "README.md",
  "webpack.config.js",
  "actions/actions_test.go",
  "actions/home.go",
  "actions/home_test.go",
  "actions/render.go",
  "assets/css/_buffalo.scss",
  "assets/css/application.scss",
  "assets/images/favicon.ico",
  "assets/images/logo.svg",
  "assets/js/application.js",
  "ci/Dockerfile",
  "ci/docker-compose.yml",
  "config/buffalo-plugins.toml",
  "fixtures/sample.toml",
  "grifts/db.go",
  "locales/all.en-us.yaml",
  "migrations/.keep",
  "models/models.go",
  "models/models_test.go",
  "public/robots.txt",
  "public/assets/.keep",
  "templates/index.html",
  "templates/_flash.html"
];

const templates = [
  ".buffalo.dev.yml",
  "database.yml",
  "go.mod",
  "main.go",
  "actions/app.go",
  "config/buffalo-app.toml",
  "grifts/init.go",
  "templates/application.html"
];

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "input",
        name: "organization",
        message:
          "What is the name of the Github organization this project belongs to?"
      },
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        default: this.appname
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const self = this;
    files.forEach(file => {
      self.fs.copy(this.templatePath(file), this.destinationPath(file));
    });

    templates.forEach(file => {
      self.fs.copyTpl(this.templatePath(file), this.destinationPath(file), {
        organization: self.props.organization,
        name: self.props.name
      });
    });
  }

  install() {
    this.on(`yarnInstall:end`, () => {
      this.spawnCommandSync("go", ["mod", "download"]);
      this.spawnCommandSync("docker-compose", [
        "-f",
        "ci/docker-compose.yml",
        "build"
      ]);
      this.spawnCommandSync("git", ["init"]);
      this.spawnCommandSync("git", ["add", "."]);
      this.spawnCommandSync("git", ["commit", "-m", "Bootstrap application"]);
    });

    this.installDependencies({
      yarn: true,
      npm: false,
      bower: false
    });
  }
};
