import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 3D Gift Box Mesh: 3 Màu (Tím Vũ Trụ, Xanh Cyan Neon, Trắng Ánh Kim)
function GiftBoxMesh({ isOpening, onExplode }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Smooth rotation & interactive hover/explosion physics
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isOpening) {
      groupRef.current.rotation.y += delta * 12;
      groupRef.current.rotation.x += delta * 8;
      groupRef.current.scale.x += delta * 4;
      groupRef.current.scale.y += delta * 4;
      groupRef.current.scale.z += delta * 4;
    } else {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isOpening && onExplode) {
      onExplode();
    }
  };

  return (
    <group
      ref={groupRef}
      scale={hovered ? [1.12, 1.12, 1.12] : [1, 1, 1]}
    >
      {/* Invisible Hitbox bao phủ toàn bộ hộp quà để nhận click cực nhạy */}
      <mesh
        onClick={handleClick}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        visible={false}
      >
        <boxGeometry args={[2.4, 2.4, 2.4]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Sparkles: Không chặn raycasting */}
      <Sparkles
        count={45}
        scale={4}
        size={3}
        speed={0.8}
        color="#38bdf8"
        raycast={() => null}
      />
      <Sparkles
        count={35}
        scale={3.5}
        size={2.5}
        speed={0.6}
        color="#a855f7"
        raycast={() => null}
      />

      {/* --- Main Box Body (Màu Tím Đậm Hoàng Gia) --- */}
      <mesh
        position={[0, -0.2, 0]}
        castShadow
        receiveShadow
        onClick={handleClick}
      >
        <boxGeometry args={[1.6, 1.3, 1.6]} />
        <meshPhysicalMaterial
          color="#6d28d9"
          emissive="#4c1d95"
          emissiveIntensity={hovered ? 0.6 : 0.3}
          roughness={0.2}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* --- Box Lid (Nắp hộp tím) --- */}
      <mesh
        position={[0, 0.55, 0]}
        castShadow
        onClick={handleClick}
      >
        <boxGeometry args={[1.72, 0.35, 1.72]} />
        <meshPhysicalMaterial
          color="#7c3aed"
          emissive="#5b21b6"
          emissiveIntensity={hovered ? 0.7 : 0.35}
          roughness={0.15}
          metalness={0.55}
          clearcoat={1}
        />
      </mesh>

      {/* --- Vertical Ribbon (Ruy băng dọc màu Xanh Cyan Neon) --- */}
      <mesh position={[0, -0.2, 0]} onClick={handleClick}>
        <boxGeometry args={[0.3, 1.32, 1.62]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={hovered ? 0.8 : 0.5}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      {/* Ribbon on lid (dọc) */}
      <mesh position={[0, 0.56, 0]} onClick={handleClick}>
        <boxGeometry args={[0.3, 0.36, 1.74]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={hovered ? 0.8 : 0.5}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* --- Horizontal Ribbon (Ruy băng ngang màu Xanh Cyan Neon) --- */}
      <mesh position={[0, -0.2, 0]} onClick={handleClick}>
        <boxGeometry args={[1.62, 1.32, 0.3]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={hovered ? 0.8 : 0.5}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      {/* Ribbon on lid (ngang) */}
      <mesh position={[0, 0.56, 0]} onClick={handleClick}>
        <boxGeometry args={[1.74, 0.36, 0.3]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={hovered ? 0.8 : 0.5}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* --- Ribbon Bow Knot on Top (Nơ màu Cyan rực rỡ) --- */}
      <group position={[0, 0.8, 0]} onClick={handleClick}>
        {/* Loop 1 */}
        <mesh position={[-0.25, 0.12, 0]} rotation={[0, 0, 0.6]}>
          <torusGeometry args={[0.22, 0.08, 16, 32]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={0.8}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        {/* Loop 2 */}
        <mesh position={[0.25, 0.12, 0]} rotation={[0, 0, -0.6]}>
          <torusGeometry args={[0.22, 0.08, 16, 32]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={0.8}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        {/* Loop 3 */}
        <mesh position={[0, 0.12, -0.25]} rotation={[0.6, 0, 0]}>
          <torusGeometry args={[0.22, 0.08, 16, 32]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={0.8}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        {/* Loop 4 */}
        <mesh position={[0, 0.12, 0.25]} rotation={[-0.6, 0, 0]}>
          <torusGeometry args={[0.22, 0.08, 16, 32]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={0.8}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        {/* Center sphere knot */}
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#0891b2"
            emissiveIntensity={1}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Aura Ring under the Box: Cyan/Purple */}
      <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.4, 32]} />
        <meshBasicMaterial
          color={hovered ? '#38bdf8' : '#8b5cf6'}
          transparent
          opacity={hovered ? 0.75 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export const GiftBox3D = ({ onOpenGift, isExploding = false }) => {
  const pointerStartRef = useRef({ x: 0, y: 0, time: 0 });

  const handlePointerDown = (e) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
  };

  const handlePointerUp = (e) => {
    const dist = Math.hypot(
      e.clientX - pointerStartRef.current.x,
      e.clientY - pointerStartRef.current.y
    );
    const duration = Date.now() - pointerStartRef.current.time;

    // Nếu là click nhanh (không phải kéo xoay > 10px), kích hoạt mở hộp quà
    if (dist < 10 && duration < 500 && !isExploding && onOpenGift) {
      onOpenGift();
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="w-full h-[420px] md:h-[500px] cursor-pointer relative flex items-center justify-center select-none"
    >
      <Canvas
        camera={{ position: [0, 1.2, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 6, 5]} intensity={1.5} castShadow />
        <pointLight position={[-4, 3, -3]} color="#8b5cf6" intensity={2.5} />
        <pointLight position={[3, -2, 4]} color="#06b6d4" intensity={2.2} />
        <pointLight position={[0, 4, 0]} color="#38bdf8" intensity={1.5} />

        <Float
          speed={2.2}
          rotationIntensity={0.6}
          floatIntensity={1.2}
          floatingRange={[-0.1, 0.1]}
        >
          <GiftBoxMesh isOpening={isExploding} onExplode={onOpenGift} />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.3}
          minPolarAngle={Math.PI / 3 - 0.3}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
};

export default GiftBox3D;
