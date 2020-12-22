function createShowPage(showData) {
    const title = showData.name;
    const imgsrc =
        (showData.image && showData.image.medium) || 'img/no_image.jpeg';
    const language = showData.language || 'N/A';
    let genres = showData.genres;
    const rating = showData.rating.average || 'N/A';
    const network = (showData.network && showData.network.name) || 'N/A';
    const summary = showData.summary || 'N/A';
    if (genres) {
        const liElements = genres.map((genre) => `<li>${genre}</li>`).join('');
        genres = `<ul>${liElements}</ul>`;
    } else genres = 'N/A';
    const elementHTML = `
    <h1>${title}</h1>
    <img src="${imgsrc}" alt="${title}"/>
    <dl>
        <dt>Language</dt>
        <dd>${language}</dd>
        <dt>Genres</dt>
        <dd>
            ${genres}
        </dd>
        <dt>Average Rating</dt>
        <dd>${rating}</dd>
        <dt>Network</dt>
        <dd>${network}</dd>
        <dt>Summary</dt>
        <dd>${summary}</dd>
    </dl>`;
    return elementHTML;
}

function clickedLink(event) {
    event.preventDefault();
    const target = event.target;
    $('#showList').hide();
    const apiUrl = target.href;
    const showDiv = $('#show');
    showDiv.html('');
    var requestConfig = {
        method: 'GET',
        url: apiUrl,
    };
    $.ajax(requestConfig).then(function (response) {
        showDiv.html(createShowPage(response));
        showDiv.show();
    });
    console.log(event);
}

function createList(data) {
    return data
        .map((show) => {
            const html = `<li><a href="${show._links.self.href}">${show.name}</a></li>`;
            return html;
        })
        .join('');
}

function showSearchError(show) {
    if (show) {
        $('#error').show();
    } else {
        $('#error').hide();
    }
}

(function ($) {
    const allShows = 'http://api.tvmaze.com/shows';
    var requestConfig = {
        method: 'GET',
        url: allShows,
    };
    $.ajax(requestConfig).then(function (response) {
        console.log(response);
        const list = $(createList(response));
        list.find('a').on('click', clickedLink);
        $('#showList').append(list);
        $('#showList').show();
    });
    $('#searchForm').submit((event) => {
        event.preventDefault();
        const query = $('#search_term').val();
        if (!query || typeof query !== 'string' || !query.trim()) {
            showSearchError(true);
            return;
        } else {
            showSearchError(false);
        }
        $('#showList').empty();
        var requestConfig = {
            method: 'GET',
            url: `http://api.tvmaze.com/search/shows?q=${query}`,
        };
        $.ajax(requestConfig).then(function (response) {
            const list = $(createList(response.map((entry) => entry.show)));
            list.find('a').on('click', clickedLink);
            $('#showList').append(list);
            $('#search_term').val('');
            $('#showList').show();
            $('#homeLink').show();
        });
    });
})(window.jQuery);
