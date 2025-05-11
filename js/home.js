document.addEventListener("DOMContentLoaded", function(event) {
    getBooks()

    async function getBooks() {
        const response = await fetch("https://v2.api.noroff.dev/blog/posts/Nestor")
        const data = await response.json()
        const books = data.data
        console.log(books);
        
    }
})