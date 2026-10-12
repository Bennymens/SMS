import React from 'react';
import { Badge } from '@/components/ui/badge';
import { StudentStatus } from '@school-management/shared/types/student';

interface StudentStatusBadgeProps {
  status: StudentStatus;
}

export const StudentStatusBadge: React.FC<StudentStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'ACTIVE':
      return <Badge variant="success">Active</Badge>;
    case 'GRADUATED':
      return <Badge variant="secondary">Graduated</Badge>;
    case 'TRANSFERRED':
      return <Badge variant="outline">Transferred</Badge>;
    case 'SUSPENDED':
      return <Badge variant="warning">Suspended</Badge>;
    case 'EXPELLED':
      return <Badge variant="danger">Expelled</Badge>;
    case 'INACTIVE':
    default:
      return <Badge variant="destructive">Inactive</Badge>;
  }
};
