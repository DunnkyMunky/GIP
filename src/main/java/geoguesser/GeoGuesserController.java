package geoguesser;

import java.text.DecimalFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grum.geocalc.Coordinate;
import com.grum.geocalc.EarthCalc;
import com.grum.geocalc.Point;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class GeoGuesserController {
	private static final DecimalFormat df = new DecimalFormat("0.00");

	@Autowired
	private GeoGuesserRepository georepo;

	@GetMapping("/all")
	public Iterable<GeoGuesserEntities> index() {
		return georepo.findAll();
	}

	@GetMapping("/country")
	public GeoGuesserEntities country() {
		return georepo.getcountry();
		
	}
	
	@GetMapping("/afstand")
	public double country(@RequestParam double lat, @RequestParam double lng, @RequestParam double lat2, @RequestParam double lng2) {
		
		
		
		Coordinate latrandom = Coordinate.fromDegrees(lat);
		Coordinate lngrandom = Coordinate.fromDegrees(lng);
		Point punt1 = Point.at(latrandom, lngrandom);

		Coordinate latmarker = Coordinate.fromDegrees(lat2);
		Coordinate lngmarker = Coordinate.fromDegrees(lng2);
		Point punt2 = Point.at(latmarker, lngmarker);

		double afstandnietafgerond = EarthCalc.haversine.distance(punt1, punt2); //in meters
		double afstand = Math.round(afstandnietafgerond);

		return afstand;
	}
	
	
}
