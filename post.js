document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('blog-post');
    const editButton = document.getElementById('edit-button');
    let currentPost = null;

    function getPostIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    function loadPost() {
        const postId = getPostIdFromUrl();
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        currentPost = posts.find(post => post.id === postId);

        if (currentPost) {
            displayPost();
        } else {
            postContainer.innerHTML = '<p>Post not found.</p>';
        }
    }

    function displayPost() {
        postContainer.innerHTML = `
            <h2>${currentPost.title}</h2>
            <p class="post-date">Posted on ${new Date(currentPost.date).toLocaleDateString()}</p>
            ${currentPost.imageUrl ? `<img src="${currentPost.imageUrl}" alt="${currentPost.title}">` : ''}
            <div class="post-content">${currentPost.content}</div>
        `;
    }

    function enableEditing() {
        postContainer.innerHTML = `
            <input type="text" id="edit-title" value="${currentPost.title}">
            <textarea id="edit-content" rows="10">${currentPost.content}</textarea>
            <input type="url" id="edit-image" value="${currentPost.imageUrl || ''}">
            <button id="save-button">Save Changes</button>
        `;

        document.getElementById('save-button').addEventListener('click', saveChanges);
    }

    function saveChanges() {
        const newTitle = document.getElementById('edit-title').value.trim();
        const newContent = document.getElementById('edit-content').value.trim();
        const newImageUrl = document.getElementById('edit-image').value.trim();

        if (newTitle && newContent) {
            currentPost.title = newTitle;
            currentPost.content = newContent;
            currentPost.imageUrl = newImageUrl;

            const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            const updatedPosts = posts.map(post => post.id === currentPost.id ? currentPost : post);
            localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));

            displayPost();
        } else {
            alert('Title and content cannot be empty.');
        }
    }

    editButton.addEventListener('click', enableEditing);

    loadPost();
});

document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('blog-post');
    const editButton = document.getElementById('edit-button');
    const deleteButton = document.getElementById('delete-button');
    let currentPost = null;

    // ... (keep the existing functions)

    function deletePost() {
        if (confirm('Are you sure you want to delete this post?')) {
            const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            const updatedPosts = posts.filter(post => post.id !== currentPost.id);
            localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
            window.location.href = 'index.html';
        }
    }

    function loadPost() {
        const postId = getPostIdFromUrl();
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        currentPost = posts.find(post => post.id === postId);

        if (currentPost) {
            displayPost();
        } else {
            postContainer.innerHTML = '<p>Post not found.</p>';
            editButton.style.display = 'none';
            deleteButton.style.display = 'none';
        }
    }

    editButton.addEventListener('click', enableEditing);
    deleteButton.addEventListener('click', deletePost);

    loadPost();
});