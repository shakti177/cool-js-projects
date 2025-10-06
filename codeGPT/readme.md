# CodeGPT

**CodeGPT** is a web-based tool built with HTML, CSS, and JavaScript that integrates with the **Gen AI** API to provide optimized JavaScript solutions based on your problem statements. It helps developers quickly get efficient code solutions directly in the browser without any setup or complex configurations.

## Features

- **Optimized JavaScript Solutions**: Get efficient and optimized JavaScript code for your problem statements.
- **Simple Interface**: Just enter your **Gen AI** API key and your problem description to get the solution.
- **No Dependencies**: Built using only HTML, CSS, and JavaScript, so you can run it directly in your browser.
- **Instant Feedback**: Get the most optimized solution in real-time.

## How It Works

1. Input your **Gen AI** API key into the field.
2. Type your JavaScript problem statement.
3. Click the "Generate Solution" button.
4. **CodeGPT** will fetch the most optimized JavaScript solution from **Gen AI** and display it on the screen.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/anandku06/CodeGPT.git
   cd CodeGPT
   ```

2. Open the `index.html` file in your browser.

3. Enter your **Gen AI** API key in the `.env` file and provide a problem statement. Then, click "Generate Solution" to receive an optimized JavaScript solution.
```bash
GEMINI_API_KEY=your_gen_ai_api_key_here
```

## Project Structure

```plaintext
.
├── index.html        # Main HTML file with the user interface
├── styles.css        # CSS for styling the interface
├── script.js         # JavaScript for handling API calls and UI interactions
└── README.md         # Project documentation
```

## Example Usage

1. **Input Problem Statement**  
   Example:  
   _Write a function to check if a number is prime._

2. **Generated Output**  
   Suggested Solution:
   ```javascript
   function isPrime(num) {
     if (num <= 1) return false;
     for (let i = 2; i <= Math.sqrt(num); i++) {
       if (num % i === 0) return false;
     }
     return true;
   }
   ```

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Make changes to the HTML, CSS, or JavaScript files.
3. Submit a pull request with a detailed description of your changes.