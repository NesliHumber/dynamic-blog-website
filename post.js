document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('blog-post'); // The blog post will be displayed in that container element.
    const editButton = document.getElementById('edit-button'); // Edit button web element
    const deleteButton = document.getElementById('delete-button'); // Delete button web element
    let currentPost = null; // The element that stores the currently displayed post.

    // Below function retrieves the post ID from the URL:
    function getPostIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    // Below function gets post ID from URL via getPostIdFromUrl(), 
    // gets all posts from local storage, 
    // and displays the post with the matching ID to the ID from the URL:
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

    // Below function displays the post to the postContainer element:
    function displayPost() {
        postContainer.innerHTML = `
            <h2>${currentPost.title}</h2>
            <p class="post-date">Posted on ${new Date(currentPost.date).toLocaleDateString()}</p>
            ${currentPost.imageUrl ? `<img src="${currentPost.imageUrl}" alt="${currentPost.title}">` : ''}
            <div class="post-content">${currentPost.content}</div>
        `;
    }

    // Below function enables editing the post by replacing the current postContainer with edited fields:
    function enableEditing() {
        postContainer.innerHTML = `
            <input type="text" id="edit-title" value="${currentPost.title}">
            <textarea id="edit-content" rows="10">${currentPost.content}</textarea>
            <input type="url" id="edit-image" value="${currentPost.imageUrl || ''}">
            <button id="save-button">Save Changes</button>
        `;

        document.getElementById('save-button').addEventListener('click', saveChanges);
    }

    // Below function gets edited post data, saves it to the local storage, and displays the updated post via displayPost():
    function saveChanges() {
        const newTitle = document.getElementById('edit-title').value.trim();
        const newContent = document.getElementById('edit-content').value.trim();
        const newImageUrl = document.getElementById('edit-image').value.trim();

        if (newTitle && newContent) {
            currentPost.title = newTitle;
            currentPost.content = newContent;
            currentPost.imageUrl = newImageUrl;

            updateLocalStorage();
            displayPost();
        } else {
            alert('Title and content cannot be empty.');
        }
    }

    // Below function deletes the post from local storage and redirects to the index page:
    function deletePost() {
        if (confirm('Are you sure you want to delete this post?')) {
            const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            const updatedPosts = posts.filter(post => post.id !== currentPost.id);
            localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
            window.location.href = 'index.html';
        }
    }

    function updateLocalStorage() {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const updatedPosts = posts.map(post => post.id === currentPost.id ? currentPost : post);
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    }

    editButton.addEventListener('click', enableEditing);
    deleteButton.addEventListener('click', deletePost);

    loadPost();
});

