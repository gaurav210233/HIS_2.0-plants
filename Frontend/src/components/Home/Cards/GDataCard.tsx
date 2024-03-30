// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import React, { useState, useEffect } from "react";
// import { DataProps } from "../GDataCarosel";

// const GDataCard: React.FC<DataProps> = (gData) => {
//   // const [data, setData] = useState<DataProps | null>(null);
//   // const [data, setData] = useState<DataProps>(gData);
//   // const [isLoading, setIsLoading] = useState<boolean>(false);
//   // const [lastRefreshed, setLastRefreshed] = useState<number>(Date.now());

//   // const fetchData = async () => {
//   //   setIsLoading(true);
//   //   try {
//   //     // const response = await fetch("/api/data");
//   //     // const data: DataProps = await response.json();
//   //     const newData: DataProps = {
//   //       humidity: data.humidity + 1,
//   //       temperature: data.temperature + 1,
//   //       setupName: setupName,
//   //     };
//   //     setData(newData);
//   //     setLastRefreshed(Date.now()); // Update lastRefreshed when data is fetched
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // const handleRefresh = () => {
//   //   fetchData();
//   // };

//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     const timeSinceLastRefresh = Date.now() - lastRefreshed;
//   //     if (timeSinceLastRefresh >= 2000000) {
//   //       fetchData();
//   //     }
//   //   }, 1000); // Check every second

//   //   return () => clearInterval(interval);
//   // }, []);

//   // useEffect(() => {
//   //   fetchData(); // Fetch initial data
//   // }, []);

//   // if (isLoading) {
//   //   return <div>Loading...</div>;
//   // }
//   console.log(gData);
//   const [temperature, setTemperature] = useState(gData.temperature);
//   const [humidity, setHumidity] = useState(gData.humidity);
//   const [setupName, setSetupName] = useState(gData.setupName);

//   useEffect(() => {
//     // Update temperature, humidity, and setupName when gData prop changes
//     setTemperature(gData.temperature);
//     setHumidity(gData.humidity);
//     setSetupName(gData.setupName);
//   }, [gData]);
//   return (
//     <div>
//       <Card>
//         <CardContent>
//           <div className="flex gap-1">
//             <div>
//               <div>
//                 <span>Temperature</span>
//               </div>
//               <div>
//                 <h1>{temperature}°C</h1>
//               </div>
//             </div>
//             <div>
//               <div>
//                 <span>Humidity</span>
//               </div>
//               <div>
//                 <h1>{humidity}%</h1>
//               </div>
//             </div>
//           </div>
//           <div>Setup Name : {setupName}</div>
//         </CardContent>
//       </Card>
//       {/* <Button onClick={handleRefresh}>Refresh Data</Button> */}
//     </div>
//   );
// };

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import React, { useState, useEffect } from "react";
// import { DataProps } from "../GDataCarosel";

// const GDataCard: React.FC<DataProps> = (gData) => {
// };

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { DataProps } from "../GDataCarosel";

const GDataCard: React.FC<DataProps> = ({
  temperature,
  humidity,
  setupName,
}) => {
  // console.log("Hello the data   ", temperature, humidity, setupName);

  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex gap-1">
            <div>
              <div>
                <span>Temperature</span>
              </div>
              <div>
                <h1>{temperature}°C</h1>
              </div>
            </div>
            <div>
              <div>
                <span>Humidity</span>
              </div>
              <div>
                <h1>{humidity}%</h1>
              </div>
            </div>
          </div>
          <div>Setup Name : {setupName}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GDataCard;
