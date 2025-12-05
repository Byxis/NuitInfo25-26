// Image loader pour les ennemis (paths depuis public/)
export const ENEMY_IMAGES = {
  BUG: 'tower-defense/enemies/bug.jpg',
  ERROR_404: 'tower-defense/enemies/404.png',
  DISK_FULL: 'tower-defense/enemies/disk_full.png',
  BLUE_SCREEN: 'tower-defense/enemies/Blue_Screen_of_Death.png',
  HOURGLASS: 'tower-defense/enemies/hourglass.png',
  ACCESS_DENIED: 'tower-defense/enemies/access_denied.png',
  VIRUS: 'tower-defense/enemies/Virus_malware.png',
  RANSOMWARE: 'tower-defense/enemies/ransomware.png',
} as const;

// Image loader pour les défenses (paths depuis public/)
export const DEFENSE_IMAGES = {
  PC_LINUX: 'tower-defense/defenses/pc-linux.png',
  PC_RECONDITIONED: 'tower-defense/defenses/pc-reconditioned.png',
  LOCAL_SERVER: 'tower-defense/defenses/local-server.png',
  ECO_DELEGATE: 'tower-defense/defenses/eco-delegate.png',
} as const;

// Préchargement des images
export class ImagePreloader {
  private static imageCache = new Map<string, HTMLImageElement>();

  static preloadEnemyImages(): Promise<void> {
    const promises = Object.values(ENEMY_IMAGES).map(path => 
      this.loadImage(path)
    );
    return Promise.all(promises).then(() => {});
  }

  static preloadDefenseImages(): Promise<void> {
    const promises = Object.values(DEFENSE_IMAGES).map(path => 
      this.loadImage(path)
    );
    return Promise.all(promises).then(() => {});
  }

  static loadImage(path: string): Promise<HTMLImageElement> {
    if (this.imageCache.has(path)) {
      return Promise.resolve(this.imageCache.get(path)!);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.imageCache.set(path, img);
        resolve(img);
      };
      img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
      img.src = path;
    });
  }

  static getImage(path: string): HTMLImageElement | null {
    return this.imageCache.get(path) || null;
  }
}
