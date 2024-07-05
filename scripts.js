document.addEventListener('DOMContentLoaded', function () {
    fetch('card.txt')
        .then(response => response.text())
        .then(data => {
            const posts = data.split('\n').filter(line => line.trim() !== '');
            const blogPostsContainer = document.getElementById('blog-posts');

            posts.forEach(post => {
                const [id, title, text, link] = post.split(':');
                const cardHTML = `
                    <div class="col-md-8">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h2 class="card-title">${title}</h2>
                                <p class="card-text">${text}</p>
                                <a style="text-decoration:none;" href="https://github.com/Phineas/lanyard">Hemen İncele</a>
                            </div>
                        </div>
                    </div>
                `;
                blogPostsContainer.insertAdjacentHTML('beforeend', cardHTML);
            });
        })
        .catch(error => console.error('Error fetching card.txt:', error));
});
