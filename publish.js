const ghpages = require('gh-pages');

ghpages.publish("build", {
    branch: "deploy",
    repo: "https://github.com/Vovanisimous/Blog-api.git"
}, (msg) => console.log(msg));