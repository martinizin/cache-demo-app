import { useState, useEffect } from "react";

const CART_STORAGE_KEY = "cartIds:v1";

export const useCart = () => {
  const [ids, setIds] = useState<number[]>([]);

  // Cargar IDs desde localStorage al inicializar
  useEffect(() => {
    try {
      const storedIds = localStorage.getItem(CART_STORAGE_KEY);
      if (storedIds) {
        const parsedIds = JSON.parse(storedIds);
        if (Array.isArray(parsedIds)) {
          setIds(parsedIds);
        }
      }
    } catch (error) {
      console.error("Error cargando carrito desde localStorage:", error);
    }
  }, []);

  // Persistir IDs en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(ids));
    } catch (error) {
      console.error("Error guardando carrito en localStorage:", error);
    }
  }, [ids]);

  // Agregar ID al carrito (solo si no existe)
  const add = (id: number) => {
    setIds((prev) => {
      if (prev.includes(id)) {
        return prev; // Ya existe, no agregar duplicado
      }
      return [...prev, id];
    });
  };

  // Remover ID del carrito
  const remove = (id: number) => {
    setIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  // Vaciar todo el carrito
  const clear = () => {
    setIds([]);
  };

  // Cantidad de items en el carrito
  const count = ids.length;

  return {
    ids,
    add,
    remove,
    clear,
    count,
  };
};