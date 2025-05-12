document.addEventListener("DOMContentLoaded", function(event){
    let providedBook;
    const img = document.getElementById("book-image")
    const title = document.getElementById("book-title")
    const synopsis = document.getElementById("book-description")
    const theme_list = document.getElementById("theme-list")

    const id = getQueryId()
    loadBook()

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



    function separateThemes(themes) {
        return themes.split(',').map(theme => theme.trim());
    }


    function getQueryId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
    }
})