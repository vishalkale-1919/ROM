// Cinematic Invitation Opening Sequence Controller

document.addEventListener("DOMContentLoaded", () => {
    const openingScreen = document.getElementById("opening-screen");
    const openBtn = document.getElementById("open-invitation-btn");
    const bgMusic = document.getElementById("bg-music");
    const body = document.body;

    // Check if invitation was already opened in this session
    if (sessionStorage.getItem("invitationOpened") === "true") {
        if (openingScreen) {
            openingScreen.style.display = "none";
        }
        body.classList.remove("lock-scroll");
        return; // Skip animation setup
    }

    // Ensure body scroll is locked on start
    body.classList.add("lock-scroll");

    // Initialize Particle Canvas for Falling Petals
    const canvas = document.getElementById("petal-canvas");
    let ctx = null;
    let petals = [];
    let animationFrameId = null;
    let isOpening = false;

    if (canvas) {
        ctx = canvas.getContext("2d");
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        initPetals();
        animatePetals();
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Petal {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height; // Distribute vertically at start
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 8 + 6;
            this.speedY = Math.random() * 1.5 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1;
            this.swingAngle = Math.random() * Math.PI;
            this.swingSpeed = Math.random() * 0.02 + 0.01;

            // Choose color: soft champagne gold, luxury gold, or soft rose gold
            const colors = [
                "rgba(191, 161, 95, ", // Gold
                "rgba(212, 175, 55, ", // Metallic Gold
                "rgba(197, 143, 136, ", // Rose Gold
                "rgba(244, 238, 225, "  // Cream Ivory
            ];
            this.colorBase = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.y += this.speedY;
            this.swingAngle += this.swingSpeed;
            this.x += Math.sin(this.swingAngle) * 0.8 + this.speedX;
            this.rotation += this.rotationSpeed;

            // Faster movement/dispersion when opening doors
            if (isOpening) {
                this.speedY = Math.random() * 3 + 2;
                this.x += this.speedX * 3;
            }

            if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.colorBase + this.opacity + ")";
            
            // Draw a delicate organic leaf/petal shape
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size / 1.6, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }
    }

    function initPetals() {
        petals = [];
        const petalCount = window.innerWidth < 768 ? 25 : 60;
        for (let i = 0; i < petalCount; i++) {
            petals.push(new Petal());
        }
    }

    function animatePetals() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        petals.forEach((petal) => {
            petal.update();
            petal.draw();
        });

        animationFrameId = requestAnimationFrame(animatePetals);
    }

    // Open Invitation Button Event Handler
    if (openBtn) {
        openBtn.addEventListener("click", () => {
            isOpening = true;
            
            // Try to play soft background music
            if (bgMusic) {
                bgMusic.muted = false;
                bgMusic.volume = 0.4;
                const playPromise = bgMusic.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.log("Audio autoplay prevented by browser policies:", error);
                    });
                }
            }

            // Lock double clicks
            openBtn.style.pointerEvents = "none";

            // Add doors-opening class to trigger background glow transition in CSS
            openingScreen.classList.add("doors-opening");

            // Define GSAP doors opening timeline
            const tl = gsap.timeline({
                onComplete: () => {
                    // Hide intro screen permanently for the current session
                    sessionStorage.setItem("invitationOpened", "true");
                    openingScreen.style.display = "none";
                    body.classList.remove("lock-scroll");
                    
                    // Stop canvas loop to free up processor
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                    }
                }
            });

            // 1. Fade out the opening content panel
            tl.to(".opening-content", {
                opacity: 0,
                scale: 0.92,
                duration: 0.8,
                ease: "power2.inOut"
            });

            // 2. Open the double doors (left rotates outward, right rotates outward)
            tl.to(".left-door", {
                rotateY: -115,
                duration: 2.2,
                ease: "power2.inOut"
            }, "-=0.2");

            tl.to(".right-door", {
                rotateY: 115,
                duration: 2.2,
                ease: "power2.inOut"
            }, "-=2.2");

            // 3. Fade out the overall opening screen overlay
            tl.to(openingScreen, {
                opacity: 0,
                duration: 1.2,
                ease: "power1.inOut"
            }, "-=1.0");

            // 4. Trigger elegant hero section entrance animation
            tl.from(".hero-monogram", {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
                ease: "back.out(1.5)"
            }, "-=1.0");

            tl.from(".hero-pretitle, .hero-title, .hero-subtitle, .hero-date, .hero-btn", {
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 1.4,
                ease: "power3.out"
            }, "-=1.0");
        });
    }
});
