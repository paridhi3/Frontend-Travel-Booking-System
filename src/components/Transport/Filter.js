// // **Filtering Logic**
// useEffect(() => {
//   if (!isSearchClicked) {
//     setBuses(allBuses);
//     return; // Don't filter until search is clicked
//   }

//   console.log("All Buses Data:", allBuses);
//   console.log("All Availability Data:", availability);

//   const {
//     source = "",
//     destination = "",
//     busClass = "",
//     departureDate = "",
//   } = searchFilters;

//   const filteredBuses = allBuses.filter((bus) => {
//     const busSource = bus.source?.trim().toLowerCase() || "";
//     const busDestination = bus.destination?.trim().toLowerCase() || "";
//     const busClassValue = bus.busClass?.trim().toLowerCase() || "";

//     const matchesSource =
//       source.trim() === "" || busSource === source.trim().toLowerCase();
//     const matchesDestination =
//       destination.trim() === "" ||
//       busDestination === destination.trim().toLowerCase();
//     const matchesBusClass =
//       busClass.trim() === "" || busClassValue === busClass.trim().toLowerCase();

//     let matchesDepartureDate = true;
//     const formattedDepartureDate = departureDate?.value ?? "";
//     if (formattedDepartureDate !== "") {
//       matchesDepartureDate = availability.some(
//         (avail) =>
//           avail.transportId === bus.busId &&
//           avail.travelDate === formattedDepartureDate
//       );
//     }

//     return (
//       matchesSource &&
//       matchesDestination &&
//       matchesBusClass &&
//       matchesDepartureDate
//     );
//   });

//   console.log("Filtered Buses After Processing:", filteredBuses);
//   setBuses(filteredBuses);
// }, [searchFilters, allBuses, availability, isSearchClicked]); // Depend on isSearchClicked
