
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BodyStats, Gender } from '../types';

interface BodyVisualizer3DProps {
  stats: BodyStats;
  bmi: number;
}

const BodyVisualizer3D: React.FC<BodyVisualizer3DProps> = ({ stats, bmi }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const mannequinRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.2, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x3b82f6, 3, 15);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 5, 5);
    scene.add(spotLight);

    // Mannequin Construction
    const mannequin = new THREE.Group();
    mannequinRef.current = mannequin;
    scene.add(mannequin);

    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x334155,
      emissive: 0x0f172a,
      specular: 0x60a5fa,
      shininess: 40,
      transparent: true,
      opacity: 0.92,
      flatShading: false
    });

    const createSegment = (geo: THREE.BufferGeometry, pos: [number, number, number], name: string) => {
      const mesh = new THREE.Mesh(geo, bodyMaterial);
      mesh.position.set(...pos);
      mesh.name = name;
      mannequin.add(mesh);
      return mesh;
    };

    // Geometries - Anatomical segments
    createSegment(new THREE.SphereGeometry(0.12, 32, 32), [0, 1.7, 0], 'head');
    createSegment(new THREE.CylinderGeometry(0.06, 0.08, 0.15, 16), [0, 1.58, 0], 'neck');
    createSegment(new THREE.CylinderGeometry(0.18, 0.16, 0.5, 32), [0, 1.35, 0], 'chest');
    createSegment(new THREE.CylinderGeometry(0.16, 0.22, 0.45, 32), [0, 0.9, 0], 'hips');
    
    // Arms
    createSegment(new THREE.CapsuleGeometry(0.045, 0.55, 8, 16), [-0.32, 1.3, 0], 'armL');
    createSegment(new THREE.CapsuleGeometry(0.045, 0.55, 8, 16), [0.32, 1.3, 0], 'armR');
    
    // Hands
    createSegment(new THREE.BoxGeometry(0.07, 0.09, 0.03), [-0.32, 0.9, 0], 'handL');
    createSegment(new THREE.BoxGeometry(0.07, 0.09, 0.03), [0.32, 0.9, 0], 'handR');

    // Legs
    createSegment(new THREE.CapsuleGeometry(0.075, 0.8, 8, 16), [-0.13, 0.4, 0], 'legL');
    createSegment(new THREE.CapsuleGeometry(0.075, 0.8, 8, 16), [0.13, 0.4, 0], 'legR');

    const animate = () => {
      requestAnimationFrame(animate);
      if (mannequinRef.current) {
        mannequinRef.current.rotation.y += 0.006;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  // Update logic on stats change - Complex non-uniform scaling
  useEffect(() => {
    if (!mannequinRef.current) return;
    
    const t = (bmi - 15) / 30;
    const w = Math.max(0, Math.min(1.5, t)); // Anthropometric weight factor
    const isMale = stats.gender === Gender.MALE;

    mannequinRef.current.children.forEach((obj) => {
      // Dynamic scaling factors for X (width), Y (height/length), and Z (depth)
      let scaleX = 1;
      let scaleY = 1;
      let scaleZ = 1;

      switch(obj.name) {
        case 'chest':
          scaleX = (isMale ? 1.0 : 0.9) + (w * 0.8);
          scaleZ = (isMale ? 1.0 : 1.1) + (w * 0.6);
          break;
        case 'hips':
          scaleX = (isMale ? 0.9 : 1.1) + (w * 0.7 * (isMale ? 0.8 : 1.3));
          scaleZ = (isMale ? 1.0 : 1.1) + (w * 0.9 * (isMale ? 1.2 : 0.8)); // Males belly depth
          break;
        case 'neck':
          scaleX = scaleZ = 1.0 + (w * 0.5 * (isMale ? 1.2 : 0.8));
          break;
        case 'armL':
        case 'armR':
          scaleX = scaleZ = 1.0 + (w * 0.6);
          break;
        case 'legL':
        case 'legR':
          scaleX = scaleZ = 1.0 + (w * 0.7 * (isMale ? 0.8 : 1.4)); // Pear shape for females
          break;
        case 'handL':
        case 'handR':
          scaleX = scaleZ = 1.0 + (w * 0.2);
          break;
        case 'head':
          scaleX = scaleZ = 1.0 + (w * 0.1);
          break;
      }

      obj.scale.set(scaleX, scaleY, scaleZ);
      
      // Adjust positions for widening parts (like legs)
      if (obj.name === 'legL') obj.position.x = -0.13 - (w * 0.08);
      if (obj.name === 'legR') obj.position.x = 0.13 + (w * 0.08);
      if (obj.name === 'armL') obj.position.x = -0.32 - (w * 0.1);
      if (obj.name === 'armR') obj.position.x = 0.32 + (w * 0.1);
      if (obj.name === 'handL') obj.position.x = -0.32 - (w * 0.1);
      if (obj.name === 'handR') obj.position.x = 0.32 + (w * 0.1);
    });
  }, [bmi, stats.gender]);

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-inner">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <div>
            <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Depth Projection</div>
            <div className="text-sm font-black text-white uppercase italic tracking-tight">3D Scan Active</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-10 text-right pointer-events-none">
        <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Projection BMI</div>
        <div className="text-4xl md:text-5xl font-black text-white/10 italic leading-none transition-all">
          {bmi.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default BodyVisualizer3D;
