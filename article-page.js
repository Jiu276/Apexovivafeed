// Article Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Reading Progress Bar
    initReadingProgress();
    
    // Table of Contents Active Link
    initTableOfContents();
    
    // Back to Top Button
    initBackToTop();
    
    // Share Buttons
    initShareButtons();
    
    // Comment Form
    initCommentForm();
    
    // Like Button
    initLikeButton();
    
    // Theme Toggle
    initThemeToggle();
});

// Reading Progress Bar
function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    });
}

// Table of Contents Active Link
function initTableOfContents() {
    const sections = document.querySelectorAll('.article-section');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    if (sections.length === 0 || tocLinks.length === 0) return;
    
    // Click handler for smooth scrolling
    tocLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (sections[index]) {
                sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Scroll spy to highlight active section
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = index;
            }
        });
        
        tocLinks.forEach((link, index) => {
            link.classList.remove('active');
            if (index === current) {
                link.classList.add('active');
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Share Buttons
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const pageUrl = window.location.href;
    const pageTitle = document.querySelector('.article-title')?.textContent || 'Check out this article';
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            let shareUrl = '';
            
            if (btn.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
            } else if (btn.classList.contains('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`;
            } else if (btn.classList.contains('linkedin')) {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
            } else if (btn.classList.contains('whatsapp')) {
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(pageTitle + ' ' + pageUrl)}`;
            } else if (btn.classList.contains('email')) {
                shareUrl = `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent('Check out this article: ' + pageUrl)}`;
            } else if (btn.classList.contains('link')) {
                copyToClipboard(pageUrl);
                showNotification('Link copied to clipboard!');
                return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Copy to Clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #00ffff, #ff00ff);
        color: #000;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        z-index: 1000;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Comment Form
function initCommentForm() {
    const commentForm = document.querySelector('.comment-form form');
    
    if (!commentForm) return;
    
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(commentForm);
        const name = formData.get('name') || 'Anonymous';
        const comment = formData.get('comment');
        
        if (!comment) return;
        
        // Create new comment element
        const newComment = createCommentElement(name, comment);
        
        // Add to comments list
        const commentsList = document.querySelector('.comments-list');
        if (commentsList) {
            commentsList.insertBefore(newComment, commentsList.firstChild);
        }
        
        // Reset form
        commentForm.reset();
        
        // Show notification
        showNotification('Comment posted successfully!');
    });
}

// Create Comment Element
function createCommentElement(name, text) {
    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.style.animation = 'fadeIn 0.5s ease';
    
    // Generate random avatar
    const avatarNum = Math.floor(Math.random() * 20) + 1;
    
    comment.innerHTML = `
        <img src="https://i.pravatar.cc/50?img=${avatarNum}" alt="${name}" class="comment-avatar">
        <div class="comment-content">
            <div class="comment-header">
                <strong>${name}</strong>
                <span>Just now</span>
            </div>
            <p>${text}</p>
            <div class="comment-actions">
                <button><i class="far fa-thumbs-up"></i> 0</button>
                <button>Reply</button>
            </div>
        </div>
    `;
    
    return comment;
}

// Like Button
function initLikeButton() {
    const likeBtn = document.querySelector('.article-stats span:nth-child(2)');
    let liked = false;
    
    if (!likeBtn) return;
    
    likeBtn.addEventListener('click', () => {
        liked = !liked;
        const icon = likeBtn.querySelector('i');
        const count = parseInt(likeBtn.textContent.match(/\d+\.?\d*K?/)[0].replace('K', '000'));
        
        if (liked) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            likeBtn.style.color = '#ff00ff';
            likeBtn.innerHTML = `<i class="fas fa-heart"></i> ${formatNumber(count + 1)}`;
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            likeBtn.style.color = '';
            likeBtn.innerHTML = `<i class="far fa-heart"></i> ${formatNumber(count)}`;
        }
    });
}

// Format Number (1000 -> 1K)
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Theme Toggle
function initThemeToggle() {
    const themeBtn = document.querySelector('.theme-btn');
    let darkMode = localStorage.getItem('darkMode') !== 'false';
    
    if (!themeBtn) return;
    
    // Apply saved theme
    if (!darkMode) {
        document.body.classList.add('light-mode');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeBtn.addEventListener('click', () => {
        darkMode = !darkMode;
        
        if (darkMode) {
            document.body.classList.remove('light-mode');
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.classList.add('light-mode');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        localStorage.setItem('darkMode', darkMode);
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-widget form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Successfully subscribed to newsletter!');
        newsletterForm.reset();
    });
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
        from { transform: translate(-50%, 100px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    
    @keyframes slideDown {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, 100px); opacity: 0; }
    }
    
    .light-mode {
        --dark-bg: #ffffff;
        --darker-bg: #f5f5f5;
        --card-bg: #ffffff;
        --text-primary: #1a1a1a;
        --text-secondary: #4a4a4a;
        --text-muted: #808080;
        --border-color: rgba(0, 0, 0, 0.1);
    }
    
    .light-mode .article-content,
    .light-mode .toc-widget,
    .light-mode .related-widget,
    .light-mode .newsletter-widget {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});