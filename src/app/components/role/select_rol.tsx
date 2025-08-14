'use client'

import * as React from "react"
import { useEffect } from "react";
import { useGetRoles } from "@/app/services/api/getRoles";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface SelectRolesProps {
  value: number;
  setForm: (fn: (prev: any) => any) => void;
}

export function SelectRoles({ value, setForm }: SelectRolesProps) {
  const { roles, fetchRoles } = useGetRoles();

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <Select
      value={String(value)}
      onValueChange={val => setForm(prev => ({ ...prev, role_id: Number(val) }))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecciona un rol" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          {Array.isArray(roles) && roles.length > 0 ? (
            roles.map((rol: any) => (
              <SelectItem key={rol.id} value={String(rol.id)}>
                {rol.rol_name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="none" disabled>No hay roles</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}


