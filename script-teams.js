/**
 * Teams Page JavaScript Module
 *
 * Features:
 * - Foldable Publications and Conferences sections
 * - Toggle functionality with smooth animations
 * - Team member card interactions
 * - Statistics display
 * - Interactive organigram with member detail modals
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // FOLDABLE PUBLICATIONS AND CONFERENCES SECTIONS
    // ============================================================

    // Setup toggle handlers for publications
    const publicationToggles = document.querySelectorAll('.publications-toggle');
    publicationToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const foldable = toggle.closest('.foldable-publications');
            if (foldable) {
                foldable.classList.toggle('expanded');
                toggle.setAttribute('aria-expanded',
                    foldable.classList.contains('expanded'));
            }
        });
    });

    // Setup toggle handlers for conferences
    const conferenceToggles = document.querySelectorAll('.conferences-toggle');
    conferenceToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const foldable = toggle.closest('.foldable-conferences');
            if (foldable) {
                foldable.classList.toggle('expanded');
                toggle.setAttribute('aria-expanded',
                    foldable.classList.contains('expanded'));
            }
        });
    });

    // Allow clicking on the header to toggle
    const publicationHeaders = document.querySelectorAll('.publications-header');
    publicationHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.querySelector('.publications-toggle').click();
        });
    });

    const conferenceHeaders = document.querySelectorAll('.conferences-header');
    conferenceHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.querySelector('.conferences-toggle').click();
        });
    });

    // ============================================================
    // INTERACTIVE ORGANIGRAM FUNCTIONALITY
    // ============================================================

    const memberData = {
        'lionel': {
            name: 'Dr. Lionel Agostini',
            position: 'Chargé de Recherche HDR - CNRS - Section 10',
            image: 'images/team/lionel_agostini.jpg',
            description: `I am a researcher in fluid mechanics with over 15 years of experience in the study and modelling of wall-bounded turbulent flows. My expertise is built on an interdisciplinary approach that combines fundamental theory of turbulent flows, high-fidelity numerical code development, and implementation of advanced machine learning methods.<br><br>
            My work aims to develop robust predictive models and innovative control strategies to optimise fluid systems performance, leveraging deep knowledge of turbulence physics combined with machine learning algorithms capabilities. This approach directly contributes to addressing current energy and environmental challenges by improving efficiency in transport systems and industrial heat exchangers.<br><br>
            Currently, I lead the <strong>ANR JCJC INFERENCE</strong> project on modelling near-wall turbulence at high Reynolds numbers, and co-supervise multiple PhD students working on topics ranging from heat transfer enhancement to reduced-order modelling using machine learning techniques.`,
            socials: [
                { icon: 'fab fa-orcid', link: 'https://orcid.org/0000-0001-8305-5493', title: 'ORCID' },
                { icon: 'fas fa-graduation-cap', link: 'https://scholar.google.co.uk/citations?user=wGGHJvijIz8C&hl=en', title: 'Google Scholar' },
                { icon: 'fab fa-github', link: 'https://github.com/LionelAgo', title: 'GitHub' },
                { icon: 'fas fa-envelope', link: 'mailto:lionel.agostini@univ-poitiers.fr', title: 'Email' }
            ]
        },
        'lou': {
            name: 'Lou Guérin',
            position: 'PhD Student',
            duration: '2022-2025',
            funding: 'ANR SOLAIRE',
            image: 'images/team/lou_guerin.jpg',
            project: 'Improving heat transfers in solar receivers through active control methods. The research focuses on enhancing thermal performance of concentrated solar power systems through innovative flow control techniques, particularly using spanwise wall oscillations.',
            achievements: [
                'Demonstrated for the first time a preferential enhancement of heat transfer over drag, breaking the Reynolds analogy',
                'Developed machine learning algorithms for control parameter optimisation',
                'Presented research at multiple international conferences including DLES 14 and EUROMECH COLLOQUIUM 631'
            ],
            socials: [
                { icon: 'fab fa-orcid', link: 'https://orcid.org/0009-0002-1274-777X', title: 'ORCID' },
                { icon: 'fas fa-envelope', link: 'mailto:lou.guerin@univ-poitiers.fr', title: 'Email' }
            ]
        },
        'niccolo': {
            name: 'Niccolò Tonioni',
            position: 'PhD Candidate',
            duration: '2023-Present',
            funding: 'EUR Intree/KTH',
            image: 'images/team/niccolo_tonioni.jpg',
            project: 'Deep learning and machine learning for computational fluid dynamics. Developing data-driven reduced-order models using variational autoencoders and neural networks to predict turbulent flow behavior. His work focuses on extracting essential characteristics of turbulent flows and projecting them into reduced spaces, with applications to flow control and vortex-induced vibrations.',
            achievements: [
                '<strong>VIVALDy Framework:</strong> Developed a hybrid generative reduced-order model combining β-Variational Autoencoders with adversarial loss for vortex-induced vibrations',
                'Novel deep learning approaches for flow state reconstruction from minimal sensor measurements',
                'Transformer-based architectures integrated with autoencoders for advanced turbulence modeling',
                'Expertise in linear and nonlinear projection-based methods for flow analysis'
            ],
            interests: ['Deep Learning', 'Autoencoders', 'Turbulence Modeling', 'Reduced-Order Models', 'Neural Networks', 'Flow Control'],
            socials: [
                { icon: 'fab fa-orcid', link: 'https://orcid.org/0009-0003-0164-5601', title: 'ORCID' },
                { icon: 'fas fa-globe', link: 'https://niccolotonioni.github.io', title: 'Website' },
                { icon: 'fab fa-linkedin', link: 'https://www.linkedin.com/in/niccolò-tonioni-22a079211/', title: 'LinkedIn' },
                { icon: 'fab fa-gitlab', link: 'https://gitlab.onelab.info/niccolo.tonioni', title: 'GitLab' },
                { icon: 'fas fa-envelope', link: 'mailto:niccolo.tonioni@univ-poitiers.fr', title: 'Email' }
            ]
        },
        'blessing': {
            name: 'Blessing Akinpelu',
            position: 'PhD Student',
            duration: '2024-2027',
            funding: 'ANR INFERENCE',
            image: 'images/team/blessing_akinpelu.jpg',
            project: 'Modelling of near-wall turbulence at high Reynolds number and development of control strategies. This research focuses on understanding how outer flow structures affect wall shear and heat transfer, and developing predictive models using advanced data-driven approaches.',
            achievements: [
                'Literature review on scale interactions in wall-bounded turbulent flows',
                'Development of computational framework for high-fidelity simulations',
                'Training in advanced data analysis techniques for turbulence research'
            ],
            socials: [
                { icon: 'fas fa-envelope', link: 'mailto:blessing.akinpelu@univ-poitiers.fr', title: 'Email' }
            ]
        },
        'kushagra': {
            name: 'Kushagra Saurabh',
            position: 'PhD Student',
            duration: '2025-2028',
            funding: 'Government',
            image: 'images/team/kushagra_saurabh.jpg',
            project: 'Modelling and Control of Near-Wall Turbulence: From Physical Understanding to Machine Learning Approaches. This research leverages machine learning algorithms to develop predictive models for near-wall turbulence in both incompressible and compressible flows, with dual objectives of reducing drag in transport systems and maximizing heat transfer in thermal applications.',
            interests: ['Wall-Bounded Turbulence', 'Machine Learning', 'Drag Reduction', 'Heat Transfer', 'Flow Control', 'Autoencoders', 'Reduced-Order Models'],
            socials: [
                { icon: 'fas fa-envelope', link: 'mailto:kushagra.saurabh@univ-poitiers.fr', title: 'Email' }
            ]
        },
        'ulrich': {
            name: 'Ulrich Junior Meukiedje Kamgang',
            position: 'PhD Student (CIFRE)',
            duration: '2025-2029',
            funding: 'CIFRE - Safran Aircraft Engines',
            image: 'images/team/Ulrich.jpg',
            project: '<strong>Optimization of Heat Transfer by Active Turbulence Control: Development of Intelligent Strategies for Turbojet Engines.</strong> This CIFRE PhD project, conducted in collaboration between Institut Pprime and Safran Aircraft Engines, aims to develop an innovative approach for optimizing heat transfer in turbojet engines through active turbulence control. The main objective is to design and numerically validate intelligent control strategies that exploit natural flow instabilities, particularly Görtler instability, to significantly improve thermal performance while minimizing energy consumption.',
            interests: ['Turbulence', 'Heat Transfer', 'Active Control', 'Görtler Instability', 'Plasma Actuators', 'Machine Learning', 'Reduced-Order Models', 'CFD'],
            socials: [
                { icon: 'fas fa-envelope', link: 'mailto:ulrich.meukiedje-kamgang@univ-poitiers.fr', title: 'Email' }
            ]
        },
        'nishant': {
            name: 'Nishant Kumar',
            position: 'Postdoctoral Researcher',
            duration: '2023-2025',
            funding: 'ANR MUFDD',
            image: 'images/team/nishant_kumar.jpg',
            project: 'Data-driven modelling of urban canopy flows. This research focuses on developing methods to build estimators and reduced-order models from simulation and experimental data, with particular emphasis on urban canopy flow dynamics.',
            achievements: [
                'Development of advanced data assimilation techniques for maintaining model accuracy in real conditions',
                'Integration of physical knowledge into machine learning algorithm design',
                'Implementation of reduced-order modelling techniques for complex environmental flows'
            ],
            socials: [
                { icon: 'fab fa-orcid', link: 'https://orcid.org/0000-0001-5759-0708', title: 'ORCID' },
                { icon: 'fas fa-book', link: 'https://hal.science/search/index/?q=nishant-kumar&authIdHal_s=nishant-kumar', title: 'HAL' },
                { icon: 'fas fa-envelope', link: 'mailto:nishant.kumar@univ-poitiers.fr', title: 'Email' }
            ]
        }
    };

    // Get modal elements
    const modal = document.getElementById('memberModal');
    const modalDetails = document.getElementById('modalMemberDetails');
    const closeBtn = document.querySelector('.modal-close');

    // Function to create member detail HTML
    function createMemberDetailHTML(data) {
        let html = `
            <div class="modal-member-header">
                <div class="modal-member-image">
                    <img src="${data.image}" alt="${data.name}">
                </div>
                <div class="modal-member-title">
                    <h2>${data.name}</h2>
                    <p><strong>${data.position}</strong></p>
                    ${data.duration ? `<p><i class="far fa-calendar"></i> ${data.duration}</p>` : ''}
                    ${data.affiliation ? `<p><i class="fas fa-building"></i> ${data.affiliation}</p>` : ''}
                    ${data.funding ? `<p><i class="fas fa-money-bill-wave"></i> Funding: ${data.funding}</p>` : ''}
                </div>
            </div>
            <div class="modal-member-body">
        `;

        if (data.description) {
            html += `<p>${data.description}</p>`;
        }

        if (data.project) {
            html += `
                <h3>Research Focus</h3>
                <p>${data.project}</p>
            `;
        }

        if (data.achievements && data.achievements.length > 0) {
            html += `
                <h3>Key Achievements</h3>
                <ul>
                    ${data.achievements.map(ach => `<li>${ach}</li>`).join('')}
                </ul>
            `;
        }

        if (data.interests && data.interests.length > 0) {
            html += `
                <h3>Research Interests</h3>
                <p>
                    ${data.interests.map(interest => `<span class="research-tag">${interest}</span>`).join('')}
                </p>
            `;
        }

        if (data.socials && data.socials.length > 0) {
            html += `
                <h3>Connect</h3>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    ${data.socials.map(social => `
                        <a href="${social.link}" target="_blank" class="social-link" title="${social.title}" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background-color: var(--background-color); color: var(--primary-color); transition: var(--transition); text-decoration: none;">
                            <i class="${social.icon}"></i>
                        </a>
                    `).join('')}
                </div>
            `;
        }

        html += '</div>';
        return html;
    }

    // Add click event listeners to organigram members
    const orgMembers = document.querySelectorAll('.org-member');
    orgMembers.forEach(member => {
        member.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            const data = memberData[memberId];

            if (data) {
                modalDetails.innerHTML = createMemberDetailHTML(data);
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
});
