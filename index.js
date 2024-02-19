// import inquirer to get information from a prompt
const inquirer = require('inquirer');

// import badge maker to make license badges
const { makeBadge, ValidationError } = require('badge-maker');

const fs = require('fs');

// create object for badge Nolicense
const noLicenseFormat = {
    label: `License`,
    message: `No license`,
    color: `red`,
}

// function to generate README, input by object with properties of title, description, installation, usage, contribution, test, license, github, email
function generateReadme({title, description, installation, usage, contribution, test, license, github, email}) {
    var badge = "";
    const licenseNotice = `This project is licensed under the ${license} license.`;
    // create badge based on license
    switch (license) {
        case "MIT":
            badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;

        case "APACHE 2.0":
            badge = "[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            break;

        case "GPL 3.0":
            badge = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
            break;

        case "BSD 3":
            badge = `[![License: BSD 3](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
            break;

        default:
            badge = `[${makeBadge(noLicenseFormat)}](https://choosealicense.com/no-permission/)`;
            break;
    };
    // create readme with content in `` and variables.
    return `# ${title}
${badge}

## Description
${description}
    
## Table of Contents
- [Description](#description)  
- [Installation](#installation)
- [Usage](#usage)
- [Contribution Guidelines](#how-to-contribute)
- [License](#license)
- [Tests Instructions](#tests)
- [Questions](#questions)
    
## Installation
${installation}
    
## Usage
${usage}

    
## License
${licenseNotice}
    
## How to Contribute
${contribution}
    
## Tests
${test}

## Questions
My Github profile: <https://github.com/${github}>

To reach me with additional questions: <${email}> 
    `;    
};

// function to prompt user
inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a short description of your project.' 
        },
        {
            type: 'editor',
            name: 'installation',
            message: 'What are the steps required to install your project?'
        },
        {
            type: 'editor',
            name: 'usage',
            message: 'Provide instructions and examples for use.'
        },
        {
            type: 'editor',
            name: 'contribution',
            message: 'If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so.'
        },
        {
            type: 'input',
            name: 'test',
            message: 'Go the extra mile and write tests for your application. Then provide examples on how to run them here.'
        },
        {
            type: 'list',
            name: 'license',
            message: 'What type of license should your project have?',
            choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None']
        },
        {
            type: 'input',
            name: 'github',
            message: 'Please provide your github username.'
        },
        {
            type: 'email',
            name: 'email',
            message: 'Please provide your email.'
        }
    ])
    .then((response) => {
        const readme = generateReadme(response);
        // write readme to dist folder
        fs.writeFile('dist/README.md', readme, (err) =>
            err ? console.log(err) : console.log('Success!'))        
    });