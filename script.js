// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const blogCards = document.querySelectorAll('.blog-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    blogCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const content = card.querySelector('.card-excerpt').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
});

// Enhanced Filter Functionality with Tags
const filterButtons = document.querySelectorAll('.filter-btn, .tag-btn');
const articleCards = document.querySelectorAll('.article-card');
let activeFilters = {
    category: 'all',
    tags: [],
    searchTerm: ''
};

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        const tag = btn.dataset.tag;
        
        if (category) {
            // Category filter
            document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilters.category = category;
        } else if (tag) {
            // Tag filter
            btn.classList.toggle('active');
            if (btn.classList.contains('active')) {
                activeFilters.tags.push(tag);
            } else {
                activeFilters.tags = activeFilters.tags.filter(t => t !== tag);
            }
        }
        
        applyFilters();
    });
});

// Apply all active filters
function applyFilters() {
    articleCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardTags = card.dataset.tags ? card.dataset.tags.split(',') : [];
        const title = card.querySelector('.article-title')?.textContent.toLowerCase() || '';
        const excerpt = card.querySelector('.article-excerpt')?.textContent.toLowerCase() || '';
        
        let showCard = true;
        
        // Category filter
        if (activeFilters.category !== 'all' && cardCategory !== activeFilters.category) {
            showCard = false;
        }
        
        // Tag filter
        if (activeFilters.tags.length > 0) {
            const hasTag = activeFilters.tags.some(tag => cardTags.includes(tag));
            if (!hasTag) showCard = false;
        }
        
        // Search filter
        if (activeFilters.searchTerm && !title.includes(activeFilters.searchTerm) && !excerpt.includes(activeFilters.searchTerm)) {
            showCard = false;
        }
        
        // Show/hide card with animation
        if (showCard) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    updateArticleCount();
}

// Update article count display
function updateArticleCount() {
    const visibleCards = document.querySelectorAll('.article-card[style*="display: block"]').length;
    const countElement = document.getElementById('articleCount');
    if (countElement) {
        countElement.textContent = `Showing ${visibleCards} articles`;
    }
}

// Extended Article Content Data with more articles
const articles = {
    'sustainable-living': {
        title: 'The Complete Guide to Sustainable Living: Transform Your Lifestyle in 2025',
        date: 'January 15, 2025',
        author: 'Emma Thompson',
        category: 'Lifestyle',
        tags: ['sustainability', 'eco-friendly', 'green living', 'environment'],
        readTime: '8 min',
        views: 15200,
        likes: 1200,
        image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=1200',
        excerpt: 'Discover practical tips and innovative solutions for eco-friendly living. From zero-waste strategies to sustainable fashion choices.',
        content: `
            <p>Sustainable living has evolved from a niche lifestyle choice to a global necessity. As we face unprecedented environmental challenges, adopting eco-friendly practices has become crucial for our planet's future.</p>
            
            <h3>Understanding Your Environmental Impact</h3>
            <p>The first step toward sustainable living is understanding your carbon footprint. Every action, from your morning coffee to your daily commute, contributes to your environmental impact. Modern tools and apps can help track and reduce your carbon emissions effectively.</p>
            
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800" alt="Sustainable Living">
            
            <h3>Zero-Waste Strategies</h3>
            <p>Implementing zero-waste practices doesn't happen overnight, but small changes can make a significant difference:</p>
            <ul>
                <li>Replace single-use plastics with reusable alternatives</li>
                <li>Compost organic waste to reduce landfill contribution</li>
                <li>Buy in bulk to minimize packaging waste</li>
                <li>Choose products with minimal or biodegradable packaging</li>
                <li>Repair and repurpose items instead of discarding them</li>
            </ul>
            
            <h3>Sustainable Fashion Choices</h3>
            <p>The fashion industry is one of the world's largest polluters. Making conscious clothing choices can significantly reduce your environmental impact. Consider buying second-hand, supporting ethical brands, and building a capsule wardrobe with quality, versatile pieces.</p>
            
            <h3>Energy-Efficient Home</h3>
            <p>Transform your living space into an eco-friendly haven with smart home technologies, LED lighting, and renewable energy sources. Small investments in energy efficiency can lead to substantial long-term savings and environmental benefits.</p>
            
            <blockquote>"Sustainability is not about perfection; it's about making better choices consistently." - Emma Thompson</blockquote>
        `,
        relatedArticles: ['sustainable-fashion', 'plant-based', 'morning-routine']
    },
    'morning-routine': {
        title: 'Mindful Morning Routines: Start Your Day with Purpose',
        date: 'January 15, 2025',
        author: 'Jessica Williams',
        category: 'Lifestyle',
        tags: ['wellness', 'productivity', 'mindfulness', 'self-care'],
        readTime: '6 min',
        views: 15200,
        likes: 1200,
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
        excerpt: 'Transform your mornings with these evidence-based practices that boost productivity and reduce stress.',
        content: `
            <p>How you start your morning sets the tone for your entire day. A mindful morning routine can transform your productivity, mental clarity, and overall well-being.</p>
            
            <h3>The Science of Morning Routines</h3>
            <p>Research shows that consistent morning routines reduce decision fatigue and increase productivity throughout the day. By automating your morning activities, you preserve mental energy for more important decisions.</p>
            
            <img src="https://images.unsplash.com/photo-1518655048521-f130df041f66?w=800" alt="Morning Routine">
            
            <h3>Essential Components</h3>
            <ul>
                <li><strong>Hydration:</strong> Start with 16oz of water to kickstart your metabolism</li>
                <li><strong>Movement:</strong> 10-15 minutes of stretching or light exercise</li>
                <li><strong>Mindfulness:</strong> 5-10 minutes of meditation or journaling</li>
                <li><strong>Nutrition:</strong> A balanced breakfast with protein and complex carbs</li>
                <li><strong>Planning:</strong> Review your priorities for the day</li>
            </ul>
            
            <h3>Creating Your Routine</h3>
            <p>Start small and build gradually. Choose 2-3 practices that resonate with you and commit to them for 21 days. Once these become habits, add more elements to your routine.</p>
            
            <blockquote>"Win the morning, win the day." - Tim Ferriss</blockquote>
        `,
        relatedArticles: ['sustainable-living', 'fitness-guide', 'plant-based']
    },
    'bali-guide': {
        title: 'Bali Travel Guide: Beyond the Tourist Trail',
        date: 'January 18, 2025',
        author: 'Michael Chen',
        category: 'Travel',
        tags: ['travel', 'indonesia', 'adventure', 'culture'],
        readTime: '10 min',
        views: 12800,
        likes: 980,
        image: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600',
        excerpt: 'Discover authentic experiences and hidden treasures in Indonesia\'s paradise island.',
        content: `
            <p>Bali offers far more than beautiful beaches and Instagram-worthy rice terraces. This guide will take you beyond the tourist hotspots to discover the authentic heart of the Island of the Gods.</p>
            
            <h3>Hidden Gems</h3>
            <p>While Ubud and Seminyak attract crowds, villages like Sidemen and Munduk offer authentic Balinese experiences without the tourist masses. These areas provide stunning landscapes, traditional culture, and genuine hospitality.</p>
            
            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800" alt="Bali Rice Terraces">
            
            <h3>Cultural Experiences</h3>
            <ul>
                <li>Participate in traditional cooking classes with local families</li>
                <li>Attend temple ceremonies (with proper attire and respect)</li>
                <li>Learn traditional crafts like batik or silver making</li>
                <li>Join sunrise treks to active volcanoes</li>
            </ul>
            
            <h3>Sustainable Tourism</h3>
            <p>Support local communities by choosing locally-owned accommodations, eating at warungs (family restaurants), and purchasing directly from artisans. Respect local customs and environmental conservation efforts.</p>
        `,
        relatedArticles: ['sustainable-living']
    },
    'fitness-guide': {
        title: 'HIIT vs Yoga: Finding Your Perfect Workout',
        date: 'January 22, 2025',
        author: 'Alex Rivera',
        category: 'Health & Fitness',
        tags: ['fitness', 'workout', 'health', 'exercise'],
        readTime: '7 min',
        views: 10500,
        likes: 820,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
        excerpt: 'Compare two popular fitness approaches and find what works best for your goals.',
        content: `
            <p>Choosing between HIIT and yoga isn't about which is better—it's about understanding your fitness goals and finding the right balance for your lifestyle.</p>
            
            <h3>HIIT: Maximum Results, Minimum Time</h3>
            <p>High-Intensity Interval Training offers incredible cardiovascular benefits and calorie burn in sessions as short as 20 minutes. Perfect for busy professionals seeking efficient workouts.</p>
            
            <h3>Yoga: Mind-Body Connection</h3>
            <p>Yoga provides flexibility, strength, and mental clarity through mindful movement. It's ideal for stress reduction and improving overall body awareness.</p>
            
            <h3>The Best of Both Worlds</h3>
            <p>Many fitness experts recommend combining both practices: HIIT for cardiovascular health and calorie burn, yoga for flexibility and recovery. This balanced approach prevents burnout and promotes sustainable fitness.</p>
        `,
        relatedArticles: ['morning-routine', 'plant-based']
    },
    'sustainable-fashion': {
        title: 'Sustainable Fashion: Style Meets Ethics',
        date: 'January 25, 2025',
        author: 'Sofia Martinez',
        category: 'Fashion',
        tags: ['fashion', 'sustainability', 'style', 'eco-friendly'],
        readTime: '8 min',
        views: 9800,
        likes: 750,
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
        excerpt: 'How to build a conscious wardrobe without sacrificing your personal style.',
        content: `
            <p>Sustainable fashion is revolutionizing how we think about style. It's about making conscious choices that look good and do good for our planet.</p>
            
            <h3>Building a Capsule Wardrobe</h3>
            <p>A capsule wardrobe consists of 30-40 versatile pieces that can be mixed and matched to create countless outfits. This approach reduces waste and simplifies your daily routine.</p>
            
            <h3>Ethical Brands to Know</h3>
            <p>Support brands that prioritize fair labor practices, sustainable materials, and transparent supply chains. Look for certifications like GOTS, Fair Trade, and B Corp.</p>
            
            <h3>Care and Maintenance</h3>
            <p>Extend the life of your clothes through proper care. Wash less frequently, use cold water, air dry when possible, and learn basic repair skills.</p>
        `,
        relatedArticles: ['sustainable-living']
    },
    'plant-based': {
        title: 'Plant-Based Meals: 30-Day Challenge Guide',
        date: 'January 28, 2025',
        author: 'David Kim',
        category: 'Food & Recipes',
        tags: ['nutrition', 'vegan', 'recipes', 'health'],
        readTime: '9 min',
        views: 11200,
        likes: 890,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
        excerpt: 'Delicious recipes and tips for embracing a plant-forward lifestyle.',
        content: `
            <p>Embarking on a plant-based journey doesn't mean sacrificing flavor or satisfaction. This 30-day challenge will transform how you think about food.</p>
            
            <h3>Week 1: Foundation</h3>
            <p>Start by replacing one meal per day with plant-based options. Focus on whole foods like legumes, grains, vegetables, and fruits.</p>
            
            <h3>Week 2-3: Exploration</h3>
            <p>Experiment with new ingredients and cooking techniques. Try nutritional yeast, tempeh, jackfruit, and various plant-based milk alternatives.</p>
            
            <h3>Week 4: Mastery</h3>
            <p>By now, you've discovered favorite recipes and ingredients. Focus on meal prep and creating balanced, nutrient-dense meals.</p>
            
            <h3>Essential Nutrients</h3>
            <ul>
                <li>Protein: Legumes, quinoa, tofu, tempeh</li>
                <li>B12: Fortified foods or supplements</li>
                <li>Iron: Leafy greens, beans, fortified cereals</li>
                <li>Omega-3: Walnuts, flax seeds, chia seeds</li>
            </ul>
        `,
        relatedArticles: ['fitness-guide', 'sustainable-living', 'morning-routine']
    },
    'remote-work': {
        title: 'Remote Work Revolution: Building Successful Virtual Teams',
        date: 'February 2, 2025',
        author: 'Rachel Anderson',
        category: 'Business',
        tags: ['remote work', 'productivity', 'technology', 'management'],
        readTime: '11 min',
        views: 13500,
        likes: 1050,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
        excerpt: 'Essential strategies and tools for managing distributed teams effectively in the modern workplace.',
        content: `
            <p>The remote work revolution has fundamentally changed how we collaborate and manage teams. Success in this new paradigm requires intentional strategies and the right tools.</p>
            
            <h3>Communication is Key</h3>
            <p>Establish clear communication protocols. Use async communication for non-urgent matters and reserve synchronous meetings for collaboration and team building.</p>
            
            <h3>Essential Tools</h3>
            <ul>
                <li>Project Management: Asana, Monday.com, Trello</li>
                <li>Communication: Slack, Microsoft Teams, Discord</li>
                <li>Video Conferencing: Zoom, Google Meet, Whereby</li>
                <li>Documentation: Notion, Confluence, Google Workspace</li>
            </ul>
            
            <h3>Building Culture Remotely</h3>
            <p>Create virtual water cooler moments, celebrate wins publicly, and invest in team building activities. Regular one-on-ones and transparent communication foster trust and connection.</p>
        `,
        relatedArticles: []
    },
    'ai-revolution': {
        title: 'The AI Revolution: How Neural Networks Are Reshaping Our Digital Landscape',
        date: 'January 15, 2025',
        author: 'Dr. Sarah Chen',
        category: 'Tech News',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        content: `
            <p>The artificial intelligence revolution is transforming every aspect of our digital world. From healthcare diagnostics to autonomous vehicles, neural networks are pushing the boundaries of what's possible in technology.</p>
            
            <h3>The Rise of Deep Learning</h3>
            <p>Deep learning has emerged as the cornerstone of modern AI applications. These sophisticated neural networks can process vast amounts of data, identifying patterns and making decisions with unprecedented accuracy. The latest developments in transformer architectures have revolutionized natural language processing, enabling AI systems to understand and generate human-like text with remarkable fluency.</p>
            
            <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800" alt="Neural Network Visualization">
            
            <h3>Real-World Applications</h3>
            <p>Healthcare providers are using AI to detect diseases earlier and with greater accuracy than ever before. In finance, machine learning algorithms are revolutionizing fraud detection and risk assessment. The entertainment industry leverages AI for content recommendation and even creative production.</p>
            
            <h3>The Road Ahead</h3>
            <p>As we look to the future, the integration of AI into our daily lives will only deepen. Quantum computing promises to accelerate AI capabilities exponentially, while edge computing will bring intelligence directly to our devices. The convergence of these technologies will create opportunities we can barely imagine today.</p>
            
            <blockquote>"The question isn't whether AI will transform our world, but how quickly we can adapt to the changes it brings." - Dr. Sarah Chen</blockquote>
        `
    },
    'vr-review': {
        title: 'NeuroLink VR Pro: The Ultimate Virtual Reality Experience',
        date: 'January 18, 2025',
        author: 'Marcus Thompson',
        category: 'Product Review',
        image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=800',
        content: `
            <p>After spending three weeks with the NeuroLink VR Pro, I can confidently say this is the most immersive virtual reality experience available today. The combination of 8K resolution per eye, haptic feedback suit, and neural interface creates an unprecedented level of presence in virtual worlds.</p>
            
            <h3>Specifications</h3>
            <ul>
                <li>Display: Dual 8K OLED panels (7680×4320 per eye)</li>
                <li>Field of View: 210 degrees</li>
                <li>Refresh Rate: 144Hz with variable rate support</li>
                <li>Tracking: Inside-out with neural prediction</li>
                <li>Audio: Spatial 3D with bone conduction</li>
            </ul>
            
            <img src="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800" alt="VR Gaming Experience">
            
            <h3>Performance</h3>
            <p>The NeuroLink VR Pro delivers buttery-smooth performance across all tested applications. The neural prediction system anticipates your movements, reducing motion sickness to virtually zero. Gaming feels incredibly responsive, with the haptic suit providing realistic feedback for every interaction.</p>
            
            <h3>Content Ecosystem</h3>
            <p>With over 5,000 compatible titles and experiences, the content library is extensive. From educational simulations to AAA gaming titles, there's something for everyone. The standout feature is the "Neural Dreams" mode, which generates personalized VR experiences based on your preferences and brain patterns.</p>
            
            <h3>Verdict</h3>
            <p>At $3,999, the NeuroLink VR Pro is a significant investment, but for VR enthusiasts and professionals, it's worth every penny. This is the future of virtual reality, available today.</p>
            
            <div class="rating-box">
                <strong>Final Score: 9.5/10</strong>
            </div>
        `
    },
    'cloudsync': {
        title: 'CloudSync Pro: Revolutionary Cloud Computing Platform',
        date: 'January 22, 2025',
        author: 'Jessica Liu',
        category: 'Platform Review',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
        content: `
            <p>CloudSync Pro has emerged as a game-changer in the cloud computing landscape, offering unprecedented scalability, security, and performance for enterprises of all sizes. After extensive testing and implementation across multiple organizations, here's our comprehensive analysis.</p>
            
            <h3>Key Features</h3>
            <p>CloudSync Pro's architecture leverages quantum-resistant encryption and distributed ledger technology to ensure data integrity and security. The platform's auto-scaling capabilities are powered by predictive AI that anticipates demand spikes before they occur.</p>
            
            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800" alt="Cloud Infrastructure">
            
            <h3>Performance Metrics</h3>
            <ul>
                <li>99.999% uptime guarantee with automatic failover</li>
                <li>Sub-millisecond latency through edge computing nodes</li>
                <li>Infinite scalability with pay-per-use pricing</li>
                <li>Real-time data synchronization across global regions</li>
            </ul>
            
            <h3>Developer Experience</h3>
            <p>The platform offers comprehensive SDKs for all major programming languages, with particularly strong support for containerized applications. The CloudSync CLI tools are intuitive, and the web console provides detailed analytics and monitoring capabilities.</p>
            
            <h3>Cost Analysis</h3>
            <p>While initially more expensive than traditional cloud providers, CloudSync Pro's efficiency and automation features typically result in 30-40% cost savings over time. The transparent pricing model eliminates surprise charges, and the cost optimizer AI helps identify and eliminate waste.</p>
            
            <blockquote>"CloudSync Pro reduced our infrastructure costs by 35% while improving performance by 200%" - TechCorp CTO</blockquote>
        `
    },
    'quantum': {
        title: 'Quantum Computing Breakthrough: The Next Tech Frontier',
        date: 'January 25, 2025',
        author: 'Dr. Robert Kim',
        category: 'Tech News',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
        content: `
            <p>Scientists at the Quantum Research Institute have achieved a major milestone in quantum computing, successfully demonstrating a 1000-qubit processor that maintains coherence for over 100 microseconds. This breakthrough brings us significantly closer to practical quantum computing applications.</p>
            
            <h3>The Technical Achievement</h3>
            <p>The new processor utilizes topological qubits, which are inherently more stable than traditional superconducting qubits. By leveraging advanced error correction algorithms and cryogenic stabilization, the team has overcome one of the biggest challenges in quantum computing: decoherence.</p>
            
            <img src="https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?w=800" alt="Quantum Computer">
            
            <h3>Implications for Industry</h3>
            <ul>
                <li><strong>Drug Discovery:</strong> Simulate molecular interactions at unprecedented scales</li>
                <li><strong>Cryptography:</strong> Both breaking and creating unbreakable encryption</li>
                <li><strong>Financial Modeling:</strong> Process complex risk calculations in real-time</li>
                <li><strong>Climate Science:</strong> Model weather patterns with quantum precision</li>
            </ul>
            
            <h3>The Quantum Advantage</h3>
            <p>This processor demonstrated quantum supremacy by solving a specific optimization problem in 200 seconds that would take classical supercomputers approximately 10,000 years to complete. The implications for artificial intelligence, materials science, and logistics optimization are profound.</p>
            
            <h3>Looking Forward</h3>
            <p>While commercial quantum computers are still years away, this breakthrough accelerates the timeline considerably. Major tech companies are already investing billions in quantum research, and the race to achieve practical quantum computing is intensifying.</p>
        `
    },
    'smarthub': {
        title: 'SmartHub X1: The All-in-One Smart Home Controller',
        date: 'January 28, 2025',
        author: 'Alex Rivera',
        category: 'Product Review',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
        content: `
            <p>The SmartHub X1 represents a paradigm shift in smart home technology, unifying disparate IoT devices under a single, intelligent control system. After installing it in my home and testing it extensively, I'm impressed by its capabilities and ease of use.</p>
            
            <h3>Setup and Installation</h3>
            <p>The setup process is remarkably simple. The SmartHub X1 automatically detected and configured 47 smart devices in my home within 15 minutes. The AI-powered setup wizard handles everything from Wi-Fi configuration to device naming and room assignment.</p>
            
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" alt="Smart Home Dashboard">
            
            <h3>Features and Capabilities</h3>
            <ul>
                <li>Universal compatibility with over 10,000 smart devices</li>
                <li>Voice control through natural language processing</li>
                <li>Predictive automation based on behavioral patterns</li>
                <li>Energy optimization reducing power consumption by up to 40%</li>
                <li>Advanced security with facial recognition and anomaly detection</li>
            </ul>
            
            <h3>Daily Experience</h3>
            <p>Living with the SmartHub X1 feels like having a personal assistant who knows your preferences. It adjusts lighting based on time of day and activity, optimizes climate control for comfort and efficiency, and even suggests automation routines based on your habits.</p>
            
            <h3>The Verdict</h3>
            <p>At $799, the SmartHub X1 is competitively priced for the value it delivers. If you're serious about home automation and want a system that grows smarter over time, this is the controller to get.</p>
            
            <div class="rating-box">
                <strong>Final Score: 9/10</strong>
            </div>
        `
    },
    'gaming': {
        title: 'Ultimate Gaming Setup 2025: Complete Build Guide',
        date: 'February 2, 2025',
        author: 'Tyler Chen',
        category: 'Reviews',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
        content: `
            <p>Building the perfect gaming setup in 2025 requires careful consideration of cutting-edge hardware, ergonomics, and aesthetics. This comprehensive guide will walk you through creating a battlestation that delivers peak performance and style.</p>
            
            <h3>Core Components</h3>
            <ul>
                <li><strong>CPU:</strong> Intel Core i9-15900K (24 cores, 5.8GHz boost)</li>
                <li><strong>GPU:</strong> NVIDIA RTX 5090 Ti (24GB GDDR7)</li>
                <li><strong>RAM:</strong> 64GB DDR6-8000 RGB</li>
                <li><strong>Storage:</strong> 2TB PCIe 5.0 NVMe (15GB/s read)</li>
                <li><strong>Motherboard:</strong> ASUS ROG Maximus Z890 Extreme</li>
            </ul>
            
            <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800" alt="Gaming PC Build">
            
            <h3>Display Setup</h3>
            <p>The centerpiece is the Samsung Odyssey Neo G9 57" with 7680x2160 resolution at 240Hz. Flanked by two vertical 4K monitors for streaming and productivity, this setup provides incredible immersion and multitasking capability.</p>
            
            <h3>Peripherals</h3>
            <ul>
                <li><strong>Keyboard:</strong> Wooting 60HE with adjustable actuation</li>
                <li><strong>Mouse:</strong> Logitech G Pro X Superlight 2 (4000Hz polling)</li>
                <li><strong>Headset:</strong> SteelSeries Arctis Nova Pro Wireless</li>
                <li><strong>Chair:</strong> Herman Miller x Logitech Embody</li>
            </ul>
            
            <h3>Performance Results</h3>
            <p>This setup delivers consistent 4K gaming at 144+ FPS in the latest titles with ray tracing enabled. The system maintains temperatures below 65°C under load thanks to custom liquid cooling. Total system power draw peaks at 850W during intensive gaming sessions.</p>
            
            <h3>Total Investment</h3>
            <p>The complete setup totals approximately $12,000, but can be scaled down based on budget. The key is investing in components that won't need upgrading for at least 3-4 years.</p>
        `
    }
};

// Product Content Data
const products = {
    'neural-x7': {
        name: 'Neural Processor X7',
        price: '$2,499',
        rating: 4.8,
        reviews: 245,
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800',
        description: 'Next-generation AI processor with quantum-enhanced computing capabilities for unprecedented performance.',
        specifications: {
            'Architecture': '5nm Quantum-Enhanced Silicon',
            'Cores': '128 Neural Processing Units',
            'Memory': '256GB HBM3 Integrated',
            'Performance': '500 TFLOPS AI Compute',
            'Power': '300W TDP',
            'Connectivity': 'PCIe 6.0 x16'
        },
        features: [
            'Real-time AI inference with sub-millisecond latency',
            'Quantum entanglement for parallel processing',
            'Self-optimizing architecture that learns from workloads',
            'Compatible with all major AI frameworks',
            'Advanced thermal management with liquid metal cooling'
        ],
        reviews: [
            {
                author: 'Tech Innovator',
                rating: 5,
                comment: 'Revolutionary performance for deep learning applications. Cut our training time by 80%.'
            },
            {
                author: 'AI Researcher',
                rating: 4.5,
                comment: 'Impressive capabilities, though the price point is steep for smaller labs.'
            },
            {
                author: 'Enterprise User',
                rating: 5,
                comment: 'Worth every penny for production AI workloads. ROI achieved in 3 months.'
            }
        ]
    },
    'holoview': {
        name: 'HoloView Pro Display',
        price: '$3,999',
        rating: 5.0,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800',
        description: 'Revolutionary holographic display technology bringing 3D visualization to your workspace.',
        specifications: {
            'Display Type': 'Volumetric Holographic',
            'Resolution': '8K per viewing angle',
            'Viewing Angles': '360 degrees',
            'Color Gamut': '150% Adobe RGB',
            'Refresh Rate': '120Hz',
            'Size': '32-inch display volume'
        },
        features: [
            'True 3D visualization without glasses',
            'Multi-user viewing with perfect clarity from any angle',
            'Touch and gesture control in 3D space',
            'AI-powered content upscaling from 2D to 3D',
            'Compatible with all major 3D software suites'
        ],
        reviews: [
            {
                author: '3D Designer',
                rating: 5,
                comment: 'Game-changing for architectural visualization. Clients are blown away.'
            },
            {
                author: 'Medical Professional',
                rating: 5,
                comment: 'Perfect for viewing medical imaging. The depth perception is incredible.'
            },
            {
                author: 'Content Creator',
                rating: 5,
                comment: 'The future of display technology is here. Worth the investment.'
            }
        ]
    },
    'cyberlink': {
        name: 'CyberLink AR Glasses',
        price: '$1,799',
        rating: 4.2,
        reviews: 312,
        image: 'https://images.unsplash.com/photo-1633113088983-12fb3b2fe88a?w=800',
        description: 'Augmented reality glasses with neural interface for seamless digital-physical integration.',
        specifications: {
            'Display': 'Micro-OLED 4K per eye',
            'Field of View': '70 degrees',
            'Tracking': '6DOF with eye tracking',
            'Battery Life': '8 hours continuous use',
            'Weight': '85 grams',
            'Connectivity': '5G, WiFi 7, Bluetooth 5.3'
        },
        features: [
            'Neural interface for thought-based control',
            'Real-time language translation overlay',
            'Advanced navigation with 3D waypoints',
            'Prescription lens compatible',
            'Waterproof and dustproof design'
        ],
        reviews: [
            {
                author: 'Early Adopter',
                rating: 4,
                comment: 'Amazing tech, but the neural interface takes time to master.'
            },
            {
                author: 'Business User',
                rating: 4.5,
                comment: 'Transformed our remote collaboration. Like having holographic meetings.'
            },
            {
                author: 'Gamer',
                rating: 4,
                comment: 'AR gaming is incredible, though battery life could be better for extended sessions.'
            }
        ]
    }
};

// Enhanced Article Modal with Comments and Related Articles
function openArticle(articleId) {
    console.log('Opening article:', articleId);
    
    const article = articles[articleId];
    if (!article) {
        console.error(`Article with id '${articleId}' not found`);
        alert(`Article '${articleId}' not found. Available articles: ${Object.keys(articles).join(', ')}`);
        return;
    }
    
    const modal = document.getElementById('articleModal');
    const content = document.getElementById('articleContent');
    
    if (!modal || !content) {
        console.error('Modal elements not found');
        alert('Error: Modal elements not found. Please refresh the page.');
        return;
    }
    
    // Generate related articles HTML
    const relatedArticlesHtml = article.relatedArticles ? article.relatedArticles.map(id => {
        const related = articles[id];
        if (!related) return '';
        return `
            <div class="related-article-card" onclick="openArticle('${id}')">
                <img src="${related.image}" alt="${related.title}">
                <div class="related-article-content">
                    <h4>${related.title}</h4>
                    <span>${related.readTime || '5 min'} read</span>
                </div>
            </div>
        `;
    }).join('') : '';
    
    // Generate tags HTML
    const tagsHtml = article.tags ? article.tags.map(tag => 
        `<span class="article-tag">${tag}</span>`
    ).join('') : '';
    
    content.innerHTML = `
        <article class="article-full">
            <img src="${article.image}" alt="${article.title}" class="article-hero">
            <div class="article-meta">
                <span class="article-date"><i class="far fa-calendar"></i> ${article.date}</span>
                <span class="article-author"><i class="far fa-user"></i> By ${article.author}</span>
                <span class="article-category"><i class="far fa-folder"></i> ${article.category}</span>
                <span class="article-readtime"><i class="far fa-clock"></i> ${article.readTime || '5 min'} read</span>
            </div>
            <h1 class="article-title">${article.title}</h1>
            ${tagsHtml ? `<div class="article-tags">${tagsHtml}</div>` : ''}
            <div class="article-stats">
                <span><i class="far fa-eye"></i> ${article.views || Math.floor(Math.random() * 20000)} views</span>
                <span><i class="far fa-heart"></i> ${article.likes || Math.floor(Math.random() * 2000)} likes</span>
                <span><i class="far fa-comment"></i> ${Math.floor(Math.random() * 100)} comments</span>
            </div>
            <div class="article-body">
                ${article.content}
            </div>
            
            <!-- Share Section -->
            <div class="article-share">
                <h3>Share this article</h3>
                <div class="share-buttons">
                    <button class="share-btn facebook"><i class="fab fa-facebook-f"></i> Facebook</button>
                    <button class="share-btn twitter"><i class="fab fa-twitter"></i> Twitter</button>
                    <button class="share-btn linkedin"><i class="fab fa-linkedin-in"></i> LinkedIn</button>
                    <button class="share-btn copy" onclick="copyArticleLink('${articleId}')"><i class="far fa-copy"></i> Copy Link</button>
                </div>
            </div>
            
            <!-- Related Articles -->
            ${relatedArticlesHtml ? `
                <div class="related-articles">
                    <h3>Related Articles</h3>
                    <div class="related-articles-grid">
                        ${relatedArticlesHtml}
                    </div>
                </div>
            ` : ''}
            
            <!-- Comments Section -->
            <div class="comments-section">
                <h3>Comments (${Math.floor(Math.random() * 100)})</h3>
                
                <!-- Comment Form -->
                <div class="comment-form">
                    <textarea placeholder="Share your thoughts..." rows="4"></textarea>
                    <div class="comment-form-actions">
                        <input type="text" placeholder="Your name" class="comment-name">
                        <button class="btn btn-primary">Post Comment</button>
                    </div>
                </div>
                
                <!-- Comments List -->
                <div class="comments-list">
                    <div class="comment">
                        <img src="https://i.pravatar.cc/50?img=3" alt="User" class="comment-avatar">
                        <div class="comment-content">
                            <div class="comment-header">
                                <strong>John Doe</strong>
                                <span>2 hours ago</span>
                            </div>
                            <p>Great article! Really helped me understand the topic better.</p>
                            <div class="comment-actions">
                                <button class="comment-action"><i class="far fa-thumbs-up"></i> 12</button>
                                <button class="comment-action">Reply</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="comment">
                        <img src="https://i.pravatar.cc/50?img=5" alt="User" class="comment-avatar">
                        <div class="comment-content">
                            <div class="comment-header">
                                <strong>Sarah Smith</strong>
                                <span>5 hours ago</span>
                            </div>
                            <p>I've been looking for this information everywhere. Thanks for sharing!</p>
                            <div class="comment-actions">
                                <button class="comment-action"><i class="far fa-thumbs-up"></i> 8</button>
                                <button class="comment-action">Reply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Track article view
    trackArticleView(articleId);
}

// Copy article link to clipboard
function copyArticleLink(articleId) {
    const link = `${window.location.origin}#article/${articleId}`;
    navigator.clipboard.writeText(link).then(() => {
        const btn = document.querySelector('.share-btn.copy');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    });
}

// Track article views
function trackArticleView(articleId) {
    // In a real app, this would send data to analytics
    console.log(`Article viewed: ${articleId}`);
}

// Simple fallback version of openArticle for debugging
function simpleOpenArticle(articleId) {
    console.log('Simple open article called:', articleId);
    const modal = document.getElementById('articleModal');
    const content = document.getElementById('articleContent');
    
    if (!modal || !content) {
        alert('Modal not found. Creating simple popup...');
        const article = articles[articleId];
        if (article) {
            const popup = window.open('', '_blank', 'width=800,height=600');
            popup.document.write(`
                <html>
                <head><title>${article.title}</title></head>
                <body style="padding: 20px; font-family: Arial;">
                    <h1>${article.title}</h1>
                    <p>By ${article.author} | ${article.date}</p>
                    <div>${article.content}</div>
                </body>
                </html>
            `);
        }
        return;
    }
    
    const article = articles[articleId];
    if (!article) {
        content.innerHTML = `<h2>Article not found: ${articleId}</h2>`;
    } else {
        content.innerHTML = `
            <article class="article-full">
                <h1>${article.title}</h1>
                <p>By ${article.author} | ${article.date}</p>
                <div>${article.content}</div>
            </article>
        `;
    }
    
    modal.style.display = 'block';
    modal.classList.add('active');
}

// Make functions available globally
window.openArticle = openArticle;
window.simpleOpenArticle = simpleOpenArticle;
window.copyArticleLink = copyArticleLink;
window.viewProduct = viewProduct;

// Override with simple version if there are issues
if (!window.articleModalWorking) {
    console.log('Using article modal with debugging');
    const originalOpen = window.openArticle;
    window.openArticle = function(articleId) {
        try {
            console.log('Attempting to open article:', articleId);
            originalOpen(articleId);
        } catch (error) {
            console.error('Error opening article:', error);
            simpleOpenArticle(articleId);
        }
    };
}

// View Product Modal
function viewProduct(productId) {
    const product = products[productId];
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const content = document.getElementById('productContent');
    
    const specsHtml = Object.entries(product.specifications).map(([key, value]) => `
        <tr>
            <td><strong>${key}</strong></td>
            <td>${value}</td>
        </tr>
    `).join('');
    
    const featuresHtml = product.features.map(feature => `<li>${feature}</li>`).join('');
    
    const reviewsHtml = product.reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <strong>${review.author}</strong>
                <div class="review-rating">
                    ${'★'.repeat(Math.floor(review.rating))}${'☆'.repeat(5 - Math.floor(review.rating))}
                </div>
            </div>
            <p>${review.comment}</p>
        </div>
    `).join('');
    
    content.innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            <h2>${product.name}</h2>
            <div class="product-detail-meta">
                <span class="product-detail-price">${product.price}</span>
                <span class="product-detail-rating">★ ${product.rating} (${product.reviews} reviews)</span>
            </div>
            <p class="product-detail-description">${product.description}</p>
            
            <h3>Specifications</h3>
            <table class="specs-table">
                ${specsHtml}
            </table>
            
            <h3>Key Features</h3>
            <ul class="features-list">
                ${featuresHtml}
            </ul>
            
            <h3>Customer Reviews</h3>
            <div class="reviews-section">
                ${reviewsHtml}
            </div>
            
            <button class="btn btn-primary" style="width: 100%; margin-top: 2rem;">Add to Cart</button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Close Modals
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        setTimeout(() => {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
});

// Pagination
function changePage(page) {
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(btn => btn.classList.remove('active'));
    
    if (typeof page === 'number') {
        pageButtons[page - 1].classList.add('active');
    }
    
    // Animate blog cards
    blogCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show success message
    const form = e.target;
    const originalButton = form.querySelector('button[type="submit"]');
    const originalText = originalButton.textContent;
    
    originalButton.textContent = 'Sending...';
    originalButton.disabled = true;
    
    setTimeout(() => {
        originalButton.textContent = 'Message Sent!';
        originalButton.style.background = 'var(--gradient-2)';
        
        setTimeout(() => {
            form.reset();
            originalButton.textContent = originalText;
            originalButton.disabled = false;
            originalButton.style.background = '';
        }, 2000);
    }, 1000);
});

// Newsletter Form
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const button = e.target.querySelector('button');
    
    const originalText = button.textContent;
    button.textContent = 'Subscribed!';
    input.value = '';
    
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    const speed = 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Initialize animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.blog-card, .product-card, .stat-card, .info-card').forEach(el => {
    observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .article-full {
        max-width: 100%;
    }
    
    .article-hero {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 2rem;
    }
    
    .article-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        color: var(--gray-text);
        font-size: 0.9rem;
    }
    
    .article-title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
        background: var(--gradient-2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    .article-body {
        line-height: 1.8;
        color: var(--gray-text);
    }
    
    .article-body h3 {
        color: var(--primary-color);
        margin: 2rem 0 1rem;
        font-size: 1.5rem;
    }
    
    .article-body p {
        margin-bottom: 1.5rem;
    }
    
    .article-body img {
        width: 100%;
        margin: 2rem 0;
        border-radius: 10px;
    }
    
    .article-body ul {
        margin: 1.5rem 0;
        padding-left: 2rem;
    }
    
    .article-body li {
        margin-bottom: 0.5rem;
    }
    
    .article-body blockquote {
        border-left: 4px solid var(--primary-color);
        padding: 1rem 0 1rem 2rem;
        margin: 2rem 0;
        font-style: italic;
        background: rgba(0, 255, 255, 0.05);
        border-radius: 5px;
    }
    
    .rating-box {
        background: var(--gradient-2);
        color: var(--dark-bg);
        padding: 1rem;
        text-align: center;
        border-radius: 10px;
        font-size: 1.5rem;
        margin: 2rem 0;
    }
    
    .product-detail-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 2rem;
    }
    
    .product-detail-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .product-detail-price {
        font-size: 2.5rem;
        color: var(--primary-color);
        font-weight: bold;
    }
    
    .product-detail-rating {
        color: var(--accent-color);
        font-size: 1.2rem;
    }
    
    .product-detail-description {
        color: var(--gray-text);
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .specs-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 2rem;
    }
    
    .specs-table td {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .features-list {
        margin-bottom: 2rem;
        padding-left: 1.5rem;
    }
    
    .features-list li {
        margin-bottom: 0.8rem;
        color: var(--gray-text);
    }
    
    .review-card {
        background: rgba(255, 255, 255, 0.05);
        padding: 1.5rem;
        border-radius: 10px;
        margin-bottom: 1rem;
    }
    
    .review-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }
    
    .review-rating {
        color: var(--accent-color);
    }
    
    img.loaded {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .animate-in {
        animation: slideUp 0.6s ease forwards;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal.active .modal-content {
        animation: modalSlideIn 0.3s ease;
    }
    
    @keyframes modalSlideIn {
        from {
            transform: translateY(-50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    document.body.setAttribute('data-theme', currentTheme);
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Initialize article count
    updateArticleCount();
    
    // Add event listeners for article links with return false
    document.querySelectorAll('.read-more, .btn-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const onclick = this.getAttribute('onclick');
            if (onclick) {
                const match = onclick.match(/openArticle\(['"]([^'"]+)['"]\)/);
                if (match && match[1]) {
                    openArticle(match[1]);
                }
            }
            return false;
        });
    });
    
    // Handle featured card clicks
    document.querySelectorAll('.featured-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const titleElement = this.querySelector('h4');
            if (titleElement) {
                const title = titleElement.textContent;
                const articleMap = {
                    'Mediterranean Diet: Complete Guide': 'plant-based',
                    'Hidden Gems: Europe\'s Best Kept Secrets': 'bali-guide',
                    'Spring Fashion Trends 2025': 'sustainable-fashion'
                };
                const articleId = articleMap[title];
                if (articleId) {
                    openArticle(articleId);
                }
            }
        });
    });
    
    // Add initial animations
    document.querySelectorAll('.article-card, .product-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Load More Articles Functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const articlesContainer = document.getElementById('articlesGrid');
    let currentPage = 1;
    
    // Additional articles data
    const additionalArticles = [
        {
            category: 'technology',
            tags: 'blockchain,crypto,fintech,innovation',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600',
            categoryName: 'Technology',
            date: 'Jan 20, 2025',
            readTime: '9 min',
            title: 'Blockchain Beyond Cryptocurrency',
            excerpt: 'Exploring real-world applications of blockchain technology in supply chain, healthcare, and governance.',
            link: 'article-tech.html'
        },
        {
            category: 'health',
            tags: 'mental-health,meditation,wellness,mindfulness',
            image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600',
            categoryName: 'Health & Wellness',
            date: 'Jan 21, 2025',
            readTime: '6 min',
            title: 'The Science of Meditation',
            excerpt: 'How daily meditation practice can transform your brain and improve mental health.',
            link: 'article-health.html'
        },
        {
            category: 'fashion',
            tags: 'vintage,thrifting,sustainable,style',
            image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600',
            categoryName: 'Fashion',
            date: 'Jan 22, 2025',
            readTime: '7 min',
            title: 'Vintage Fashion Renaissance',
            excerpt: 'Why vintage and thrift shopping is becoming the new luxury in sustainable fashion.',
            link: 'article-fashion.html'
        },
        {
            category: 'travel',
            tags: 'europe,backpacking,budget,adventure',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600',
            categoryName: 'Travel',
            date: 'Jan 23, 2025',
            readTime: '10 min',
            title: 'Budget Backpacking Through Europe',
            excerpt: 'Complete guide to exploring Europe on $50 a day, including hidden hostels and local secrets.',
            link: 'article-travel.html'
        },
        {
            category: 'food',
            tags: 'molecular,gastronomy,innovation,cuisine',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
            categoryName: 'Food & Cuisine',
            date: 'Jan 24, 2025',
            readTime: '8 min',
            title: 'Molecular Gastronomy at Home',
            excerpt: 'Learn the science and techniques behind molecular cuisine you can recreate in your kitchen.',
            link: 'article-food.html'
        },
        {
            category: 'lifestyle',
            tags: 'minimalism,declutter,organization,simple-living',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
            categoryName: 'Lifestyle',
            date: 'Jan 25, 2025',
            readTime: '11 min',
            title: 'The Art of Minimalist Living',
            excerpt: 'How to declutter your life and find happiness through intentional simplicity.',
            link: 'article-detail.html'
        }
    ];
    
    if (loadMoreBtn) {
        console.log('Load More button found');
        loadMoreBtn.addEventListener('click', function() {
            console.log('Load More clicked, current page:', currentPage);
            const startIndex = (currentPage - 1) * 3;
            const endIndex = startIndex + 3;
            const articlesToLoad = additionalArticles.slice(startIndex, endIndex);
            console.log('Articles to load:', articlesToLoad.length);
            
            if (articlesToLoad.length > 0) {
                const loadMoreSection = document.querySelector('.load-more-section');
                articlesToLoad.forEach((article, index) => {
                    const articleCard = createArticleCard(article);
                    articleCard.style.opacity = '0';
                    articleCard.style.transform = 'translateY(20px)';
                    articlesContainer.insertBefore(articleCard, loadMoreSection);
                    
                    // Animate the new cards
                    setTimeout(() => {
                        articleCard.style.transition = 'all 0.5s ease';
                        articleCard.style.opacity = '1';
                        articleCard.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                currentPage++;
                
                // Update article count
                updateArticleCount();
                
                // Hide button if no more articles
                if (currentPage > Math.ceil(additionalArticles.length / 3)) {
                    loadMoreBtn.textContent = 'No More Articles';
                    loadMoreBtn.disabled = true;
                    loadMoreBtn.style.opacity = '0.5';
                }
            }
        });
    }
    
    function createArticleCard(article) {
        const card = document.createElement('article');
        card.className = 'article-card';
        card.setAttribute('data-category', article.category);
        card.setAttribute('data-tags', article.tags);
        
        card.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-category">${article.categoryName}</span>
                    <span class="article-date">${article.date}</span>
                    <span class="read-time"><i class="far fa-clock"></i> ${article.readTime}</span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <a href="${article.link}" class="read-more">Continue Reading</a>
            </div>
        `;
        
        return card;
    }
});