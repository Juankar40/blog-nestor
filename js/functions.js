    function parseBookBody(body) {
        const bookInfo = {};

        if (!body) return bookInfo;

        const fields = body.split('|');

        fields.forEach(field => {
            if (field.includes(':')) {
                const [key, value] = field.split(':');
                if (key && value) {
                    bookInfo[key.trim()] = value.trim();
                }
            }
        });

        if (body.includes('synopsis:')) {
            const synopsisMatch = body.match(/synopsis:(.*?)(?=\||$)/s);
            if (synopsisMatch && synopsisMatch[1]) {
                bookInfo.synopsis = synopsisMatch[1].trim();
            }
        }

        return bookInfo;
    }