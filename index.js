const inquirer = require('inquirer');

const fs = require('fs');

function generateReadme(title, description, installation, usage, contribution, test, license, github, email) {
    return `# ${title}

    ## Description
    
    ${description}
    
    ## Table of Contents
    
    - [Description](#description)  
    - [Installation](#installation)
    - [Usage](#usage)
    - [Contribution Guidelines](#How to Contribute)
    - [License](#license)
    - [Tests Instructions](#tests)
    - [Questions](#questions)
    
    ## Installation
    
    ${installation}
    
    ## Usage
    
    ${usage}

    ## Credits
    
    List your collaborators, if any, with links to their GitHub profiles.
    
    If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.
    
    If you followed tutorials, include links to those here as well.
    
    ## License
    
    ${license}
    
    
    ## Badges
    
    ![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)
    
    Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.
    
    ## Features
    
    If your project has a lot of features, list them here.
    
    ## How to Contribute
    
    ${contribution}
    
    ## Tests
    
    ${test}

    ## Questions

    My Github profile: https://github.com/${github}
    To reach me with additional questions: ${email}
        
};

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
            type: 'input',
            name: 'installation',
            message: 'What are the steps required to install your project?'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for use.'
        },
        {
            type: 'input',
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
        fs.writeFile('README.md', readme, (err) =>
            err ? console.log(err) : console.log('Success!')
        );        
    })