import mongoose from 'mongoose';
import Issue from './models/issue.model.js';
import Avatar from './models/avatar.model.js';

const dummyIssues = [
  {
    title: "The Missing Bracket",
    category: "Syntax",
    description: "This function is supposed to greet the user, but it won't even compile! Can you find the missing closing bracket?",
    buggyCode: `function greet(name) { \n\tconst msg = 'Hello, ' + name;\n\treturn msg; \nconsole.log(greet('World'));`,
    expectedOutput: 'Hello, World',
    rewards: { coins: 10, xp: 50 }
  },
  {
    title: "Accidental Constant",
    category: "Syntax",
    description: "The developer tried to reassign a variable declared with 'const'. Change it to the correct keyword.",
    buggyCode: `const count = 1; \nfor(let i=0;i<=10;i++){\n\tcount = count + 1;\n}\nconsole.log(count);`,
    expectedOutput: '12',
    rewards: { coins: 15, xp: 60 }
  },
  {
    title: "Fat Arrow Frustration",
    category: "Syntax",
    description: "The arrow function syntax is slightly broken. Fix the syntax error in the definition.",
    buggyCode: `const add = (a, b) => { a + b };\n\nconst sub = (a, b) => a - b;\n\nconst mult = (a, b) => a * b;\n\nconst div = (a, b) => a / b;\n\nconsole.log(add(2, 3)); \nconsole.log(sub(5, 2));\nconsole.log(mult(3, 4));\nconsole.log(div(10, 2));`, // Missing return or needs removal of braces
    expectedOutput: '5 3 12 5',
    rewards: { coins: 10, xp: 50 }
  },
  {
    title: "Wrong Operator",
    category: "Logic",
    description: "The calculateTax function is accidentally subtracting tax instead of adding it!",
    buggyCode: `function calculateTax(price) { \n\tconst res = price - (price * 0.1);\n\treturn res; \n}\n\nconsole.log(calculateTax(100));`,
    expectedOutput: '110',
    rewards: { coins: 20, xp: 100 }
  },
  {
    title: "Infinite Loop Warning",
    category: "Logic",
    description: "This loop is supposed to run 5 times, but it never stops! Fix the increment logic.",
    buggyCode: `let greet = "Hello Everyone."\nfor (let i = 0; i < 5; i--) { \n\tconsole.log(greet); \n}`,
    expectedOutput: "Hello Everyone. Hello Everyone. Hello Everyone. Hello Everyone. Hello Everyone.",
    rewards: { coins: 25, xp: 120 }
  },
  {
    title: "Center the Text",
    category: "UI",
    description: "The hero header text is currently aligned to the left. Business wants it centered.",
    buggyCode: `.hero-text { \n\tdisplay: flex; \n\tflex-direction: column; \n\tbackground-color: green; \n\ttext-align: left; \n\tcolor: blue; \n}`,
    expectedOutput: "text-align: center",
    rewards: { coins: 5, xp: 30 }
  },
  {
    title: "Invisible Button",
    category: "UI",
    description: "The login button has white text on a white background. Change the text color to black.",
    buggyCode: `.btn-login { \n\tdisplay: flex; \n\tflex-direction: column; \n\tpadding: 10px; \n\tcolor: #ffffff; \n\tbackground-color: #ffffff; \n}`,
    expectedOutput: "color: #000000",
    rewards: { coins: 5, xp: 30 }
  },
  {
    title: "Off By One Count",
    category: "Logic",
    description: "The loop should count from 1 to 10, but the total is off by one.",
    buggyCode: "let count = 0;\nfor (let i = 1; i < 10; i++) {\n\tcount += 1;\n}\nconsole.log(count);",
    expectedOutput: "10",
    rewards: { coins: 10, xp: 40 }
  },
  {
    title: "Wrong Discount Direction",
    category: "Logic",
    description: "The discount is being added instead of subtracted.",
    buggyCode: "function applyDiscount(price) {\n\treturn price + price * 0.2;\n}\n\nconsole.log(applyDiscount(100));",
    expectedOutput: "80",
    rewards: { coins: 10, xp: 40 }
  },
  {
    title: "Min Finder",
    category: "Logic",
    description: "The min function is returning the larger number.",
    buggyCode: "function min(a, b) {\n\tif (a > b) return a;\n\treturn b;\n}\n\nconsole.log(min(3, 7));",
    expectedOutput: "3",
    rewards: { coins: 5, xp: 20 }
  },
  {
    title: "Inclusive Range",
    category: "Logic",
    description: "The sum should include 5, but the loop stops too early.",
    buggyCode: "let total = 0;\nfor (let i = 1; i < 5; i++) {\n\ttotal += i;\n}\nconsole.log(total);",
    expectedOutput: "15",
    rewards: { coins: 5, xp: 20 }
  },
  {
    title: "Array Index Error",
    category: "Logic",
    description: "This function is supposed to return the last item in an array but it's returning undefined.",
    buggyCode: `function getLast(arr) { \n\tconst lastEle = arr[arr.length]; \n\treturn lastEle; \n}\n\narr = [1, 2, 3, 4, 5];\nconsole.log(getLast(arr));`,
    expectedOutput: "5",
    rewards: { coins: 15, xp: 80 }
  },
  {
    title: "Boolean Flip",
    category: "Logic",
    description: "The 'isLoggedIn' check is currently doing the opposite of what it should.",
    buggyCode: `const user = { \n\tname: "John Doe", \n\temail: "john.doe@example.com",
    \n\tisLoggedIn: false \n} \nif (user.isLoggedIn) { \n\tconst msg = "Please login into your account or create if you are new to proceed";\n\tconsole.log(msg); \n} else{ \n\tconst msg = "Welcome back, " + user.name + "!";\n\tconsole.log(msg); \n}`,
    expectedOutput: "Please login into your account or create if you are new to proceed",
    rewards: { coins: 15, xp: 70 }
  },
  {
    title: "Flexbox Alignment",
    category: "UI",
    description: "Items in the navbar should be spread out, not bunched together. Fix the justify-content property.",
    buggyCode: `.navbar { \n\tbackground-color: orange; \n\tpadding: 10px; \n\tfont-size: 16px; \n\tfont-weight: bold; \n\tdisplay: flex; \n\tjustify-content: flex-start; \n}`,
    expectedOutput: "justify-content: space-between",
    rewards: { coins: 10, xp: 40 }
  },
  {
    title: "Strict Equality Fix",
    category: "Logic",
    description: "The strict equality operator (===) is used to compare a number and a string, which will always be false. Fix the types to match.",
    buggyCode: `let task = 0; \nlet currTask = '0'; \n\nif (task === currTask) { const proceed = () => {\n\tconst msg = 'What you want to do today'; \n\tconsole.log(msg);\n\t} \n\tproceed(); \n}`,
    expectedOutput: "What you want to do today",
    rewards: { coins: 10, xp: 50 }
  },
  {
    title: "The Case of the Missing Comma",
    category: "Syntax",
    description: "An object is missing a comma between its properties. Fix it to make the object valid.",
    buggyCode: `const user = { name: 'Alice' age: 25 }; \nconst greet = 'Hello ' + user.name;\nconsole.log(greet);`,
    expectedOutput: "Hello Alice",
    rewards: { coins: 10, xp: 50 }
  },
  {
    title: "Async Await Misplacement",
    category: "Syntax",
    description: "You cannot use 'await' without an 'async' wrapper. Add the missing keyword. You don't need to change the logic just make it syntactically correct.",
    buggyCode: `function fetchData() {
                  \n\treturn new Promise((resolve, reject) => {
                  \n\t\tsetTimeout(() => {
                      \n\t\t\tresolve("Data received!");
                      \n\t}, 2000);
                  \n\t});
                  \n}

\n\nasync function getData() {
  \n\ttry {
    \n\t\tconsole.log("Fetching...");
    \n\t\tconst result = fetchData();
    \n\t\tconsole.log(result);
    \n\t\tconsole.log("Done!");
  \n\t} catch (error) {
    \n\t\tconsole.error("Error:", error);
  \n\t}
\n}

\n\ngetData();`,
    expectedOutput: "Fetching... Data received! Done!",
    rewards: { coins: 15, xp: 60 }
  },
  {
    title: "Unclosed Template Literal",
    category: "Syntax",
    description: "The developer forgot to close the backtick in this string.",
    buggyCode: `const msg = 'Welcome to the dashboard; \n\nconsole.log(msg);`,
    expectedOutput: "Welcome to the dashboard",
    rewards: { coins: 10, xp: 50 }
  },
  {
    title: "Array Last Index",
    category: "Logic",
    description: "The code is returning the second-to-last element instead of the last.",
    buggyCode: "const arr = [10, 20, 30];\nconst last = arr[arr.length - 2];\nconsole.log(last);",
    expectedOutput: "30",
    rewards: { coins: 10, xp: 50 }
  },
  {
    title: "Variable Hoisting Bug",
    category: "Syntax",
    description: "The variable is being used before it is defined. Fix the order.",
    buggyCode: `let arr = [1,2,3,4,5,6,7,8,9,10];\n\nconsole.log(total); \n\nlet total = 0;\n\nfor(let i=0;i<arr.length;i++){\n\ttotal += arr[i];\n}`,
    expectedOutput: "55",
    rewards: { coins: 15, xp: 70 }
  },
  {
    title: "Spread Operator Typo",
    category: "Syntax",
    description: "The spread operator needs three dots, not two.",
    buggyCode: `let oldArr = [1,2,3,4,5,6,7,8];\n\nconst newArr = [..oldArr, 9, 10];\n\nfor(let i=0;i<newArr.length;i++){\n process.stdout.write(newArr[i] + " ");\n}`,
    expectedOutput: "1 2 3 4 5 6 7 8 9 10 ",
    rewards: { coins: 10, xp: 50 }
  },
  {
    title: "Mismatched Parentheses",
    category: "Syntax",
    description: "The if-statement has an extra closing parenthesis.",
    buggyCode: `x = 18 \n\nif (x > 17)) { \n\tconsole.log("You are eligible to vote.") \n} else { \n\tconsole.log("You are not eligible to vote."); \n}`,
    expectedOutput: "You are eligible to vote.",
    rewards: { coins: 10, xp: 50 }
  },
  {
    title: "Reserved Keyword Clash",
    category: "React",
    description: "You cannot name a variable 'class' in React. Rename it to 'className'.",
    buggyCode: `<button
                \nonClick={() => { setEditing(false); editUserProfile(profile.description); }}
                \nclass='px-4 py-2.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition'
                \n>
                \nSave
                \n</button>`,
    expectedOutput: "className",
    rewards: { coins: 15, xp: 60 }
  },
  {
    title: "Export Default Typo",
    category: "React",
    description: "Fix the keyword 'defualt'.",
    buggyCode: `function HelloWorld() { \n\treturn <h1>Hello, React!</h1>; \n} \n\nexport defualt HelloWorld;`,
    expectedOutput: "default",
    rewards: { coins: 10, xp: 40 }
  },
  {
    title: "Arrow Function Brackets",
    category: "Syntax",
    description: "A multi-line arrow function needs curly braces. Add the missing brackets.",
    buggyCode: `const log = () => console.log('A'); \n\tconsole.log('B'); \n\tconsole.log('C'); \n\nlog();`,
    expectedOutput: "A B C",
    rewards: { coins: 15, xp: 70 }
  },
  {
    title: "The Zero Comparison",
    category: "Logic",
    description: "Print the case for when score is exactly 100 by choosing the appropriate score value.",
    buggyCode: `score = 1; 
    \n\nif (score === 0) {\n 
    \tconsole.log('No points'); 
    \n\tconsole.log("You lose, try again."); 
\n} else if (score > 0 && score < 50) { \n\t
    console.log('Some points'); 
    \n\tconsole.log("Not bad, but you can do better!"); 
\n} else if (score >= 50 && score < 80) { 
    \n\tconsole.log('Good score'); 
    \n\tconsole.log("Great job! You're getting there!"); 
\n} else if (score >= 80 && score < 100) { 
    \n\tconsole.log('Excellent score'); 
    \n\tconsole.log("Awesome! You're a coding pro!"); 
\n} else if (score === 100) { 
    \n\tconsole.log('Perfect score'); 
    \n\tconsole.log("Congratulations! You've mastered the challenge!"); 
\n}`,
    expectedOutput: "Perfect score Congratulations! You've mastered the challenge!",
    rewards: { coins: 20, xp: 100 }
  },
  {
    title: "Falsy Value Bug",
    category: "Logic",
    description: "The function should return true for any number, including 0. Currently, it is behaving incorrectly for 0 and non-number values.",
    buggyCode: `function isValid(val) { \n\treturn val || false; \n} \n\nconsole.log(isValid("Hello")); \nconsole.log(isValid("")); \nconsole.log(isValid(0)); \nconsole.log(isValid(42));`,
    expectedOutput: 'false false true true',
    rewards: { coins: 25, xp: 120 }
  },
  {
    title: "Array Filter Logic",
    category: "Logic",
    description: "The filter should remove even numbers, but it's currently removing odd numbers.",
    buggyCode: `arr = [1, 2, 3, 4, 5, 6];\n\nconst odds = arr.filter(n => n % 2 === 0);\n\nfor(let i=0;i<odds.length;i++){\n\tprocess.stdout.write(odds[i] + " ");\n}`,
    expectedOutput: '1 3 5 ',
    rewards: { coins: 20, xp: 90 }
  },
  {
    title: "Incorrect Average",
    category: "Logic",
    description: "The formula for the average is missing parentheses around the sum.",
    buggyCode: `let a = 10; \nlet b = 20;\n\nconst avg = a + b / 2; \nconsole.log(avg);`,
    expectedOutput: '15',
    rewards: { coins: 15, xp: 80 }
  },
  {
    title: "Early Return Bug",
    category: "Logic",
    description: "The function returns too early. Move the return statement outside the loop.",
    buggyCode: `function printOneToTen(){ \n\tfor(let i=1; i<=10; i++) { \n\tprocess.stdout.write(i + " "); \n\treturn "Done!"; \n} \n} \n\nprintOneToTen();`,
    expectedOutput: '1 2 3 4 5 6 7 8 9 10',
    rewards: { coins: 20, xp: 100 }
  },
  {
    title: "Shadowing Variables",
    category: "Logic",
    description: "The purpose of this function is to double the value of x, but the parameter name is shadowing the outer variable. Change the parameter name to fix the logic.",
    buggyCode: `let x = 10; \nfunction add(x) { \n\tlet sum = x + x; \n\treturn sum; \n} \n\nconsole.log(add(5));`,
    expectedOutput: '20',
    rewards: { coins: 20, xp: 90 }
  },
  {
    title: "Logic Loop Trap",
    category: "Logic",
    description: "Fix the condition so the loop prints the numbers from 0 to 10.",
    buggyCode: `for (let i = 0; i < 10; i++){ \n\tprocess.stdout.write(i + " "); \n}`,
    expectedOutput: '0 1 2 3 4 5 6 7 8 9 10 ',
    rewards: { coins: 15, xp: 60 }
  },
  {
    title: "Object Property Access",
    category: "Logic",
    description: "This code is accessing users object first element's attributes in a wrong way replace () with suitable brackets.",
    buggyCode: "users = [ \n{ id: 1, username: 'alice', email: 'alice@example.com' }, \n{ id: 2, username: 'bob', email: 'bob@example.com' }, \n{ id: 3, username: 'charlie', email: 'charlie@example.com' }\n]\n\nconst id = users(0).id;\nconst username = users(0).username;\nconst email = users(0).email;\n\nprocess.stdout.write(`ID: ${id}, Username: ${username}, Email: ${email}`);",
    expectedOutput: "ID: 1, Username: alice, Email: alice@example.com",
    rewards: { coins: 20, xp: 85 }
  },
  {
    title: "Place evenly Fix",
    category: "UI",
    description: "The product cards are sticking to each other place them evenly.",
    buggyCode: `.container { \n\tbackground-color: orange; \n\tpadding: 10px; \n\tfont-size: 16px; \n\tfont-weight: bold; \n\tdisplay: flex; \n\tflex-wrap: nowrap; \n\tjustify-content: center; \n}`,
    expectedOutput: "justify-content: space-evenly;",
    rewards: { coins: 10, xp: 40 }
  },
  {
    title: "Hidden Scrollbar",
    category: "UI",
    description: "Users can't scroll the sidebar. Fix the overflow property.",
    buggyCode: `.sidebar { \n\tbackground-color: orange; \n\tpadding: 10px; \n\tfont-size: 16px; \n\tfont-weight: bold; \n\toverflow: hidden; \n}`,
    expectedOutput: "auto",
    rewards: { coins: 10, xp: 30 }
  },
  {
    title: "Full Height Section",
    category: "UI",
    description: "The section should take up the full viewport height.",
    buggyCode: `.hero { \n\tbackground-color: orange; \n\tpadding: 10px; \n\tfont-size: 16px; \n\tfont-weight: bold; \n\theight: 100%; \n}`,
    expectedOutput: "100vh",
    rewards: { coins: 10, xp: 50 }
  },
  {
    title: "Border Radius Overload",
    category: "UI",
    description: "The card should have subtle rounded corners (8px), not a circle.",
    buggyCode: `.card { \n\tbackground-color: orange; \n\tpadding: 10px; \n\tfont-size: 16px; \n\tfont-weight: bold; \n\tborder-radius: 50%; \n}`,
    expectedOutput: "8px",
    rewards: { coins: 5, xp: 25 }
  },
  {
    title: "Text Overlap",
    category: "UI",
    description: "Lines of text are overlapping. Increase the line height by 50%.",
    buggyCode: `p { \n\tbackground-color: orange; \n\tpadding: 10px; \n\tfont-size: 16px; \n\tfont-weight: bold; \n\tline-height: 0.5; \n}`,
    expectedOutput: "1.5",
    rewards: { coins: 10, xp: 40 }
  },
  {
    title: "Z-Index Battle",
    category: "UI",
    description: "The modal is appearing behind the navbar. Increase its z-index to 100.",
    buggyCode: `.modal { \n\tz-index: 1; \n} \n\n.navbar { \n\tz-index: 10; \n}`,
    expectedOutput: "100",
    rewards: { coins: 15, xp: 60 }
  },
  {
    title: "Responsive Image",
    category: "UI",
    description: "The image is breaking the layout on mobile. Make it responsive such that it scales down to fit smaller screens.",
    buggyCode: `img { \n\tbackground-color: orange; \n\tpadding: 10px; \n\tfont-size: 16px; \n\tmargin: 2px; \n\twidth: 80%; \n}`,
    expectedOutput: "max-width: 100%",
    rewards: { coins: 15, xp: 50 }
  },
  {
    title: "Boolean Logic Mixup",
    category: "Logic",
    description: "The condition should allow entry if the user has a key OR the door is already open.",
    buggyCode: "const hasKey = true;\nconst doorOpen = false;\n\nif (hasKey && doorOpen) {\n\tconsole.log(\"Enter\");\n} else {\n\tconsole.log(\"Locked\");\n}",
    expectedOutput: "Enter",
    rewards: { coins: 10, xp: 30 }
  },
  {
    title: "Countdown Loop",
    category: "Logic",
    description: "The countdown stops early due to a premature break.",
    buggyCode: "for (let i = 5; i >= 0; i--) {\n\tprocess.stdout.write(i + \" \");\n\tif (i === 3) {\n\t\tbreak;\n\t}\n}",
    expectedOutput: "5 4 3 2 1 0 ",
    rewards: { coins: 10, xp: 30 }
  },
  {
    title: "String Contains",
    category: "Logic",
    description: "The check fails when the substring appears at the start of the string.",
    buggyCode: "const msg = \"hello world\";\nconst hasHello = msg.indexOf(\"hello\") > 0;\nconsole.log(hasHello);",
    expectedOutput: "true",
    rewards: { coins: 10, xp: 40 }
  },
  {
    title: "Swap Variables",
    category: "Logic",
    description: "The values should be swapped, but both end up the same.",
    buggyCode: "let a = 1;\nlet b = 2;\n\na = b;\nb = a;\n\nconsole.log(a, b);",
    expectedOutput: "2 1",
    rewards: { coins: 15, xp: 50 }
  },
  {
    title: "Max In Array",
    category: "Logic",
    description: "The maximum value is not being tracked correctly.",
    buggyCode: "const nums = [4, 9, 2];\nlet max = 0;\n\nfor (const n of nums) {\n\tif (n < max) {\n\t\tmax = n;\n\t}\n}\n\nconsole.log(max);",
    expectedOutput: "9",
    rewards: { coins: 10, xp: 30 }
  },
  {
    title: "Even Filter",
    category: "Logic",
    description: "The filter should return even numbers, but it returns odds.",
    buggyCode: `const arr = [1, 2, 3, 4];\nconst evens = arr.filter(n => n % 2 !== 0);\n\nfor(let i=0;i<evens.length;i++){\n\tprocess.stdout.write(evens[i] + " ");\n}`,
    expectedOutput: "2 4 ",
    rewards: { coins: 5, xp: 20 }
  },
  {
    title: "Score Grading",
    category: "Logic",
    description: "A score of 75 should map to grade C, not D.",
    buggyCode: "const score = 75;\nlet grade = \"F\";\n\nif (score >= 90) {\n\tgrade = \"A\";\n} else if (score >= 80) {\n\tgrade = \"B\";\n} else if (score >= 70) {\n\tgrade = \"D\";\n}\n\nconsole.log(grade);",
    expectedOutput: "C",
    rewards: { coins: 5, xp: 20 }
  },
  {
    title: "Palindrome Check",
    category: "Logic",
    description: "The check should be case-insensitive.",
    buggyCode: "function isPalindrome(str) {\n\tconst rev = str.split(\"\").reverse().join(\"\");\n\treturn str === rev;\n}\n\nconsole.log(isPalindrome(\"Level\"));",
    expectedOutput: "true",
    rewards: { coins: 5, xp: 25 }
  },
  {
    title: "Unique Count",
    category: "Logic",
    description: "The size of a Set is not being read correctly.",
    buggyCode: "const nums = [1, 1, 2, 3, 3];\nconst unique = new Set(nums);\n\nconsole.log(unique.length);",
    expectedOutput: "3",
    rewards: { coins: 5, xp: 20 }
  },
  {
    title: "Factorial Base Case",
    category: "Logic",
    description: "The factorial of 0 should return 1, but the function recurses forever.",
    buggyCode: "function factorial(n) {\n\tif (n === 1) return 1;\n\treturn n * factorial(n - 1);\n}\n\nconsole.log(factorial(0));",
    expectedOutput: "1",
    rewards: { coins: 15, xp: 50 }
  }
];

const avatarLinks = [
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/5.png?updatedAt=1770126537060" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/8.png?updatedAt=1770126537096" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/7.png?updatedAt=1770126537025" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/6.png?updatedAt=1770126536998" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/4.png?updatedAt=1770126536920" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/1.png?updatedAt=1770126536892" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/3.png?updatedAt=1770126536856" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/2.png?updatedAt=1770126536809" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_13.png?updatedAt=1770126492056" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_16.png?updatedAt=1770126492060" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_10.png?updatedAt=1770126492009" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/3d_3.png?updatedAt=1770126492047" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_11.png?updatedAt=1770126492020" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_14.png?updatedAt=1770126492018" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_12.png?updatedAt=1770126491996" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_9.png?updatedAt=1770126492019" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_17.png?updatedAt=1770126492003" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_19.png?updatedAt=1770126491975" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/3d_2.png?updatedAt=1770126492003" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_20.png?updatedAt=1770126491982" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_15.png?updatedAt=1770126492006" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_27.png?updatedAt=1770126491996" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_26.png?updatedAt=1770126491979" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_18.png?updatedAt=1770126491968" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/3d_1.png?updatedAt=1770126492009" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_24.png?updatedAt=1770126492003" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_25.png?updatedAt=1770126491942" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_22.png?updatedAt=1770126492009" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_23.png?updatedAt=1770126491908" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/vibrent_21.png?updatedAt=1770126491724" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/3d_4.png?updatedAt=1770126491611" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/3d_5.png?updatedAt=1770126491538" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/bluey_1.png?updatedAt=1770126491361" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/toon_2.png?updatedAt=1770126488381" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_13.png?updatedAt=1770126488387" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_18.png?updatedAt=1770126488362" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_20.png?updatedAt=1770126488393" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_5.png?updatedAt=1770126488376" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/teams_5.png?updatedAt=1770126488368" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/bluey_2.png?updatedAt=1770126488355" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_15.png?updatedAt=1770126488304" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/toon_3.png?updatedAt=1770126488298" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_5.png?updatedAt=1770126488291" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/teams_8.png?updatedAt=1770126488277" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_3.png?updatedAt=1770126488285" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/bluey_3.png?updatedAt=1770126488270" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_21.png?updatedAt=1770126488262" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_8.png?updatedAt=1770126488335" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_15.png?updatedAt=1770126488317" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_17.png?updatedAt=1770126488259" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/bluey_9.png?updatedAt=1770126488310" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/toon_7.png?updatedAt=1770126488269" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/teams_2.png?updatedAt=1770126488262" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_10.png?updatedAt=1770126488238" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_1.png?updatedAt=1770126488251" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/bluey_5.png?updatedAt=1770126488259" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_6.png?updatedAt=1770126488245" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/bluey_4.png?updatedAt=1770126488248" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/teams_9.png?updatedAt=1770126488178" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_1.png?updatedAt=1770126488147" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_23.png?updatedAt=1770126488193" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_13.png?updatedAt=1770126488163" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/teams_6.png?updatedAt=1770126488259" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_8.png?updatedAt=1770126488170" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/bluey_10.png?updatedAt=1770126488241" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_9.png?updatedAt=1770126488156" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/toon_4.png?updatedAt=1770126488230" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_9.png?updatedAt=1770126488243" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_11.png?updatedAt=1770126488293" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/bluey_7.png?updatedAt=1770126488220" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/toon_9.png?updatedAt=1770126488252" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_14.png?updatedAt=1770126488300" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_12.png?updatedAt=1770126488239" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/bluey_8.png?updatedAt=1770126488206" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_3.png?updatedAt=1770126488235" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_4.png?updatedAt=1770126488201" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_14.png?updatedAt=1770126488217" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_11.png?updatedAt=1770126488287" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/bluey_6.png?updatedAt=1770126488239" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_10.png?updatedAt=1770126488226" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_2.png?updatedAt=1770126488213" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_19.png?updatedAt=1770126488230" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_12.png?updatedAt=1770126488111" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_9.png?updatedAt=1770126488256" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_22.png?updatedAt=1770126488196" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_15.png?updatedAt=1770126488106" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_21.png?updatedAt=1770126488074" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_4.png?updatedAt=1770126488086" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_3.png?updatedAt=1770126488261" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_33.png?updatedAt=1770126488210" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_4.png?updatedAt=1770126488220" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/teams_4.png?updatedAt=1770126488091" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/toon_1.png?updatedAt=1770126488174" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/toon_6.png?updatedAt=1770126488180" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_1.png?updatedAt=1770126488175" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/toon_5.png?updatedAt=1770126488135" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/teams_1.png?updatedAt=1770126488268" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_2.png?updatedAt=1770126488193" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_35.png?updatedAt=1770126488162" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_18.png?updatedAt=1770126488182" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_7.png?updatedAt=1770126488202" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_30.png?updatedAt=1770126488098" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_14.png?updatedAt=1770126488081" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_26.png?updatedAt=1770126488209" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/teams_7.png?updatedAt=1770126488183" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_2.png?updatedAt=1770126488168" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_16.png?updatedAt=1770126488153" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_27.png?updatedAt=1770126488177" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_5.png?updatedAt=1770126488214" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_19.png?updatedAt=1770126488141" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_12.png?updatedAt=1770126488139" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_10.png?updatedAt=1770126488222" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_34.png?updatedAt=1770126488128" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_7.png?updatedAt=1770126488188" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/toon_8.png?updatedAt=1770126488146" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_20.png?updatedAt=1770126488090" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_28.png?updatedAt=1770126488079" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/toon_10.png?updatedAt=1770126488076" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_6.png?updatedAt=1770126487951" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_25.png?updatedAt=1770126487956" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_11.png?updatedAt=1770126488156" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_17.png?updatedAt=1770126488205" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_7.png?updatedAt=1770126488084" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_22.png?updatedAt=1770126488095" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_29.png?updatedAt=1770126488074" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_31.png?updatedAt=1770126488055" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_8.png?updatedAt=1770126487935" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_6.png?updatedAt=1770126488090" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/teams_3.png?updatedAt=1770126488002" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/notion_13.png?updatedAt=1770126487990" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/upstream_16.png?updatedAt=1770126488033" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_32.png?updatedAt=1770126487896" },
  { imageUrl: "https://ik.imagekit.io/glsrrntcvj/memo_24.png?updatedAt=1770126487970" }
];

const connectDb = () => {
    mongoose.connect(process.env.MONGO_DB_URI)
    .then(async () => {
        console.log('connected to the database')
        // await Issue.deleteMany()
        // await Issue.insertMany(dummyIssues);
        // process.exit()
        // await Avatar.deleteMany()
        // await Avatar.insertMany(avatarLinks);
        // process.exit()
    })
    .catch((err) => {
        console.log('error in connecting to the database', err)
    })
}

export default connectDb