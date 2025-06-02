document.addEventListener('DOMContentLoaded', () => {

    const protectionData = {
        labels: ['AV-Test Protection Score', 'AV-Comparatives Protection Rate'],
        datasets: [
            {
                label: 'Kaspersky',
                data: [6, 99.0], 
                backgroundColor: 'rgba(22, 163, 74, 0.7)',
                borderColor: 'rgba(22, 163, 74, 1)',
                borderWidth: 1,
            },
            {
                label: 'Windows Defender',
                data: [6, 98.8],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }
        ]
    };

    const falsePositivesData = {
        labels: ['False Positives (Non-Business Software)'],
        datasets: [
            {
                label: 'Kaspersky',
                data: [0],
                backgroundColor: 'rgba(22, 163, 74, 0.7)',
                borderColor: 'rgba(22, 163, 74, 1)',
                borderWidth: 1
            },
            {
                label: 'Windows Defender',
                data: [3],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }
        ]
    };

    const performanceData = {
        labels: ['File Copying', 'Archiving', 'Installing Apps', 'Launching Apps', 'Downloading', 'Browsing'],
        datasets: [
             {
                label: 'Kaspersky',
                data: [2, 2, 2, 2, 2, 2],
                backgroundColor: 'rgba(22, 163, 74, 0.7)',
                borderColor: 'rgba(22, 163, 74, 1)',
                borderWidth: 1
            },
            {
                label: 'Windows Defender',
                data: [2, 1, 1, 2, 2, 2],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }
        ]
    };

    const featuresData = [
        { name: 'Core Antivirus', k_std: true, k_plus: true, k_prem: true, w_def: true, desc: 'Real-time protection against viruses, malware, and ransomware.' },
        { name: 'Firewall', k_std: true, k_plus: true, k_prem: true, w_def: true, desc: 'Monitors incoming and outgoing network traffic to block unauthorized access.' },
        { name: 'Payment Protection', k_std: true, k_plus: true, k_prem: true, w_def: 'browser', desc: 'Kaspersky uses a protected browser (Safe Money) for financial transactions. Defender relies on browser security like SmartScreen.' },
        { name: 'VPN', k_std: 'limited', k_plus: true, k_prem: true, w_def: 'limited', desc: 'Encrypts your internet connection. Kaspersky Plus/Premium offer unlimited data, while Standard and Microsoft Defender have data caps.' },
        { name: 'Password Manager', k_std: 'limited', k_plus: true, k_prem: true, w_def: 'browser', desc: 'Securely stores passwords. Kaspersky Plus/Premium offer a full-featured vault. Windows relies on browser-based saving.' },
        { name: 'Parental Controls', k_std: false, k_plus: false, k_prem: true, w_def: true, desc: 'Helps manage childrens screen time and content access. Kaspersky Premium includes Safe Kids; Microsoft offers Family Safety for free.' },
        { name: 'Identity Protection', k_std: false, k_plus: false, k_prem: true, w_def: 'limited', desc: 'Monitors for data leaks and identity theft. A premium feature for both, with Microsoft\'s being US-only and tied to a M365 subscription.' },
        { name: 'Performance Tools', k_std: true, k_plus: true, k_prem: true, w_def: 'basic', desc: 'Utilities to clean junk files and speed up your PC. Kaspersky offers dedicated tools; Windows has basic OS-level functions.' },
    ];
    
    const recommendations = {
        budget: {
            title: 'Recommendation for: Budget-Conscious User',
            product: 'Windows Defender',
            color: 'blue-600',
            rationale: 'For users seeking solid baseline protection without any cost, Windows Defender is the unbeatable choice. It delivers excellent core malware protection, is entirely free, and is seamlessly integrated into Windows. It provides more than enough security for anyone who practices safe online habits.'
        },
        family: {
            title: 'Recommendation for: Family with Kids',
            product: 'Kaspersky Premium or Microsoft Family Safety',
            color: 'purple-600',
            rationale: 'Both are strong choices. Kaspersky Premium includes the very comprehensive "Safe Kids" suite. However, Microsoft\'s free Family Safety is also robust and integrates perfectly with Windows and Xbox. The choice depends on your specific needs for cross-platform support and depth of monitoring.'
        },
        power: {
            title: 'Recommendation for: All-in-One Power User',
            product: 'Kaspersky Plus or Premium',
            color: 'emerald-600',
            rationale: 'If you want a single suite that bundles a full-featured unlimited VPN, a dedicated password manager, performance tools, and top-tier protection with minimal false positives, investing in a Kaspersky paid tier is the best choice. It provides comprehensive tools and convenience that go far beyond basic protection.'
        },
        privacy: {
            title: 'Recommendation for: Privacy-Focused User',
            product: 'Kaspersky Plus',
            color: 'emerald-600',
            rationale: 'For maximum privacy, a suite with an unlimited VPN is essential. Kaspersky Plus provides this, along with other privacy-enhancing tools like Private Browsing and a Data Leak Checker. This offers a comprehensive privacy toolkit beyond what standard Windows provides.'
        }
    };

    function renderCharts() {
        const commonOptions = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#4b5563' }
                },
                x: {
                    ticks: { color: '#4b5563' }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#1f2937' }
                }
            }
        };

        new Chart(document.getElementById('protectionChart'), {
            type: 'bar',
            data: protectionData,
            options: { ...commonOptions, 
                scales: { 
                    y: { 
                        beginAtZero: false,
                        min: 95,
                        max: 100,
                        ticks: { color: '#4b5563', callback: function(value, index, values) { if(index % 2 === 0) return value + '%'; } }
                    },
                    x: { ticks: { color: '#4b5563' } } 
                },
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed.y !== null) {
                                    if(context.dataIndex === 0) label += context.parsed.y.toFixed(1) + ' / 6.0';
                                    else label += context.parsed.y.toFixed(1) + '%';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
        
        new Chart(document.getElementById('falsePositivesChart'), {
            type: 'bar',
            data: falsePositivesData,
            options: { ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });

        new Chart(document.getElementById('performanceChart'), {
            type: 'bar',
            data: performanceData,
            options: {
                ...commonOptions,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 2,
                        ticks: {
                            callback: function(value, index, values) {
                                if (value === 2) return 'Very Fast';
                                if (value === 1) return 'Fast';
                                return '';
                            }
                        }
                    }
                }
            }
        });
    }
    
    function renderFeatures() {
        const grid = document.getElementById('features-grid');
        const icon = (val) => {
            if (val === true) return '<span class="text-emerald-500 font-bold text-xl">✔</span>';
            if (val === false) return '<span class="text-red-500 font-bold text-xl">✖</span>';
            if (val === 'limited') return '<span class="text-yellow-500 font-bold text-xl">~</span>';
            if (val === 'browser' || val === 'basic') return '<span class="text-blue-500 font-bold text-xl">✓</span>';
            return '';
        };

        featuresData.forEach(feature => {
            const row = document.createElement('div');
            row.className = 'grid grid-cols-5 gap-4 items-center py-3 text-center';
            row.innerHTML = `
                <div class="text-left font-medium relative feature-item">
                    ${feature.name}
                    <div class="feature-tooltip absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 invisible transition-all duration-300 z-10">
                        ${feature.desc}
                    </div>
                </div>
                <div>${icon(feature.k_std)}</div>
                <div>${icon(feature.k_plus)}</div>
                <div>${icon(feature.k_prem)}</div>
                <div>${icon(feature.w_def)}</div>
            `;
            grid.appendChild(row);
        });
    }

    function handlePersonaButtons() {
        const buttons = document.querySelectorAll('.persona-btn');
        const card = document.getElementById('recommendation-card');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const persona = button.dataset.persona;
                const recommendation = recommendations[persona];

                buttons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');

                card.innerHTML = `
                    <div class="transition-opacity duration-500">
                        <h3 class="text-2xl font-bold text-${recommendation.color} mb-3">${recommendation.title}</h3>
                        <p class="text-lg font-semibold mb-4">Recommended: ${recommendation.product}</p>
                        <p class="text-gray-600">${recommendation.rationale}</p>
                    </div>
                `;
            });
        });
    }
    
    function handleMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    function handleActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    renderCharts();
    renderFeatures();
    handlePersonaButtons();
    handleMobileMenu();
    handleActiveNav();
});