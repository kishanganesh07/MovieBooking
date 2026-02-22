import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import { motion } from "framer-motion";
import { BackendUrl } from "../../config";
import { DollarSign, Ticket, Users, Film, TrendingUp, Calendar, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${BackendUrl}/api/admin/stats`,
          {
            method: "GET",
            credentials: "include", 
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch admin stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError("Access denied or error loading data");
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400">{error}</p>
        </div>
    );
  }

  if (!stats) {
    return <Loading />;
  }

  const statCards = [
    { title: "Total Revenue", value: `₹${stats.totalRevenue}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+12.5%" },
    { title: "Total Bookings", value: stats.totalBookings, icon: Ticket, color: "text-primary", bg: "bg-primary/10", trend: "+8.3%" },
    { title: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+15.2%" },
    { title: "Total Movies", value: stats.totalMovies, icon: Film, color: "text-purple-500", bg: "bg-purple-500/10", trend: "+3 new" },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-500 mt-0.5 text-sm">Real-time platform metrics and activities.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-surface border border-white/10 rounded-lg text-xs font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-400">Live Status</span>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {statCards.map((card, index) => (
            <motion.div 
                key={index}
                variants={item}
                className="bg-dark-surface border border-white/5 p-5 rounded-2xl hover:border-white/10 transition-all duration-300"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${card.bg}`}>
                        <card.icon className={`w-5 h-5 ${card.color}`} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{card.title}</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-2xl font-bold text-white">{card.value}</h2>
                    <span className="text-[10px] font-medium text-green-500">{card.trend}</span>
                </div>
            </motion.div>
        ))}
      </motion.div>

      {/* Analytics Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-surface border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Revenue Growth
            </h3>
            <div className="h-48 flex items-end justify-between gap-2 px-1">
                {[40, 60, 45, 90, 65, 80, 55, 75, 50, 85, 95, 70].map((h, i) => (
                    <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.8, delay: i * 0.03 }}
                        className="flex-1 bg-primary/20 hover:bg-primary transition-colors rounded-t-sm min-w-[12px]"
                    />
                ))}
            </div>
            <div className="flex justify-between mt-4 text-[9px] font-bold text-gray-600 tracking-widest px-2">
                <span>JAN</span>
                <span>APR</span>
                <span>JUL</span>
                <span>OCT</span>
                <span>DEC</span>
            </div>
        </div>

        <div className="bg-dark-surface border border-white/5 rounded-2xl p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2.5 mt-2">
                {[
                    { label: "Bookings", icon: Ticket },
                    { label: "Schedules", icon: Calendar },
                    { label: "Users", icon: Users },
                ].map((action, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-3.5 bg-dark-bg/50 hover:bg-white/5 rounded-xl border border-white/5 group transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                                <action.icon className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                            </div>
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white">{action.label}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
