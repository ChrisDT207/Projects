import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useReports } from "../contexts/ReportsContext";
import { Camera, Video, MapPin, Trash2, CheckCircle, LogOut, TrendingUp, DollarSign, Clock, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useNavigate } from "react-router";

export function Home() {
  const { user, logout, addPhotoReported, redeemPoints, addPoints } = useAuth();
  const { addReport, getUserReports } = useReports();
  const navigate = useNavigate();
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [mediaType, setMediaType] = useState<"photo" | "video">("photo");
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const [userReports, setUserReports] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Update user reports and points when reports change
  useEffect(() => {
    if (user) {
      const reports = getUserReports(user.id);
      setUserReports(reports);

      // Award points for newly completed reports
      const completedReports = reports.filter(r => r.status === "completed" && r.pointsAwarded > 0);
      const totalPoints = completedReports.reduce((sum, r) => sum + r.pointsAwarded, 0);

      // Update user points if needed (this syncs with completed reports)
      if (totalPoints > 0 && user.points !== totalPoints) {
        addPoints(totalPoints - user.points);
      }
    }
  }, [user, getUserReports]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCapture = (type: "photo" | "video") => {
    setMediaType(type);
    if (type === "photo") {
      fileInputRef.current?.click();
    } else {
      videoInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCapturedMedia(url);
      analyzeMedia(file);
    }
  };

  const analyzeMedia = async (file: File) => {
    setIsAnalyzing(true);

    // Mock AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockLocation = {
      lat: 50.8798,
      lng: 4.7005,
      address: "Bondgenotenlaan, 3000 Leuven"
    };

    const result = {
      wasteType: ["Plastic bottles", "Food packaging"],
      wasteLevel: Math.random() > 0.5 ? "Medium" : "High",
      isSafe: Math.random() > 0.3,
      location: mockLocation,
      timestamp: new Date().toISOString(),
      estimatedVolume: `${Math.floor(Math.random() * 50 + 10)} liters`
    };

    setAnalysisResult(result);
    setIsAnalyzing(false);

    // Add photo to user's count
    addPhotoReported();

    setTimeout(() => {
      alert("Photo submitted! +1 point earned");
    }, 500);
  };

  const reset = () => {
    setCapturedMedia(null);
    setAnalysisResult(null);
  };

  const handleRedeem = (amount: number) => {
    const success = redeemPoints(amount);
    if (success) {
      alert(`Successfully redeemed ${amount} points for €${(amount / 50).toFixed(2)}!`);
      setShowRedeemDialog(false);
    } else {
      alert("Not enough points!");
    }
  };

  const euroValue = user ? (user.points / 50).toFixed(2) : "0.00";
  const pendingReports = userReports.filter(r => r.status === "pending" || r.status === "assigned");
  const completedReports = userReports.filter(r => r.status === "completed");

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trash2 className="text-green-600" size={32} />
              <h1 className="font-bold text-2xl text-gray-900">Leuven Collect</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/leaderboard")}>
                <TrendingUp size={16} className="mr-1" />
                Leaderboard
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={16} className="mr-1" />
                Logout
              </Button>
            </div>
          </div>

          {/* Points Tracker */}
          <div className="grid grid-cols-2 gap-2">
            <Card className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Earned Points</p>
                  <p className="text-2xl font-bold text-blue-900">{user?.points || 0}</p>
                  <p className="text-xs text-gray-500">{completedReports.length} completed</p>
                </div>
                <div className="bg-blue-200 rounded-full p-2">
                  <Check className="text-blue-700" size={24} />
                </div>
              </div>
            </Card>

            <Card className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Pending Points</p>
                  <p className="text-2xl font-bold text-yellow-900">{pendingReports.length}</p>
                  <p className="text-xs text-gray-500">awaiting completion</p>
                </div>
                <div className="bg-yellow-200 rounded-full p-2">
                  <Clock className="text-yellow-700" size={24} />
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-3 mt-2 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-900">€{euroValue}</p>
              </div>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setShowRedeemDialog(true)}
              >
                Redeem Points
              </Button>
            </div>
          </Card>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="report" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="report">Report Trash</TabsTrigger>
            <TabsTrigger value="myreports">My Reports ({userReports.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="report" className="flex items-center justify-center min-h-[400px]">
        {!capturedMedia ? (
          <div className="text-center space-y-6 w-full">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">Report Trash</h2>
              <p className="text-gray-600">Snap a photo and earn 1 point (50 points = €1)</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white gap-2"
                onClick={() => handleCapture("photo")}
              >
                <Camera size={24} />
                Take Photo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto gap-2"
                onClick={() => handleCapture("video")}
              >
                <Video size={24} />
                Record Video
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-6 w-full py-8">
            <Card className="p-4">
              {mediaType === "photo" ? (
                <img src={capturedMedia} alt="Captured" className="w-full rounded-lg" />
              ) : (
                <video src={capturedMedia} controls className="w-full rounded-lg" />
              )}
            </Card>

            {isAnalyzing ? (
              <Card className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing waste...</p>
              </Card>
            ) : analysisResult ? (
              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl">Analysis Complete</h3>
                  <CheckCircle className="text-green-600" size={32} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Waste Type</p>
                    <p className="font-semibold">{analysisResult.wasteType.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Waste Level</p>
                    <p className="font-semibold">{analysisResult.wasteLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Safety Status</p>
                    <p className={`font-semibold ${analysisResult.isSafe ? "text-green-600" : "text-orange-600"}`}>
                      {analysisResult.isSafe ? "Safe for users" : "Requires government"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Volume</p>
                    <p className="font-semibold">{analysisResult.estimatedVolume}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t">
                  <MapPin className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-sm">{analysisResult.location.address}</p>
                  </div>
                </div>
              </Card>
            ) : null}

            <Button onClick={reset} variant="outline" className="w-full">
              Report Another
            </Button>
          </div>
        )}
          </TabsContent>

          <TabsContent value="myreports" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Pending Reports ({pendingReports.length})</h3>
              {pendingReports.length > 0 ? (
                pendingReports.map(report => (
                  <Card key={report.id} className="p-4 border-yellow-200 bg-yellow-50">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Trash2 className="text-gray-400" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">Report #{report.id.substring(0, 6)}</p>
                          <Badge variant="secondary" className="bg-yellow-600 text-white">
                            <Clock size={12} className="mr-1" />
                            Pending
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin size={14} />
                          {report.address}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {report.wasteType.join(", ")} • {new Date(report.timestamp).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-yellow-700 mt-2">
                          You'll earn 1 point when this is completed
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <Clock className="mx-auto mb-2 text-gray-400" size={48} />
                  <p className="text-gray-600">No pending reports</p>
                </Card>
              )}
            </div>

            <div className="space-y-3 mt-6">
              <h3 className="font-semibold text-lg">Completed Reports ({completedReports.length})</h3>
              {completedReports.length > 0 ? (
                completedReports.map(report => (
                  <Card key={report.id} className="p-4 border-green-200 bg-green-50">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <CheckCircle className="text-green-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">Report #{report.id.substring(0, 6)}</p>
                          <Badge className="bg-green-600">
                            <Check size={12} className="mr-1" />
                            Completed
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin size={14} />
                          {report.address}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {report.wasteType.join(", ")} • {new Date(report.timestamp).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-green-700 font-semibold mt-2">
                          +{report.pointsAwarded} point earned
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <Trash2 className="mx-auto mb-2 text-gray-400" size={48} />
                  <p className="text-gray-600">No completed reports yet</p>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Redeem Dialog */}
      <Dialog open={showRedeemDialog} onOpenChange={setShowRedeemDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redeem Points</DialogTitle>
            <DialogDescription>
              You have {user?.points || 0} points (€{euroValue})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">50 points = €1.00</p>
            <div className="space-y-2">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleRedeem(50)}
                disabled={(user?.points || 0) < 50}
              >
                Redeem 50 points for €1.00
              </Button>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleRedeem(250)}
                disabled={(user?.points || 0) < 250}
              >
                Redeem 250 points for €5.00
              </Button>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleRedeem(500)}
                disabled={(user?.points || 0) < 500}
              >
                Redeem 500 points for €10.00
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
