
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
import { Trophy, Clock, Award, Medal } from 'lucide-react';
import { LeaderboardEntry } from '@/types/lab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { fetchGlobalLeaderboard } from '@/services/api';

interface GlobalLeaderboardProps {
  className?: string;
}

const GlobalLeaderboard: React.FC<GlobalLeaderboardProps> = ({ className }) => {
  // const { data: leaderboardData, isLoading } = useQuery({
  //   queryKey: ['global-leaderboard'],
  //   queryFn: fetchGlobalLeaderboard,
  // });
  const leaderboardData: LeaderboardEntry[] = [
    {
      userId: "user1",
      username: "Alice Cooper",
      completionTime: 720000, // 12 minutes in ms
      score: 95,
      date: new Date(Date.now() - 86400000 * 2) // 2 days ago
    },
    {
      userId: "user2",
      username: "Bob Smith",
      completionTime: 840000, // 14 minutes in ms
      score: 90,
      date: new Date(Date.now() - 86400000 * 3) // 3 days ago
    },
    {
      userId: "user3",
      username: "Charlie Davis",
      completionTime: 900000, // 15 minutes in ms
      score: 88,
      date: new Date(Date.now() - 86400000 * 1) // 1 day ago
    },
    {
      userId: "user4",
      username: "Diana Evans",
      completionTime: 1020000, // 17 minutes in ms
      score: 82,
      date: new Date(Date.now() - 86400000 * 4) // 4 days ago
    },
    {
      userId: "user5",
      username: "Ethan Williams",
      completionTime: 780000, // 13 minutes in ms
      score: 80,
      date: new Date(Date.now() - 86400000 * 5) // 5 days ago
    }
  ];


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

  // if (isLoading) {
  //   return (
  //     <Card className={className}>
  //       <CardHeader>
  //         <CardTitle className="flex items-center">
  //           <Trophy className="mr-2 h-5 w-5" />
  //           Global Leaderboard
  //         </CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="flex justify-center items-center h-48">
  //           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  if (!leaderboardData || leaderboardData.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5" />
            Global Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-center h-48 text-center">
            <Award className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No entries yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Complete labs to appear on the leaderboard!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group entries by top scores and fastest times
  const topScorers = [...leaderboardData].sort((a, b) => b.score - a.score).slice(0, 10);
  const fastestCompletions = [...leaderboardData].sort((a, b) => a.completionTime - b.completionTime).slice(0, 10);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5" />
          Global Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scores">
          <TabsList className="mb-4">
            <TabsTrigger value="scores">Top Scores</TabsTrigger>
            <TabsTrigger value="times">Fastest Times</TabsTrigger>
          </TabsList>

          <TabsContent value="scores">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Lab</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topScorers.map((entry, index) => (
                  <TableRow key={`score-${entry._id || index}`}>
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
                    <TableCell className="text-sm">{entry.labTitle}</TableCell>
                    <TableCell className="font-medium">{entry.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="times">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Lab</TableHead>
                  <TableHead className="text-right">
                    <span className="flex items-center justify-end">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      Time
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fastestCompletions.map((entry, index) => (
                  <TableRow key={`time-${entry._id || index}`}>
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
                    <TableCell className="text-sm">{entry.labTitle}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatTime(entry.completionTime)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GlobalLeaderboard;
