import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

/** Portfolio tokens from styles/tokens.css */
const NAVY = 0x0b1849;
const GREEN = 0x124d1c;
const GOLD = 0xe4b028;
const MIST = 0xebede3;

export type ParticlesSwarmOptions = {
  count?: number;
  /** Sphere width/height segments; lower on mobile. */
  sphereSegments?: number;
  dprCap?: number;
};

/**
 * Instanced particle swarm for the homepage hero section background.
 * Quiet bloom, navy→green→gold progression, pause/dispose safe.
 */
export class ParticlesSwarm {
  readonly container: HTMLElement;
  readonly count: number;
  private readonly sphereSegments: number;
  private readonly dprCap: number;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private composer: EffectComposer;
  private bloomPass: UnrealBloomPass;
  private mesh: THREE.InstancedMesh;
  private geometry: THREE.SphereGeometry;
  private material: THREE.ShaderMaterial;
  private positions: THREE.Vector3[];
  private dummy = new THREE.Object3D();
  private target = new THREE.Vector3();
  private pColor = new THREE.Color();
  private readonly navy = new THREE.Color(NAVY);
  private readonly green = new THREE.Color(GREEN);
  private readonly gold = new THREE.Color(GOLD);
  private readonly mistTint = new THREE.Color(MIST);
  private clock = new THREE.Clock();
  private raf = 0;
  private running = false;
  private disposed = false;
  private visible = true;
  private pageVisible = true;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private readonly onVisibility = () => {
    this.pageVisible = document.visibilityState === "visible";
    this.syncLoop();
  };
  private readonly tick = () => {
    this.raf = 0;
    if (!this.running || this.disposed) return;
    this.renderFrame();
    this.raf = requestAnimationFrame(this.tick);
  };

  constructor(container: HTMLElement, options: ParticlesSwarmOptions = {}) {
    this.container = container;
    this.count = options.count ?? 7000;
    this.sphereSegments = options.sphereSegments ?? 12;
    this.dprCap = options.dprCap ?? 1.75;

    const { width, height } = this.measure();

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(MIST, 0.006);
    this.scene.background = null;

    this.camera = new THREE.PerspectiveCamera(55, width / Math.max(height, 1), 0.1, 2000);
    this.camera.position.set(0, 0, 110);

    this.renderer = new THREE.WebGLRenderer({
      antialias: this.sphereSegments >= 12,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(MIST, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.dprCap));
    this.renderer.setSize(width, height, false);
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    this.renderer.domElement.style.display = "block";
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    this.container.appendChild(this.renderer.domElement);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.42, 0.22, 0.82);
    this.composer.addPass(this.bloomPass);

    this.geometry = new THREE.SphereGeometry(0.28, this.sphereSegments, this.sphereSegments);
    this.material = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vColor;
        void main() {
          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * mat3(instanceMatrix) * normal);
          vViewPosition = -mvPosition.xyz;
          vColor = instanceColor;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vColor;
        void main() {
          float fresnel = dot(normalize(vNormal), normalize(vViewPosition));
          fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
          fresnel = pow(fresnel, 2.2);
          vec3 mist = vec3(0.92, 0.93, 0.89);
          vec3 col = mix(vColor * 0.45, vColor, fresnel) + mist * 0.03;
          gl_FragColor = vec4(col, 0.12 + fresnel * 0.36);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.mesh = new THREE.InstancedMesh(this.geometry, this.material, this.count);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(
      new Float32Array(this.count * 3),
      3,
    );
    this.scene.add(this.mesh);

    this.positions = [];
    const seed = new THREE.Color(GREEN);
    for (let i = 0; i < this.count; i++) {
      this.positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
        ),
      );
      this.mesh.setColorAt(i, seed);
    }
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.visible = entries.some((entry) => entry.isIntersecting);
        this.syncLoop();
      },
      { threshold: 0.05 },
    );
    this.intersectionObserver.observe(this.container);

    document.addEventListener("visibilitychange", this.onVisibility);
    this.pageVisible = document.visibilityState === "visible";
    this.syncLoop();
  }

  private measure() {
    const rect = this.container.getBoundingClientRect();
    return {
      width: Math.max(1, Math.floor(rect.width || this.container.clientWidth || 1)),
      height: Math.max(1, Math.floor(rect.height || this.container.clientHeight || 1)),
    };
  }

  resize() {
    if (this.disposed) return;
    const { width, height } = this.measure();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.dprCap));
    this.renderer.setSize(width, height, false);
    this.composer.setSize(width, height);
    this.bloomPass.setSize(width, height);
  }

  private syncLoop() {
    const shouldRun = !this.disposed && this.visible && this.pageVisible;
    if (shouldRun && !this.running) {
      this.running = true;
      this.clock.start();
      this.raf = requestAnimationFrame(this.tick);
      return;
    }
    if (!shouldRun && this.running) {
      this.running = false;
      if (this.raf) cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  private renderFrame() {
    const time = this.clock.getElapsedTime();
    const speed = 0.38;
    const chaos = 14;
    const coreSize = 11;
    const count = this.count;

    for (let i = 0; i < count; i++) {
      const norm = i / count;
      const progress = (norm + time * speed * 0.2) % 1.0;
      const easeProgress = Math.pow(progress, 1.5);

      const goldenRatio = (1.0 + Math.sqrt(5.0)) / 2.0;
      const theta = (2.0 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1.0 - 2.0 * norm);

      const currentRadius = coreSize + 140.0 * (1.0 - easeProgress);
      const instability = Math.pow(1.0 - progress, 2.0);
      const wobbleX = Math.sin(time * 2.0 + norm * 100.0) * chaos * instability;
      const wobbleY = Math.cos(time * 1.5 + norm * 200.0) * chaos * instability;
      const wobbleZ = Math.sin(time * 3.0 - norm * 300.0) * chaos * instability;

      const sinPhi = Math.sin(phi);
      this.target.set(
        currentRadius * sinPhi * Math.cos(theta) + wobbleX,
        currentRadius * sinPhi * Math.sin(theta) + wobbleY,
        currentRadius * Math.cos(phi) + wobbleZ,
      );

      // Outer navy → mid green → core gold
      if (progress < 0.55) {
        this.pColor.copy(this.navy).lerp(this.green, progress / 0.55);
      } else {
        this.pColor.copy(this.green).lerp(this.gold, (progress - 0.55) / 0.45);
      }
      const corePulse = progress > 0.95 ? Math.sin(time * 8.0) * 0.12 : 0;
      this.pColor.offsetHSL(0, 0, corePulse);
      this.pColor.lerp(this.mistTint, 0.06);

      this.positions[i].lerp(this.target, 0.1);
      this.dummy.position.copy(this.positions[i]);
      const scale = 0.55 + progress * 0.7;
      this.dummy.scale.setScalar(scale);
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
      this.mesh.setColorAt(i, this.pColor);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
    this.composer.render();
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;

    document.removeEventListener("visibilitychange", this.onVisibility);
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.resizeObserver = null;
    this.intersectionObserver = null;

    this.geometry.dispose();
    this.material.dispose();
    this.scene.remove(this.mesh);
    this.mesh.dispose();
    this.composer.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
