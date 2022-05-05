package geoguesser;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.grum.geocalc.Coordinate;
import com.grum.geocalc.EarthCalc;
import com.grum.geocalc.Point;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class GeoGuesserController {
	@Autowired
	private GeoGuesserRepository georepo;

	@Autowired
	private UsersRepository userrepo;

	@Autowired
	private LobbyRepository lobbyrepo;

	private List<Game> Gamelist = new ArrayList<Game>();

	@GetMapping("/home")
	String ShowPage() {
		return "GeoGuesser";
	}

	@GetMapping("/login")
	@ResponseBody
	public UserLogin playername(@RequestParam int userID, @RequestParam String username,
			@RequestParam String password) {
		UserLogin userlogin = new UserLogin();

		userlogin.user = username;
		userlogin.password = password;
		userlogin.id = userID;

		UsersEntities userentities;

		try {
			UsersEntities entity = new UsersEntities();
			entity.setUsername(username);
			entity.setPassword(password);
			entity.setUserID(userID);
			userrepo.save(entity);
			userentities = userrepo.findByUsername(username);
		} catch (Exception si) {
			userentities = userrepo.findByUsername(username);
			if (!userentities.getPassword().equals(password)) {
				System.out.println("naam bestaat al");
				userlogin.id = 0;
				userlogin.user = "error";
				userlogin.password = "error";

			} else {

			}

		}

		if (userentities.getPassword().equals(password)) {

			System.out.println("wachtwoord is JUIST");
			userlogin.correct = 1;

		} else {
			System.out.println("wachtwoord is FOUT");
			userlogin.correct = 0;
		}

		System.out.println(password);
		System.out.println(userentities.getPassword());

		return userlogin;

	}

	@GetMapping("/room")
	public @ResponseBody List<Game> lobby() {
		System.out.println(Gamelist.get(0).gamename);
		return Gamelist;

	}

	@GetMapping("/createroom")
	@ResponseBody
	public Game createroom(@RequestParam int gameid, @RequestParam String gamename, @RequestParam String user) {

		Game newgame = new Game();

		if (newgame.gameready = false) {

			Gamelist.remove(newgame);
			
		} else {
			newgame.gamename = gamename;
			newgame.gameid = gameid;
			newgame.gameready = false;
			UsersEntities userentity = userrepo.findByUsername(user);
			newgame.addPlayer(userentity.convertToUserLogin());
			Gamelist.add(newgame);
			LobbyEntities entity = new LobbyEntities();

			entity.setGameid(gameid);
			entity.setGamename(gamename);
		
			lobbyrepo.save(entity);


		}
		return newgame;

	}

	@GetMapping("/all")
	public Iterable<GeoGuesserEntities> index() {
		return georepo.findAll();
	}

	@GetMapping("/country")
	public GeoGuesserEntities country() {
		return georepo.getcountry();

	}

	@GetMapping("/afstand")
	public double country(@RequestParam double lat, @RequestParam double lng, @RequestParam double lat2,
			@RequestParam double lng2) {

		Coordinate latrandom = Coordinate.fromDegrees(lat);
		Coordinate lngrandom = Coordinate.fromDegrees(lng);
		Point punt1 = Point.at(latrandom, lngrandom);

		Coordinate latmarker = Coordinate.fromDegrees(lat2);
		Coordinate lngmarker = Coordinate.fromDegrees(lng2);
		Point punt2 = Point.at(latmarker, lngmarker);

		double afstandnietafgerond = EarthCalc.haversine.distance(punt1, punt2); // in meters
		double afstand = Math.round(afstandnietafgerond);

		return afstand;
	}

}
