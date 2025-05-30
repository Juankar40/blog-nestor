document.addEventListener("DOMContentLoaded", function(event){
    const editFormBtn = document.getElementById("edit-form")
    const deleteBtn = document.getElementById("delete-book")

    let providedBook;
    const img = document.getElementById("book-image")
    const title = document.getElementById("book-title")
    const synopsis = document.getElementById("book-description")
    const theme_list = document.getElementById("theme-list")

    const id = getQueryId()
    loadBook()

    deleteBtn.addEventListener("click", async function(event) {
        const confirmation = confirm("Are you sure you want to delete this book?");
        if (!confirmation) {
            return; 
        }

        try {
            const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Nestor/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmVzdG9yIiwiZW1haWwiOiJuZXNwb2wwNDExMkBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc0NjYzNzQwMH0.MbQJm7ZeY4bFifvYczYF4dycuBKHUVghcRwDWPNYvos"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert("Book deleted successfully.");
            window.location.href = "./index.html"; 
        } catch (error) {
            console.error("Error deleting book:", error);
            alert("An error occurred while trying to delete the book.");
        }
    });  

    editFormBtn.addEventListener("click", function(event) {
        window.location.href = `./editBook.html?id=${id}`
    })

    function loadBookDOM(book){
        const themes = separateThemes(book.themes)

        img.src = providedBook.media.url    
        title.textContent = book.title
        synopsis.textContent = book.synopsis

        themes.forEach(themeText => {
            const theme = document.createElement("li")
            theme.textContent = themeText
            theme_list.appendChild(theme)
        });

    }

    async function loadBook(){
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Nestor/${id}`)
        const data = await response.json()
        providedBook = data.data
        const book = parseBookBody(providedBook.body)

        loadBookDOM(book)
    }





})