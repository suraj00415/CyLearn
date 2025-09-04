
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Clock, Award } from 'lucide-react';
import { LeaderboardEntry } from '@/types/lab';

interface LeaderboardProps {
  entries?: LeaderboardEntry[];
  isLoading?: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries = [], isLoading = false }) => {
  // Sort entries by score (highest first) and then by completion time (fastest first)
  const sortedEntries = [...entries].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.completionTime - b.completionTime;
  });

  // Format time (milliseconds to mm:ss)
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Get initials from username
  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get trophy color based on position
  const getTrophyColor = (position: number) => {
    switch (position) {
      case 0: return "text-yellow-500";
      case 1: return "text-gray-400";
      case 2: return "text-amber-600";
      default: return "text-muted-foreground";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (sortedEntries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-center h-48 text-center">
            <Award className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No entries yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Complete this lab to be the first on the leaderboard!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Score</TableHead>
              <TableHead className="text-right">
                <span className="flex items-center justify-end">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  Time
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEntries.map((entry, index) => (
              <TableRow key={entry._id || index}>
                <TableCell className="font-medium">
                  {index < 3 ? (
                    <Trophy className={`h-4 w-4 ${getTrophyColor(index)}`} />
                  ) : (
                    index + 1
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">
                        {getInitials(entry.username)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{entry.username}</span>
                  </div>
                </TableCell>
                <TableCell>{entry.score}</TableCell>
                <TableCell className="text-right font-mono">
                  {formatTime(entry.completionTime)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
