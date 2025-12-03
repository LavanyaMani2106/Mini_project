import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStress } from '../../contexts/StressContext';
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
  const navigate = useNavigate();
  const { sessionHistory, historicalData } = useStress();
  const [timeRange, setTimeRange] = useState('week');
  const [chartData, setChartData] = useState({ stress: [], moods: [0, 0, 0, 0, 0] });

  useEffect(() => {
    const now = Date.now();
    const DAY = 86400000;
    const allSessions = [...(sessionHistory || []), ...(historicalData || [])];
    
    const filtered = allSessions.filter(s => {
      const t = s.id || Date.parse(s.timestamp) || now;
      const days = (now - t) / DAY;
      return timeRange === 'week' ? days <= 7 : timeRange === 'month' ? days <= 30 : days <= 365;
    });

    const points = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 12;
    const unit = timeRange === 'year' ? 30 * DAY : DAY;
    const stress = [];
    
    for (let i = 0; i < points; i++) {
      const end = now - i * unit;
      const start = end - unit;
      const period = filtered.filter(s => {
        const t = s.id || Date.parse(s.timestamp) || now;
        return t >= start && t < end && s.stressLevel != null;
      });
      stress.unshift(period.length > 0 ? Math.round(period.reduce((sum, s) => sum + Number(s.stressLevel), 0) / period.length) : null);
    }

    const moods = [0, 0, 0, 0, 0];
    filtered.forEach(s => {
      const l = Number(s.stressLevel);
      if (!isNaN(l)) {
        if (l < 30) moods[0]++;
        else if (l < 50) moods[1]++;
        else if (l < 70) moods[2]++;
        else if (l < 85) moods[3]++;
        else moods[4]++;
      }
    });

    setChartData({ 
      stress: stress.filter(v => v !== null).length > 0 ? stress : [65, 72, 58, 81, 45, 52, 61], 
      moods: moods.reduce((a, b) => a + b) > 0 ? moods : [3, 2, 1, 1, 0] 
    });
  }, [timeRange, sessionHistory, historicalData]);

  const stressConfig = {
    labels: timeRange === 'week' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] :
            timeRange === 'month' ? Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`) :
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Stress Level',
      data: chartData.stress,
      borderColor: 'rgb(79, 138, 139)',
      backgroundColor: 'rgba(79, 138, 139, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(79, 138, 139)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5
    }]
  };

  const moodConfig = {
    labels: ['Happy 😊', 'Neutral 😐', 'Anxious 😟', 'Sad 😢', 'Angry 😠'],
    datasets: [{
      data: chartData.moods,
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
    }]
  };

  const activityConfig = {
    labels: ['Breathing', 'Music', 'Yoga', 'Diary', 'Games'],
    datasets: [{
      label: 'Effectiveness (%)',
      data: [85, 70, 60, 75, 50],
      backgroundColor: 'rgba(255, 154, 118, 0.8)',
      borderColor: 'rgb(255, 154, 118)',
      borderWidth: 2,
      borderRadius: 8
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Stress Level Trends' }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Stress Level (0-100)' }
      }
    }
  };

  const moodOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  const activityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Effectiveness (%)' }
      }
    }
  };

  const validStress = chartData.stress.filter(v => v !== null);
  const avg = validStress.length > 0 ? Math.round(validStress.reduce((a, b) => a + b, 0) / validStress.length) : 0;
  const max = validStress.length > 0 ? Math.max(...validStress) : 0;
  const min = validStress.length > 0 ? Math.min(...validStress) : 0;
  const trend = validStress.length > 1 ? validStress[0] - validStress[validStress.length - 1] : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Deep insights into your stress patterns and progress</p>
          </div>
          <button onClick={() => navigate('/dashboard')} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Time Period</h2>
            <div className="flex space-x-2">
              {['week', 'month', 'year'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize ${
                    timeRange === range ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Stress</p>
                <p className="text-2xl font-bold text-gray-900">{avg}/100</p>
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
                <p className="text-2xl font-bold text-gray-900">{min}/100</p>
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
                <p className="text-2xl font-bold text-gray-900">{max}/100</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
                <span className="text-2xl">{trend > 0 ? '📉' : trend < 0 ? '📈' : '➡️'}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Trend</p>
                <p className="text-2xl font-bold text-gray-900">{trend > 0 ? 'Improving' : trend < 0 ? 'Increasing' : 'Stable'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Stress Trends</h3>
            <div className="h-80">
              <Line data={stressConfig} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Mood Distribution</h3>
            <div className="h-80">
              <Doughnut data={moodConfig} options={moodOptions} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Activity Effectiveness</h3>
          <div className="h-80">
            <Bar data={activityConfig} options={activityOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">
                  {avg < 50 ? "You're managing stress excellently!" : avg < 70 ? "Good stress management. Keep it up!" : "Consider incorporating more relaxation techniques."}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900">
                  {trend > 10 ? "Significant improvement in stress levels!" : trend > 0 ? "Stress levels are improving." : trend === 0 ? "Stress levels are stable." : "Stress levels have increased recently."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Try breathing exercises when stress levels are high</p>
              </div>
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Regular stress monitoring helps identify patterns</p>
              </div>
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Maintain consistent sleep and exercise routines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;