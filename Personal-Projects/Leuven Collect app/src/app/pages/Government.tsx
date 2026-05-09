import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useReports } from "../contexts/ReportsContext";
import { Trash2, AlertTriangle, CheckCircle, MapPin, ArrowLeft, Calendar, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";

interface Report {
  id: string | number;
  location: string;
  address: string;
  wasteType: string[];
  wasteLevel: string;
  isSafe: boolean;
  timestamp: string;
  status: "pending" | "assigned" | "completed";
  imageUrl?: string;
  escalated?: boolean;
  userId?: string;
  userName?: string;
  pointsAwarded?: number;
}

export function Government() {
  const { user, logout, isLoading } = useAuth();
  const { reports: allReports, updateReportStatus } = useReports();
  const [mockReports, setMockReports] = useState<Report[]>([
    {
      id: 1,
      location: "50.8798, 4.7005",
      address: "Bondgenotenlaan 34, 3000 Leuven",
      wasteType: ["Plastic bottles", "Food packaging"],
      wasteLevel: "High",
      isSafe: true,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      status: "pending",
      escalated: true,
    },
    {
      id: 2,
      location: "50.8792, 4.7012",
      address: "Oude Markt 12, 3000 Leuven",
      wasteType: ["Hazardous materials", "Broken glass"],
      wasteLevel: "Medium",
      isSafe: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      status: "pending",
    },
    {
      id: 3,
      location: "50.8804, 4.6998",
      address: "Naamsestraat 56, 3000 Leuven",
      wasteType: ["Paper waste"],
      wasteLevel: "Low",
      isSafe: true,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      status: "assigned",
    },
    {
      id: 4,
      location: "50.8785, 4.7025",
      address: "Tiensestraat 89, 3000 Leuven",
      wasteType: ["Construction debris"],
      wasteLevel: "High",
      isSafe: false,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      status: "pending",
    },
    {
      id: 5,
      location: "50.8810, 4.7001",
      address: "Parijsstraat 23, 3000 Leuven",
      wasteType: ["Plastic bags", "Cardboard"],
      wasteLevel: "Medium",
      isSafe: true,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      status: "completed",
    },
  ]);

  // Combine real reports with mock reports
  const reports = [...allReports, ...mockReports];

  // Auto-escalate tasks that haven't been claimed within 3 hours
  useEffect(() => {
    const interval = setInterval(() => {
      setMockReports(prevReports =>
        prevReports.map(report => {
          if (report.isSafe && report.status === "pending" && !report.escalated) {
            const hoursSinceReport = (Date.now() - new Date(report.timestamp).getTime()) / (1000 * 60 * 60);
            if (hoursSinceReport >= 3) {
              return { ...report, escalated: true };
            }
          }
          return report;
        })
      );
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleAssign = (reportId: string | number) => {
    const reportIdStr = typeof reportId === 'number' ? reportId : reportId;

    // Check if it's a real report (string ID)
    if (typeof reportId === 'string') {
      updateReportStatus(reportId, "assigned");
    } else {
      // It's a mock report (number ID)
      setMockReports(mockReports.map(r =>
        r.id === reportId ? { ...r, status: "assigned" as const } : r
      ));
    }
  };

  const handleComplete = (reportId: string | number) => {
    // Check if it's a real report (string ID)
    if (typeof reportId === 'string') {
      updateReportStatus(reportId, "completed");
      alert("Report marked complete! User has been awarded 1 point.");
    } else {
      // It's a mock report (number ID)
      setMockReports(mockReports.map(r =>
        r.id === reportId ? { ...r, status: "completed" as const } : r
      ));
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getHoursSince = (timestamp: string) => {
    const hours = (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60);
    return Math.floor(hours);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "assigned":
        return <Badge className="bg-blue-600">Assigned</Badge>;
      case "completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      default:
        return null;
    }
  };

  const pendingReports = reports.filter(r => r.status === "pending");
  const assignedReports = reports.filter(r => r.status === "assigned");
  const completedReports = reports.filter(r => r.status === "completed");
  const urgentReports = reports.filter(r => (!r.isSafe || r.escalated) && r.status === "pending");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <Trash2 className="mx-auto mb-4 text-gray-900" size={48} />
          <h2 className="text-2xl font-bold mb-2">Government Access</h2>
          <p className="text-gray-600 mb-6">Please log in with government credentials</p>
          <Button onClick={() => window.location.href = "/login"} className="bg-gray-900 hover:bg-gray-800">
            Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => window.location.href = "/"}>
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <Trash2 className="text-gray-900" size={32} />
              <h1 className="font-bold text-2xl text-gray-900">Government Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={20} className="mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Reports</p>
            <p className="text-3xl font-bold text-gray-900">{reports.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-3xl font-bold text-orange-600">{pendingReports.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Urgent / Escalated</p>
            <p className="text-3xl font-bold text-red-600">{urgentReports.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-3xl font-bold text-green-600">{completedReports.length}</p>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Reports ({reports.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingReports.length})</TabsTrigger>
            <TabsTrigger value="urgent">Urgent ({urgentReports.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {reports.map(report => (
              <Card key={report.id} className={`p-4 ${!report.isSafe || report.escalated ? "border-red-200 bg-red-50" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Trash2 className="text-gray-400" size={32} />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-lg">Report #{report.id}</h3>
                          {getStatusBadge(report.status)}
                          {!report.isSafe && (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle size={12} />
                              Hazardous
                            </Badge>
                          )}
                          {report.escalated && (
                            <Badge className="bg-orange-600 gap-1">
                              <AlertTriangle size={12} />
                              Escalated ({getHoursSince(report.timestamp)}h unclaimed)
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin size={16} className="mt-0.5" />
                          <span>{report.address}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(report.timestamp)}</p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Waste Type</p>
                        <p className="font-medium">{report.wasteType.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Waste Level</p>
                        <p className={`font-medium ${
                          report.wasteLevel === "High" ? "text-red-600" :
                          report.wasteLevel === "Medium" ? "text-orange-600" :
                          "text-green-600"
                        }`}>{report.wasteLevel}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Assignment</p>
                        <p className="font-medium">
                          {report.isSafe && !report.escalated ? "Available for volunteers" : "Government required"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {report.status === "pending" && (
                        <Button onClick={() => handleAssign(report.id)} size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Assign to Team
                        </Button>
                      )}
                      {report.status === "assigned" && (
                        <Button onClick={() => handleComplete(report.id)} size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle size={16} className="mr-1" />
                          Mark Complete
                        </Button>
                      )}
                      {report.status === "completed" && (
                        <Badge className="bg-green-600">
                          <CheckCircle size={14} className="mr-1" />
                          Cleaned
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingReports.map(report => (
              <Card key={report.id} className={`p-4 ${!report.isSafe || report.escalated ? "border-red-200 bg-red-50" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Trash2 className="text-gray-400" size={32} />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-lg">Report #{report.id}</h3>
                          {!report.isSafe && (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle size={12} />
                              Hazardous
                            </Badge>
                          )}
                          {report.escalated && (
                            <Badge className="bg-orange-600 gap-1">
                              <AlertTriangle size={12} />
                              Escalated
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin size={16} className="mt-0.5" />
                          <span>{report.address}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(report.timestamp)}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Waste Type</p>
                        <p className="font-medium">{report.wasteType.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Waste Level</p>
                        <p className={`font-medium ${
                          report.wasteLevel === "High" ? "text-red-600" :
                          report.wasteLevel === "Medium" ? "text-orange-600" :
                          "text-green-600"
                        }`}>{report.wasteLevel}</p>
                      </div>
                    </div>

                    <Button onClick={() => handleAssign(report.id)} size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Assign to Team
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="urgent" className="space-y-4">
            {urgentReports.length > 0 ? (
              urgentReports.map(report => (
                <Card key={report.id} className="p-4 border-red-200 bg-red-50">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="text-red-600" size={32} />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-lg">Report #{report.id}</h3>
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle size={12} />
                              {report.escalated ? `Escalated (${getHoursSince(report.timestamp)}h unclaimed)` : "Hazardous"}
                            </Badge>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <MapPin size={16} className="mt-0.5" />
                            <span>{report.address}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{formatDate(report.timestamp)}</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Waste Type</p>
                          <p className="font-medium text-red-900">{report.wasteType.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Waste Level</p>
                          <p className="font-medium text-red-600">{report.wasteLevel}</p>
                        </div>
                      </div>

                      {report.escalated && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded">
                          This task was available for volunteers but wasn't claimed within 3 hours and has been escalated to government handling.
                        </p>
                      )}

                      <Button onClick={() => handleAssign(report.id)} size="sm" className="bg-red-600 hover:bg-red-700">
                        Assign Priority Team
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <CheckCircle className="mx-auto mb-2 text-green-600" size={48} />
                <p className="text-gray-600">No urgent reports at the moment</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
