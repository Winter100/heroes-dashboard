'use client';

import type { ReactNode } from 'react';

import { useAuthStore, type User } from '@/store/useAuthStore';

export type UserRole = User['role'];

export const ADMIN_ROLES = ['ADMIN'] as const satisfies readonly UserRole[];

type RoleGateProps = {
  allowedRoles: readonly UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
};

export const RoleGate = ({
  allowedRoles,
  children,
  fallback = null,
}: RoleGateProps) => {
  const role = useAuthStore((state) => state.user?.role);

  if (!role || !allowedRoles.includes(role)) {
    return fallback;
  }

  return children;
};
