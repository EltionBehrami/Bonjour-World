import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";

const EventMap = ({ mapOptions, events, markerEventHandlers }) => {
    const [map, setMap] = useState(null)
    const mapRef = useRef(null);
    const markersRef = useRef(null)


    useEffect(() => {
      // If the map is not yet set, create a new google.maps.Map object
        if (!map) {
        // Default values for the map, such as zoom level and center
            const defaultMapOptions = {
                zoom: 12,
                center: { lat: 40.7128, lng: -74.0060 } // New York as an example
        };

        // Create a new Google Map object with mapRef as its first argument
        newMap = new google.maps.Map(mapRef, {
            ...defaultMapOptions,
            ...mapOptions, // Override defaults with provided mapOptions
        });
        setMap(newMap)
        }
    }, [mapOptions]);

    useEffect(() => {
        // Create markers for new events and remove markers for events that no longer exist
        const newMarkers = {};
        events.forEach((event) => {
            const { id, lat, lng } = event;
            const position = new google.maps.LatLng(lat, lng);
    
            if (!markersRef.current[id]) {
                // If no marker exists for the event, create one
                const marker = new google.maps.Marker({
                    position,
                    map: mapRef.current,
                // ...other marker options
                });
                newMarkers[id] = marker;
            } else {
                // If a marker already exists for the event, reuse it
                newMarkers[id] = markersRef.current[id];
            }
        });
    
        // Remove markers for events that no longer exist
        Object.keys(markersRef.current).forEach((id) => {
            if (!newMarkers[id]) {
            markersRef.current[id].setMap(null);
            }
        });
    
        // Update the markers ref with the new set of markers
        markersRef.current = newMarkers;
    }, [events]);

    useEffect(() => {
        // Attach event handlers to the map object
        if (mapEventHandlers && mapRef.current) {
          Object.entries(mapEventHandlers).forEach(([eventName, handler]) => {
            window.google.maps.event.addListener(mapRef.current, eventName, (event) => {
              // Pass the event object or nothing to the provided handler
              handler(event || null, mapRef.current);
            });
          });
        }
    }, [mapEventHandlers]);

    return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

const EventsMapWrapper = () => {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <EventsMap />
        </Wrapper>
    )
}

export default EventsMapWrapper;