document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-post-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('post-title').value.trim();
        const content = document.getElementById('post-content').value.trim();
        const imageUrl = document.getElementById('post-image').value.trim();

        if (validateForm(title, content)) {
            savePost(title, content, imageUrl);
            window.location.href = 'index.html';
        }
    });

    function validateForm(title, content) {
        if (title === '') {
            alert('Please enter a title for your blog post.');
            return false;
        }
        if (content === '') {
            alert('Please enter content for your blog post.');
            return false;
        }
        return true;
    }

    function savePost(title, content, imageUrl) {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const newPost = {
            id: Date.now().toString(),
            title: title,
            content: content,
            imageUrl: imageUrl,
            date: new Date().toISOString()
        };
        posts.push(newPost);
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }
});