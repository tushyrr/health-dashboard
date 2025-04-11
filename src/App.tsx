import { useState } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function HealthDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Weight data
  const weightData = [
    { date: '2025-03-19', weight: 64.0 },
    { date: '2025-03-29', weight: 63.8 },
    { date: '2025-04-03', weight: 63.0 },
    { date: '2025-04-08', weight: 63.8 },
  ];

  // Calculate weight loss
  const weightLoss = weightData.length > 0 ? 
    weightData[0].weight - weightData[weightData.length - 1].weight : 0;

  // Process step data
  const stepData = [
    { date: '2025-03-12', steps: 3902 },
    { date: '2025-03-13', steps: 1255 },
    { date: '2025-03-14', steps: 610 },
    { date: '2025-03-15', steps: 631 },
    { date: '2025-03-16', steps: 131 },
    { date: '2025-03-17', steps: 1804 },
    { date: '2025-03-18', steps: 4870 },
    { date: '2025-03-19', steps: 2266 },
    { date: '2025-03-20', steps: 3434 },
    { date: '2025-04-08', steps: 621 },
    { date: '2025-04-09', steps: 780 },
    { date: '2025-04-10', steps: 1050 },
    { date: '2025-04-11', steps: 294 },
  ];

  // Process exercise data
  const exerciseData = [
    { date: '2025-04-08', name: 'Gym Workout', calories: 132, minutes: 20 },
  ];
  
  // Nutrition data (daily totals)
  const nutritionData = {};
  const dailyMacros = {};
  
  // All dates from data
  const allDates = [
    '2025-03-12', '2025-03-13', '2025-03-14', '2025-03-15', '2025-03-16', '2025-03-17', 
    '2025-03-18', '2025-03-19', '2025-03-20', '2025-03-21', '2025-03-22', '2025-03-23', 
    '2025-03-24', '2025-03-25', '2025-03-26', '2025-03-27', '2025-03-28', '2025-03-29', 
    '2025-03-31', '2025-04-01', '2025-04-02', '2025-04-03', '2025-04-04', '2025-04-05', 
    '2025-04-07', '2025-04-08', '2025-04-09', '2025-04-10', '2025-04-11'
  ];
  
  // Process nutrition data to daily totals
  const nutritionByDate = [
    { date: '2025-03-12', meal: "Dinner", calories: 714.2, fat: 26.2, carbs: 55.4, protein: 62.7 },
    { date: '2025-03-12', meal: "Snacks", calories: 164.0, fat: 0.8, carbs: 30.2, protein: 1.3 },
    { date: '2025-03-13', meal: "Breakfast", calories: 250.0, fat: 3.2, carbs: 55.6, protein: 6.2 },
    { date: '2025-03-13', meal: "Dinner", calories: 803.0, fat: 42.4, carbs: 85.0, protein: 37.7 },
    { date: '2025-03-14', meal: "Dinner", calories: 485.4, fat: 16.9, carbs: 35.6, protein: 44.8 },
    { date: '2025-03-14', meal: "Snacks", calories: 575.0, fat: 8.9, carbs: 116.3, protein: 17.1 },
    // More days would go here in a real implementation
    { date: '2025-04-08', meal: "Breakfast", calories: 385.0, fat: 20.4, carbs: 31.0, protein: 25.3 },
    { date: '2025-04-08', meal: "Dinner", calories: 260.0, fat: 8.0, carbs: 76.0, protein: 2.0 },
    { date: '2025-04-08', meal: "Lunch", calories: 179.6, fat: 4.7, carbs: 29.6, protein: 8.4 },
    { date: '2025-04-08', meal: "Snacks", calories: 70.0, fat: 1.2, carbs: 21.1, protein: 7.3 },
    { date: '2025-04-09', meal: "Breakfast", calories: 264.5, fat: 2.9, carbs: 55.5, protein: 7.1 },
    { date: '2025-04-09', meal: "Dinner", calories: 170.3, fat: 5.8, carbs: 13.5, protein: 2.9 },
    { date: '2025-04-09', meal: "Lunch", calories: 179.6, fat: 7.7, carbs: 26.5, protein: 4.1 },
    { date: '2025-04-09', meal: "Snacks", calories: 316.7, fat: 14.0, carbs: 29.2, protein: 4.5 },
    { date: '2025-04-10', meal: "Breakfast", calories: 458.8, fat: 18.2, carbs: 58.0, protein: 13.9 },
    { date: '2025-04-10', meal: "Dinner", calories: 350.0, fat: 7.5, carbs: 134.0, protein: 1.0 },
    { date: '2025-04-10', meal: "Lunch", calories: 233.4, fat: 10.4, carbs: 26.6, protein: 26.2 },
    { date: '2025-04-10', meal: "Snacks", calories: 235.0, fat: 13.5, carbs: 24.3, protein: 4.0 },
    { date: '2025-04-11', meal: "Breakfast", calories: 170.0, fat: 1.1, carbs: 41.6, protein: 2.7 },
  ];
  
  // Calculate daily totals for nutrition
  for (const item of nutritionByDate) {
    const { date, calories, fat, carbs, protein } = item;
    
    if (!nutritionData[date]) {
      nutritionData[date] = { date, calories: 0, fat: 0, carbs: 0, protein: 0 };
    }
    
    nutritionData[date].calories += calories || 0;
    nutritionData[date].fat += fat || 0;
    nutritionData[date].carbs += carbs || 0;
    nutritionData[date].protein += protein || 0;
  }
  
  // Convert to array sorted by date
  const dailyNutrition = Object.values(nutritionData)
    .map(day => ({
      ...day,
      fat: Math.round(day.fat),
      carbs: Math.round(day.carbs),
      protein: Math.round(day.protein),
      calories: Math.round(day.calories)
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Prepare data for meal breakdown pie chart
  const getMealBreakdown = (date) => {
    const meals = nutritionByDate.filter(item => item.date === date);
    return meals.map(meal => ({
      name: meal.meal,
      value: Math.round(meal.calories)
    }));
  };
  
  // Get nutrition by meal type for selected date
  const getSelectedDateNutrition = () => {
    if (!selectedDate) return [];
    return nutritionByDate.filter(item => item.date === selectedDate);
  };
  
  // Format date for display (MM/DD)
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const macroColors = {
    protein: '#0088FE',
    carbs: '#00C49F',
    fat: '#FF8042'
  };
  
  // Get most recent daily nutrition
  const latestNutrition = dailyNutrition.length > 0 ? 
    dailyNutrition[dailyNutrition.length - 1] : { calories: 0, protein: 0, carbs: 0, fat: 0 };
  
  // Calculate averages
  const getAverages = () => {
    if (dailyNutrition.length === 0) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
    const total = dailyNutrition.reduce((acc, day) => {
      return {
        calories: acc.calories + day.calories,
        protein: acc.protein + day.protein,
        carbs: acc.carbs + day.carbs,
        fat: acc.fat + day.fat
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
    
    return {
      calories: Math.round(total.calories / dailyNutrition.length),
      protein: Math.round(total.protein / dailyNutrition.length),
      carbs: Math.round(total.carbs / dailyNutrition.length),
      fat: Math.round(total.fat / dailyNutrition.length)
    };
  };
  
  const averages = getAverages();
  
  // Calculate average steps
  const avgSteps = Math.round(
    stepData.reduce((sum, day) => sum + day.steps, 0) / stepData.length
  );
  
  // Handle date selection for detailed view
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setActiveTab('details');
  };
  
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Maisara's Monthly progress report</h1>
      
      {/* Tab Navigation */}
      <div className="flex bg-white rounded-lg shadow mb-4">
        <button 
          className={`flex-1 py-2 text-center font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`flex-1 py-2 text-center font-medium ${activeTab === 'nutrition' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('nutrition')}
        >
          Nutrition
        </button>
        <button 
          className={`flex-1 py-2 text-center font-medium ${activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button 
          className={`flex-1 py-2 text-center font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
      </div>
      
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Weight Progress */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-2">Weight Progress</h2>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip labelFormatter={(label) => `Date: ${label}`} />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg flex flex-col justify-center items-center md:w-1/3">
                <p className="text-sm text-gray-600">Starting Weight</p>
                <p className="font-bold text-xl">{weightData.length > 0 ? weightData[0].weight : 0} kg</p>
                <p className="text-sm text-gray-600 mt-2">Current Weight</p>
                <p className="font-bold text-xl">{weightData.length > 0 ? weightData[weightData.length - 1].weight : 0} kg</p>
                <div className={`mt-2 py-1 px-3 rounded-full ${weightLoss > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {weightLoss > 0 ? `Lost ${weightLoss.toFixed(1)} kg` : `Gained ${Math.abs(weightLoss).toFixed(1)} kg`}
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Nutrition */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-2">Nutrition Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              <div className="bg-blue-50 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-600">Daily Avg Calories</p>
                <p className="font-bold">{averages.calories}</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-600">Daily Avg Protein</p>
                <p className="font-bold">{averages.protein}g</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-600">Daily Avg Carbs</p>
                <p className="font-bold">{averages.carbs}g</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-600">Daily Avg Fat</p>
                <p className="font-bold">{averages.fat}g</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyNutrition.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip labelFormatter={(label) => `Date: ${label}`} />
                <Legend />
                <Bar dataKey="calories" fill="#8884d8" name="Calories" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-2">Activity Summary</h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-blue-50 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-600">Avg Daily Steps</p>
                <p className="font-bold">{avgSteps}</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-600">Recent Exercise</p>
                <p className="font-bold">{exerciseData.length > 0 ? exerciseData[0].name : "None"}</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stepData.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip labelFormatter={(label) => `Date: ${label}`} />
                <Bar dataKey="steps" fill="#82ca9d" name="Steps" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Nutrition Tab */}
      {activeTab === 'nutrition' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Daily Calories</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyNutrition}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip labelFormatter={(label) => `Date: ${label}`} />
                <Bar dataKey="calories" fill="#8884d8" onClick={(data) => handleDateClick(data.date)}>
                  {dailyNutrition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.calories > averages.calories ? '#ff8042' : '#8884d8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-center text-gray-500 mt-2">Click on any bar to see meal details</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Macronutrient Distribution</h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="p-2 text-center">
                <div className="w-4 h-4 bg-blue-500 mx-auto mb-1 rounded-sm"></div>
                <p className="text-xs text-gray-600">Protein</p>
              </div>
              <div className="p-2 text-center">
                <div className="w-4 h-4 bg-green-500 mx-auto mb-1 rounded-sm"></div>
                <p className="text-xs text-gray-600">Carbs</p>
              </div>
              <div className="p-2 text-center">
                <div className="w-4 h-4 bg-orange-500 mx-auto mb-1 rounded-sm"></div>
                <p className="text-xs text-gray-600">Fat</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyNutrition.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip labelFormatter={(label) => `Date: ${label}`} />
                <Legend />
                <Bar dataKey="protein" stackId="a" fill="#0088FE" name="Protein (g)" />
                <Bar dataKey="carbs" stackId="a" fill="#00C49F" name="Carbs (g)" />
                <Bar dataKey="fat" stackId="a" fill="#FF8042" name="Fat (g)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Daily Steps</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stepData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip labelFormatter={(label) => `Date: ${label}`} />
                <Bar dataKey="steps" fill="#82ca9d" name="Steps">
                  {stepData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.steps > 5000 ? '#82ca9d' : '#ffbb28'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-2 bg-blue-50 rounded-lg">
              <p className="text-sm text-center">
                Average Daily Steps: <span className="font-bold">{avgSteps}</span>
              </p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Exercise Sessions</h2>
            {exerciseData.length > 0 ? (
              <div className="space-y-2">
                {exerciseData.map((exercise, idx) => (
                  <div key={idx} className="p-3 border rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">{exercise.name}</p>
                      <p className="text-sm text-gray-600">{exercise.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{exercise.minutes} min</p>
                      <p className="text-sm text-gray-600">{exercise.calories} kcal</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 p-4">No exercise sessions recorded</p>
            )}
          </div>
        </div>
      )}
      
      {/* Details Tab */}
      {activeTab === 'details' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">
              {selectedDate ? `Details for ${selectedDate}` : 'Select a date from charts to view details'}
            </h2>
            
            {selectedDate ? (
              <>
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Meals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={getMealBreakdown(selectedDate)}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {getMealBreakdown(selectedDate).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <div className="space-y-2">
                        {getSelectedDateNutrition().map((meal, idx) => (
                          <div key={idx} className="p-2 border rounded-md">
                            <p className="font-medium">{meal.meal}</p>
                            <p className="text-sm">Calories: {Math.round(meal.calories)}</p>
                            <div className="flex space-x-2 text-xs text-gray-600">
                              <p>P: {Math.round(meal.protein)}g</p>
                              <p>C: {Math.round(meal.carbs)}g</p>
                              <p>F: {Math.round(meal.fat)}g</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Activity</h3>
                  {stepData.find(day => day.date === selectedDate) ? (
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Steps</p>
                      <p className="font-bold text-xl">{stepData.find(day => day.date === selectedDate)?.steps || 0}</p>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 p-2">No activity data for this date</p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center p-4">
                <p className="text-gray-500">Click on any bar in the charts to view detailed information for that day</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
