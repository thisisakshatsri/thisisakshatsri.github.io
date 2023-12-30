const inputArea = document.querySelector(".large-area--input");
const outputArea = document.querySelector(".large-area--output");
const btnFormat = document.querySelector(".controls__button--format");
const btnMinify = document.querySelector(".controls__button--minify");
const githubUsernameInput = document.getElementById("githubUsername");
const btnGetStats = document.querySelector(".controls__button--get-stats");

btnFormat.addEventListener("click", () => {
    const formatted = JSON.stringify(JSON.parse(inputArea.value) , null , 4);
    outputArea.value = formatted;
});

btnMinify.addEventListener("click",  () => {
    const minified = JSON.stringify(JSON.parse(inputArea.value));
    this.outputArea.value = minified;
});

btnGetStats.addEventListener("click", async () => {
    const githubUsername = githubUsernameInput.value.trim();
    if(githubUsername) {
        try {
            const response = await fetch(`https://api.github.com/users/${githubUsername}`);
            if(response.ok) {
                const userData = await response.json();
                const formatted = JSON.stringify(userData , null , 4);
                outputArea.value = formatted;
            } else if(response.status === 404){
                outputArea.value = `User not found: ${githubUsername}`
            }
        } catch(error){
            outputArea.value = `Error`;
        }
    }
    if(!githubUsername){
        outputArea.value = `Error`;
    }
});