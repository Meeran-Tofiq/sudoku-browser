export class WinBanner {
  private bannerElement: HTMLElement;
  private confettiContainer: HTMLElement;

  constructor() {
    this.bannerElement = document.getElementById("win-banner")!;
    this.confettiContainer = document.getElementById("confetti-container")!;
    this.setupListeners();
  }

  private setupListeners() {
    // Close button
    document.getElementById("win-close")?.addEventListener("click", () => {
      this.hide();
    });

    // Click outside to close
    this.bannerElement.addEventListener("click", (e) => {
      if (e.target === this.bannerElement) {
        this.hide();
      }
    });

    // Escape key to close
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        !this.bannerElement.classList.contains("hidden")
      ) {
        this.hide();
      }
    });
  }

  show() {
    this.bannerElement.classList.remove("hidden");
    this.spawnConfetti();
  }

  hide() {
    this.bannerElement.classList.add("hidden");
    this.clearConfetti();
  }

  private spawnConfetti() {
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#00bcd4",
      "#4caf50",
      "#ffeb3b",
      "#ff9800",
    ];
    const confettiCount = 150;

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        this.createConfettiPiece(colors);
      }, i * 20);
    }
  }

  private createConfettiPiece(colors: string[]) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const size = Math.random() * 8 + 6;
    const duration = Math.random() * 2 + 2;
    const shape = Math.random() > 0.5 ? "50%" : "0";

    confetti.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: ${shape};
      animation-duration: ${duration}s;
    `;

    this.confettiContainer.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, duration * 1000);
  }

  private clearConfetti() {
    this.confettiContainer.innerHTML = "";
  }
}
