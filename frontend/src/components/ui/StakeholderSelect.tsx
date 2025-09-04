
import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Stakeholder, StakeholderType } from '@/types/auth';

interface StakeholderSelectProps {
  selected: StakeholderType | null;
  onChange: (type: StakeholderType) => void;
}

const stakeholders: Stakeholder[] = [
  {
    id: '1',
    type: 'student',
    name: 'Student',
    description: 'Individual learner seeking to build cybersecurity skills',
    icon: '👨‍🎓',
  },
  {
    id: '2',
    type: 'educator',
    name: 'Educator',
    description: 'Teachers and institutions providing cybersecurity education',
    icon: '👩‍🏫',
  },
  {
    id: '3',
    type: 'company',
    name: 'Company',
    description: 'Organizations training employees in cybersecurity practices',
    icon: '🏢',
  },
  {
    id: '4',
    type: 'group',
    name: 'Learning Group',
    description: 'Teams and study groups learning together',
    icon: '👥',
  },
];

const StakeholderSelect = ({ selected, onChange }: StakeholderSelectProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {stakeholders.map((stakeholder) => (
        <StakeholderCard
          key={stakeholder.id}
          stakeholder={stakeholder}
          isSelected={selected === stakeholder.type}
          onClick={() => onChange(stakeholder.type)}
        />
      ))}
    </div>
  );
};

interface StakeholderCardProps {
  stakeholder: Stakeholder;
  isSelected: boolean;
  onClick: () => void;
}

const StakeholderCard = ({ stakeholder, isSelected, onClick }: StakeholderCardProps) => {
  return (
    <div
      className={cn(
        'relative p-4 rounded-lg border cursor-pointer transition-all duration-200',
        isSelected
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-border hover:border-primary/50 hover:bg-muted/50'
      )}
      onClick={onClick}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
          <Check className="h-3.5 w-3.5" />
        </div>
      )}
      <div className="flex items-start space-x-3">
        <div className="text-xl">{stakeholder.icon}</div>
        <div>
          <h3 className={cn('font-medium', isSelected ? 'text-primary' : 'text-foreground')}>
            {stakeholder.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {stakeholder.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StakeholderSelect;
