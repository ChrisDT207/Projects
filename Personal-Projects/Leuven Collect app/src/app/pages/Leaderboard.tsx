import { useAuth } from "../contexts/AuthContext";
import { Trash2, Trophy, ArrowLeft, Medal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router";

interface LeaderboardUser {
  rank: number;
  name: string;
  photosReported: number;
  points: number;
}

export function Leaderboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock leaderboard data
  const leaderboardUsers: LeaderboardUser[] = [
    { rank: 1, name: "Emma Johnson", photosReported: 342, points: 342 },
    { rank: 2, name: "Lucas Van Berg", photosReported: 287, points: 287 },
    { rank: 3, name: "Sophie Martinez", photosReported: 251, points: 251 },
    { rank: 4, name: "Noah Peeters", photosReported: 198, points: 198 },
    { rank: 5, name: "Mia Anderson", photosReported: 176, points: 176 },
    { rank: 6, name: user?.name || "You", photosReported: user?.photosReported || 0, points: user?.points || 0 },
    { rank: 7, name: "Oliver Chen", photosReported: 134, points: 134 },
    { rank: 8, name: "Ava Wilson", photosReported: 112, points: 112 },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={28} />;
    if (rank === 2) return <Medal className="text-gray-400" size={28} />;
    if (rank === 3) return <Medal className="text-orange-600" size={28} />;
    return <span className="text-xl font-bold text-gray-600">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/home")}>
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <Trophy className="text-purple-600" size={32} />
              <h1 className="font-bold text-2xl text-gray-900">Leaderboard</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Contributors</h2>
          <p className="text-gray-600">Users ranked by photos reported</p>
        </div>

        <div className="space-y-3">
          {leaderboardUsers.map((lbUser) => (
            <Card
              key={lbUser.rank}
              className={`p-4 ${
                lbUser.name === user?.name
                  ? "border-2 border-purple-400 bg-purple-50"
                  : lbUser.rank <= 3
                  ? "bg-gradient-to-r from-yellow-50 to-white"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 flex justify-center">
                  {getRankIcon(lbUser.rank)}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-900">
                    {lbUser.name}
                    {lbUser.name === user?.name && (
                      <span className="ml-2 text-sm text-purple-600">(You)</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">{lbUser.photosReported} photos reported</p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{lbUser.points}</p>
                  <p className="text-xs text-gray-500">points</p>
                  <p className="text-xs text-green-600">€{(lbUser.points / 50).toFixed(2)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200">
          <div className="text-center space-y-2">
            <Trash2 className="mx-auto text-purple-600" size={48} />
            <h3 className="font-bold text-xl text-gray-900">Keep Going!</h3>
            <p className="text-gray-600">
              Every photo you report helps keep Leuven cleaner and earns you rewards.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-2xl font-bold text-purple-600">{user?.photosReported || 0}</p>
                <p className="text-xs text-gray-600">Your Photos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{user?.points || 0}</p>
                <p className="text-xs text-gray-600">Your Points</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">€{((user?.points || 0) / 50).toFixed(2)}</p>
                <p className="text-xs text-gray-600">Your Value</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
