document.addEventListener('DOMContentLoaded', () => {
    const blogPostsSection = document.getElementById('blog-posts');
    
    function loadBlogPosts() {
        let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        
        if (posts.length === 0) {
            blogPostsSection.innerHTML = '<p>No blog posts yet. Be the first to create one!</p>';
            return;
        }
        
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        blogPostsSection.innerHTML = posts.map(post => `
            <article class="blog-post">
                <h2>${post.title}</h2>
                <p class="post-date">Posted on ${new Date(post.date).toLocaleDateString()}</p>
                <p>${post.content.substring(0, 150)}...</p>
                <a href="post.html?id=${post.id}">Read more</a>
            </article>
        `).join('');
    }
    
    loadBlogPosts();
});