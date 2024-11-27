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
        reviewContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Отзыв</th>
                    </tr>
                </thead>
                <tbody id="reviewTableBody"></tbody>
            </table>
        `;
    }

    function addReview(name, review) {
        if (!document.getElementById('reviewTableBody')) generateReviewTable();

        const tbody = document.getElementById('reviewTableBody');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td data-label="Имя">${name}</td>
            <td data-label="Отзыв">${review}</td>
        `;

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
