const navData = [
    {name: "Map", path: `/trip/${id}/map`},
    {name: "Itinerary", path: `/trip/${id}/itinerary`},
    {name: "Chat", path: `/trip/${id}/chat`},
    {name: "Timeline", path: `/trip/${id}/timeline`},
    {name: "Group History", path: `/trip/${id}/group_history`}
  ];


  const navBtns = navData.map( link => {
    return <TripNavBtn key={ link.name }name={ link.name } path={ link.path }/>
  })