document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reviewForm');
    const reviewContainer = document.getElementById('reviewContainer');

    loadReviews();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('nameInput').value.trim();
        const review = document.getElementById('reviewInput').value.trim();

        if (name && review) {
            addReview(name, review);
            saveReviews();
            form.reset();
        }
    });

    function generateReviewTable() {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const nameHeader = document.createElement('th');
        const reviewHeader = document.createElement('th');

        nameHeader.textContent = 'Имя';
        reviewHeader.textContent = 'Отзыв';

        headerRow.appendChild(nameHeader);
        headerRow.appendChild(reviewHeader);
        thead.appendChild(headerRow);

        const tbody = document.createElement('tbody');
        tbody.id = 'reviewTableBody';

        table.appendChild(thead);
        table.appendChild(tbody);

        reviewContainer.innerHTML = '';
        reviewContainer.appendChild(table);
    }

    function addReview(name, review) {
        if (!document.getElementById('reviewTableBody')) generateReviewTable();

        const tbody = document.getElementById('reviewTableBody');
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const reviewCell = document.createElement('td');
        nameCell.textContent = name;
        reviewCell.textContent = review;
        row.appendChild(nameCell);
        row.appendChild(reviewCell);

        tbody.appendChild(row);
    }

    function saveReviews() {
        const rows = Array.from(document.querySelectorAll('#reviewTableBody tr'));
        const reviews = rows.map(row => {
            const cells = row.querySelectorAll('td');
            return {
                name: cells[0].textContent,
                review: cells[1].textContent
            };
        });

        localStorage.setItem('userReviews', JSON.stringify(reviews));
    }

    function loadReviews() {
        const savedReviews = localStorage.getItem('userReviews');
        if (savedReviews) {
            generateReviewTable();
            const reviews = JSON.parse(savedReviews);
            reviews.forEach(({ name, review }) => addReview(name, review));
        }
    }
});
