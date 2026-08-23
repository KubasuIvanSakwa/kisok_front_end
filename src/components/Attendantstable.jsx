import { useAttendants } from "../../store/store";

function Attendantstable({ Attendants }) {
  const formatTime = (isoString) => {
    if (!isoString) return "Pending...";

    return new Date(isoString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const fetchAttendants = useAttendants((s) => s.fetchAttendants);

  const handleScan = async (id) => {
    try {
      await fetch("http://localhost:3000/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });

      await fetchAttendants();
    } catch (error) {
      console.error("Scan failed", error);
    }
  };

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-xl border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="bg-gray-300 border-b border-default">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              id
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              name
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              status
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              time
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {Attendants.map((item) => (
            <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                {item.id}
              </th>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.status}</td>
              <td className="px-6 py-4">{formatTime(item.time_checkedin)}</td>
              <td className="px-6 py-4">
                {item.status !== "checked_in" && (
                  <button
                    onClick={() => {
                      handleScan(item.id)
                      console.log(item.id)
                    }}
                    
                    className="text-black font-bold underline py-1 px-3 cursor-pointer"
                  >
                    Check In
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendantstable;
