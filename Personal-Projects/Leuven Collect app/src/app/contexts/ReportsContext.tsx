import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Report {
  id: string;
  userId: string;
  userName: string;
  location: string;
  address: string;
  wasteType: string[];
  wasteLevel: string;
  isSafe: boolean;
  timestamp: string;
  status: "pending" | "assigned" | "completed";
  imageUrl?: string;
  pointsAwarded: number;
}

interface ReportsContextType {
  reports: Report[];
  addReport: (report: Omit<Report, "id" | "status" | "pointsAwarded">) => void;
  updateReportStatus: (reportId: string, status: "pending" | "assigned" | "completed") => void;
  getUserReports: (userId: string) => Report[];
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>([]);

  // Load reports from localStorage on mount
  useEffect(() => {
    const storedReports = localStorage.getItem("reports");
    if (storedReports) {
      try {
        setReports(JSON.parse(storedReports));
      } catch (error) {
        console.error("Failed to parse stored reports", error);
      }
    }
  }, []);

  // Save reports to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  const addReport = (report: Omit<Report, "id" | "status" | "pointsAwarded">) => {
    const newReport: Report = {
      ...report,
      id: Math.random().toString(36).substr(2, 9),
      status: "pending",
      pointsAwarded: 0,
    };

    setReports(prev => [...prev, newReport]);
  };

  const updateReportStatus = (reportId: string, status: "pending" | "assigned" | "completed") => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId
          ? {
              ...report,
              status,
              pointsAwarded: status === "completed" ? 1 : report.pointsAwarded,
            }
          : report
      )
    );
  };

  const getUserReports = (userId: string) => {
    return reports.filter(report => report.userId === userId);
  };

  return (
    <ReportsContext.Provider value={{ reports, addReport, updateReportStatus, getUserReports }}>
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error("useReports must be used within a ReportsProvider");
  }
  return context;
}
