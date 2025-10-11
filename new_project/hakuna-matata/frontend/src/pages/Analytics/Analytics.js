import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [stressData, setStressData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const navigate = useNavigate();

  // Mock data generation
  useEffect(() => {
    generateMockData();
  }, [timeRange]);

  const generateMockData = () => {
    // Stress data for different time ranges
    const stressDataMap = {
      week: [65, 72, 58, 81, 45, 52, 61],
      month: [65, 70, 68, 72, 65, 60, 58, 55, 62, 68, 72, 75, 70, 65, 60, 58, 55, 62, 65, 68, 72, 70, 65, 62, 60, 58, 55, 52, 50, 48],
      year: [72, 68, 65, 62, 58, 55, 52, 50, 55, 60, 65, 62]
    };

    // Mood distribution data
    const moodDataMap = {
      week: [3, 2, 1, 1, 0], // Happy, Neutral, Anxious, Sad, Angry
      month: [15, 8, 4, 2, 1],
      year: [180, 90, 45, 30, 15]
    };

    // Activity effectiveness data
    const activityDataMap = {
      week: [85, 70, 60, 75, 50], // Breathing, Music, Yoga, Diary, Games
      month: [82, 72, 65, 78, 55],
      year: [80, 70, 68, 76, 58]
    };

    setStressData(stressDataMap[timeRange] || stressDataMap.week);
    setMoodData(moodDataMap[timeRange] || moodDataMap.week);
    setActivityData(activityDataMap[timeRange] || activityDataMap.week);
  };

  // Chart configurations
  const stressChartConfig = {
    labels: timeRange === 'week' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : timeRange === 'month'
      ? Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Stress Level',
        data: stressData,
        borderColor: 'rgb(79, 138, 139)',
        backgroundColor: 'rgba(79, 138, 139, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(79, 138, 139)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      }
    ]
  };

  const moodChartConfig = {
    labels: ['Happy 😊', 'Neutral 😐', 'Anxious 😟', 'Sad 😢', 'Angry 😠'],
    datasets: [
      {
        data: moodData,
        backgroundColor: [
          'rgba(107, 197, 182, 0.8)',
          'rgba(156, 163, 175, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgb(107, 197, 182)',
          'rgb(156, 163, 175)',
          'rgb(245, 158, 11)',
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 2,
        hoverOffset: 15
      }
    ]
  };

  const activityChartConfig = {
    labels: ['Breathing', 'Music', 'Yoga', 'Diary', 'Games'],
    datasets: [
      {
        label: 'Effectiveness (%)',
        data: activityData,
        backgroundColor: 'rgba(255, 154, 118, 0.8)',
        borderColor: 'rgb(255, 154, 118)',
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stress Level Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Stress Level (0-100)'
        }
      }
    }
  };

  const moodChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  const activityChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Effectiveness (%)'
        }
      }
    }
  };

  // Calculate insights
  const averageStress = stressData.length > 0 
    ? Math.round(stressData.reduce((a, b) => a + b, 0) / stressData.length) 
    : 0;

  const maxStress = Math.max(...stressData);
  const minStress = Math.min(...stressData);
  const stressTrend = stressData[0] - stressData[stressData.length - 1];

  const getStressInsight = () => {
    if (averageStress < 50) return "You're managing stress excellently!";
    if (averageStress < 70) return "Good stress management. Keep it up!";
    return "Consider incorporating more relaxation techniques.";
  };

  const getTrendInsight = () => {
    if (stressTrend > 10) return "Significant improvement in stress levels!";
    if (stressTrend > 0) return "Stress levels are improving.";
    if (stressTrend === 0) return "Stress levels are stable.";
    return "Stress levels have increased recently.";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Deep insights into your stress patterns and progress</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Time Period</h2>
            <div className="flex space-x-2">
              {['week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize ${
                    timeRange === range
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Stress</p>
                <p className="text-2xl font-bold text-gray-900">{averageStress}/100</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                <span className="text-2xl">📉</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lowest Stress</p>
                <p className="text-2xl font-bold text-gray-900">{minStress}/100</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
                <span className="text-2xl">📈</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Highest Stress</p>
                <p className="text-2xl font-bold text-gray-900">{maxStress}/100</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Trend</p>
                <p className={`text-2xl font-bold ${
                  stressTrend > 0 ? 'text-green-600' : stressTrend < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stressTrend > 0 ? `+${stressTrend}` : stressTrend}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Stress Trend Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Stress Level Trends</h3>
            <div className="h-80">
              <Line data={stressChartConfig} options={chartOptions} />
            </div>
          </div>

          {/* Mood Distribution Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Mood Distribution</h3>
            <div className="h-80">
              <Doughnut data={moodChartConfig} options={moodChartOptions} />
            </div>
          </div>

          {/* Activity Effectiveness Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Activity Effectiveness</h3>
            <div className="h-80">
              <Bar data={activityChartConfig} options={activityChartOptions} />
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Insights */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="text-xl mr-2">💡</span>
              Key Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Overall Stress Management</h4>
                <p className="text-blue-700">{getStressInsight()}</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Progress Trend</h4>
                <p className="text-green-700">{getTrendInsight()}</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Best Performing Activity</h4>
                <p className="text-purple-700">
                  Breathing exercises are your most effective stress relief method at {Math.max(...activityData)}% effectiveness.
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="text-xl mr-2">🎯</span>
              Personalized Recommendations
            </h3>
            <div className="space-y-3">
              {averageStress >= 70 && (
                <div className="flex items-start p-3 bg-red-50 rounded-lg">
                  <span className="text-red-500 mr-3">⚠️</span>
                  <div>
                    <p className="font-medium text-red-800">High Stress Alert</p>
                    <p className="text-red-700 text-sm">Consider scheduling daily breathing exercises and mindfulness sessions.</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start p-3 bg-green-50 rounded-lg">
                <span className="text-green-500 mr-3">🧘</span>
                <div>
                  <p className="font-medium text-green-800">Optimal Routine</p>
                  <p className="text-green-700 text-sm">Continue with breathing exercises in the morning and diary writing in the evening.</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-500 mr-3">📝</span>
                <div>
                  <p className="font-medium text-blue-800">Consistency Boost</p>
                  <p className="text-blue-700 text-sm">You've used the diary {moodData[0]} times this period. Great for emotional awareness!</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-orange-50 rounded-lg">
                <span className="text-orange-500 mr-3">🎵</span>
                <div>
                  <p className="font-medium text-orange-800">Music Therapy</p>
                  <p className="text-orange-700 text-sm">Try listening to calming music during work breaks for better stress management.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Export Your Data</h3>
              <p className="text-gray-600">Download your analytics for personal records or sharing with professionals</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                Export as PDF
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                Export as CSV
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;