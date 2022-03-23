package geoguesser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class GeoGuesserController {

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
}
