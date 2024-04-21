import Heading from "../Heading";

export default function Progress() {
  return (
    <div className="p-4">
      <Heading size="2xl">My Progress</Heading>

      {/* Current Progress Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Current Progress</h2>
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Expand</button>
        </div>
        <div className="mt-2 p-4 bg-gray-100 rounded">
          {/* Display current progress information */}
          {/* You can add your progress tracking UI here */}
          <p>Current Progress: 60%</p>
          {/* Example: Progress bar */}
          <div className="w-full bg-gray-300 rounded-full">
            <div className="h-2 bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      {/* Set Goals Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Set Goals</h2>
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Add Goal</button>
        </div>
        <div className="mt-2 p-4 bg-gray-100 rounded">
          {/* Form to add goals */}
          <form>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="goal">Goal:</label>
              <input className="w-full px-3 py-2 border rounded" type="text" id="goal" name="goal" placeholder="Enter your goal" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="deadline">Deadline:</label>
              <input className="w-full px-3 py-2 border rounded" type="date" id="deadline" name="deadline" />
            </div>
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Set Goal</button>
          </form>
        </div>
      </div>

      {/* My Achievements Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">My Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Individual achievement cards */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Achievement 1</h3>
            <p className="text-gray-600">Description of Achievement 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Achievement 2</h3>
            <p className="text-gray-600">Description of Achievement 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          {/* Add more achievements as needed */}
        </div>
      </div>
    </div>
  );
}
