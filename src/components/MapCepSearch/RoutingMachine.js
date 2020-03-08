import { MapLayer } from 'react-leaflet';
import leaflet from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet } from 'react-leaflet';

class Routing extends MapLayer {
  createLeafletElement() {
    const {
      map,
      lattSearch,
      longtSearch,
      lattGeolocation,
      longtGeolocation,
    } = this.props;
    let leafletElement = leaflet.Routing.control({
      waypoints: [
        leaflet.latLng(lattGeolocation, longtGeolocation),
        // leaflet.latLng(lattSearch, longtSearch),
      ],

      lineOptions: {
        styles: [
          {
            color: 'blue',
            opacity: 0.6,
            weight: 8,
          },
        ],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: true,
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
