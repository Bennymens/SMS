import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StudentStats } from '@school-management/shared/types/student';
import { Users, UserCheck, UserMinus, UserPlus } from 'lucide-react';

interface StudentStatsCardsProps {
  stats: StudentStats;
}

export const StudentStatsCards: React.FC<StudentStatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Students',
      value: stats.total.toLocaleString(),
      description: 'Enrolled in database',
      icon: Users,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      title: 'Active Students',
      value: stats.active.toLocaleString(),
      description: `${Math.round((stats.active / (stats.total || 1)) * 100)}% active rate`,
      icon: UserCheck,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      title: 'Inactive / Suspended',
      value: stats.inactive.toLocaleString(),
      description: 'Require administrative review',
      icon: UserMinus,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      title: 'New Admissions',
      value: `+${stats.recentAdmissions.toLocaleString()}`,
      description: 'Admitted in last 30 days',
      icon: UserPlus,
      color: 'text-purple-500 bg-purple-500/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <Card key={i} className="relative overflow-hidden border border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {c.title}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight">{c.value}</p>
                </div>
                <div className={`rounded-xl p-3 ${c.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{c.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
