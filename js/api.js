document.addEventListener('DOMContentLoaded', () => {
    async function fetchProducts() {
        const url = `https://fakestoreapi.com/products/category/electronics`;

        const load = document.getElementById('loadApi');
        const content = document.getElementById('content');
        const errorElement = document.getElementById('error');

        errorElement.style.display = 'none'

        try {
            load.style.display = 'block';

            const response = await fetch(url);
            if (!response.ok) {
                console.info('error')
                throw new Error('error');
            }

            const products = await response.json();

            console.log(products)

            load.style.display = 'none';

            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }

            products.forEach(product => {
                const articleElement = document.createElement('article');
                articleElement.classList.add('card');

                const imgElement = document.createElement('img');
                imgElement.src = product.image;
                imgElement.alt = product.title;
                articleElement.appendChild(imgElement);

                const titleElement = document.createElement('strong');
                titleElement.textContent = product.title;
                articleElement.appendChild(titleElement);

                const descriptionElement = document.createElement('em');
                descriptionElement.textContent = product.description.substring(0, 150) + '...'; // Ограничиваем длину описания
                articleElement.appendChild(descriptionElement);

                const priceElement = document.createElement('p');
                priceElement.textContent = `Цена: $${product.price}`;
                articleElement.appendChild(priceElement);

                content.appendChild(articleElement);
            });

        } catch (error) {
            load.style.display = 'none';
            errorElement.style.display = 'block';
        }
    }

    fetchProducts();
});