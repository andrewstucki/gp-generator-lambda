"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

const files = [
  // Directories
  "actions",
  "assets",
  "ci",
  "config",
  "fixtures",
  "grifts",
  "locales",
  "migrations",
  "models",
  "public",
  "templates",
  // Files
  ".babelrc",
  ".dockerignore",
  ".env",
  ".gitignore",
  "inflections.json",
  "Dockerfile",
  "docker-compose.yml",
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
  "templates/_flash.html",
  // Templates
  ".buffalo.dev.yml",
  "database.yml",
  "go.mod",
  "main.go",
  "actions/app.go",
  "config/buffalo-app.toml",
  "grifts/init.go",
  "templates/application.html"
];

describe("generator-lambda:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ organization: "foobarbaz", name: "bazbizzbuzz" });
  });

  it("creates files", () => {
    assert.file(files);
  });

  it("writes templates", () => {
    assert.fileContent(".buffalo.dev.yml", /binary_name: bazbizzbuzz-build/);

    assert.fileContent("database.yml", /bazbizzbuzz_development/);
    assert.fileContent("database.yml", /bazbizzbuzz_test/);

    assert.fileContent("go.mod", /github\.com\/foobarbaz\/bazbizzbuzz/);

    assert.fileContent("main.go", /github\.com\/foobarbaz\/bazbizzbuzz/);

    assert.fileContent("actions/app.go", /github\.com\/foobarbaz\/bazbizzbuzz/);
    assert.fileContent("actions/app.go", /_bazbizzbuzz_session/);

    assert.fileContent(
      "config/buffalo-app.toml",
      /name = "bazbizzbuzz"\nbin = "bin\/bazbizzbuzz"/
    );

    assert.fileContent("grifts/init.go", /github\.com\/foobarbaz\/bazbizzbuzz/);

    assert.fileContent("templates/application.html", /Buffalo - bazbizzbuzz/);
    assert.fileContent(
      "templates/application.html",
      /<%= authenticity_token %>/
    );
  });
});
