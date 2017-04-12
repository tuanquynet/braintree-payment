greengolf-backoffice
==============================

greengolf Backoffice

- Mockup URL: []
- Issue tracker URL: https://gitlab.com/naustudio/greengolf
- Project data: https://drive.google.com/drive/folders/0B5ZlpojqaZc2cW1sb3UxME8zQnM

GETTING STARTED WITH DEVELOPMENT
--------------------------------

1. Software installation:
    - Sublime Text 3 or Visual Studio Code
    - [Nau dotfiles][]
    - Currently stable Google Chrome
    - [NodeJS][] (for testing, previewing, compiling and optimizing processes)

2. Setting up development environment
    - Install development dependencies: In terminal, cd to __this__ folder and run: `npm install`
    - Open the __this__ folder in favorite editor
3. Preview the app:
    - Execute `npm start`

TECHNICAL SOLUTIONS
-------------------

**[TBD]**

FOLDER STRUCTURE
----------------

    /                           : git root
    ├── dist                    : folder for serving static files
    ├── src                     : main source code
    └── ...


CONVENTIONS & BEST PRACTICES
----------------------------

### General

- Files are named with **kebab-case**. (Reasons: to minimize case sensitivity issues on Linux).
    - Exceptions: single class files should be named with PascalCase to link the file with the Class being declared inside.

### JavaScript

- Use [Nau JavaScript Code Styles][], with below main points:
    - Code indentation by **TABs**, and fine alignment by **SPACEs**. (Tab width is up to authors, but 4 is recommended.)
    - Open brackets `{, (, [` on the same line.
    - Single quotes ('...') for String literal in js, jsx files.
    - Naming with **camcelCase** for variables, **CAPITALIZED_CASE** for enum constants, PascalCase for Class and Singleton.
    - Use **spaces** frequently to enhance code readability.
    - Comment code at Class level and public methods with [JSDoc][] and wherever logic is unclear.
- [eslint][] MUST BE USED to validate JavaScript syntax to maintain sanity & clarity of the code.

    Refer to `.eslintrc.js` for project-wise rules

## KNOWLEDGE BASE

[loopback]: https://css-tricks.com/bem-101/
[eslint]: http://eslint.org/
[GulpJS]: http://gulpjs.com/
[JSDoc]: http://usejsdoc.org/
[Nau dotfiles]: https://github.com/naustudio/dotfiles
[Nau Front End Code Guide]: http://code.naustud.io/code-guide
[Nau JavaScript Code Styles]: http://code.naustud.io/javascript
[NodeJS]: http://nodejs.org/
