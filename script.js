// Perform search and store the search term
function performSearch() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput) {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

        // Add new search term to history if it's not a duplicate
        if (!searchHistory.includes(searchInput)) {
            searchHistory.push(searchInput);
        }

        // Save updated history to localStorage
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

        // Reload search history display
        loadSearchHistory();

        // Clear the search input
        document.getElementById('searchInput').value = '';
    }
}

// Clear all search history
function clearSearchHistory() {
    localStorage.removeItem('searchHistory'); // Clear the history in localStorage
    loadSearchHistory(); // Reload display
}

// Load search history from localStorage and display it
function loadSearchHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Clear previous history

    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Display each search term in the list with a remove button
    searchHistory.forEach(function (term, index) {
        let li = document.createElement('li');
        li.className = 'search-item';

        // Create a span to display the search term (clickable)
        let span = document.createElement('span');
        span.textContent = term;
        span.className = 'search-term';
        span.onclick = function () {
            document.getElementById('searchInput').value = term; // Update input field
        };

        // Create a button to remove the term from history
        let removeButton = document.createElement('button');
        removeButton.textContent = '✖';
        removeButton.className = 'remove-button';
        removeButton.onclick = function (event) {
            event.stopPropagation(); // Prevent the click event from triggering the input blur
            removeSearchTerm(index);
        };

        li.appendChild(span);
        li.appendChild(removeButton);
        historyList.appendChild(li);
    });

    // Show or hide the history list based on whether there are items
    historyList.style.display = historyList.childElementCount > 0 ? 'block' : 'none';
}

// Remove a specific search term by index
function removeSearchTerm(index) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.splice(index, 1); // Remove the term at the specified index
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); // Update history in localStorage
    loadSearchHistory(); // Reload display
}
