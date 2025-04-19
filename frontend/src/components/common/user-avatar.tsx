import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "parent" | "teacher" | "admin";
  avatar?: string;
}

interface UserAvatarProps {
  user: User | null;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, className = '' }) => {
  if (!user) {
    return (
      <Avatar className={className}>
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
    );
  }

  // Get initials from the user's name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get avatar color based on user role
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-green-100 text-green-800';
      case 'parent':
        return 'bg-blue-100 text-blue-800';
      case 'teacher':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Avatar className={className}>
      {user.avatar ? (
        <AvatarImage src={user.avatar} alt={user.name} />
      ) : null}
      <AvatarFallback className={getRoleColor(user.role)}>
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
};