import { useEffect } from 'react';
import { useAttendants } from '../store/store';
import Attendantstable from './components/Attendantstable';

function App() {

const AttendantsArray = useAttendants((state) => state.Attendants);
  const fetchAttendants = useAttendants((s) => s.fetchAttendants)

  useEffect(() => {
    // 1. Initial fetch when page loads
    fetchAttendants();

    // 2. Open the SSE connection to the backend
    const sse = new EventSource('https://plp-assignment-kiosk-sign-in-backend-1.onrender.com/stream');

    // 3. Listen for messages from the backend
    sse.onmessage = (event) => {
      console.log("SSE Message Received:", event.data);
      // When a webhook finishes, refetch the table data!
      fetchAttendants();
    };

    sse.onerror = (error) => {
      console.error("SSE Connection Error:", error);
      sse.close();
    };

    // 4. Cleanup when component unmounts
    return () => {
      sse.close();
    };
  }, []); // Empty array ensures this only runs once

  return (
    <div className="p-3">
      
      {AttendantsArray && <Attendantstable Attendants={AttendantsArray}/>}
      {/* <button onClick={async () => {
        await fetchAttendants()
        console.log(Attendants)
      }}>Fetch</button> */}
    </div>
  )
}

export default App
