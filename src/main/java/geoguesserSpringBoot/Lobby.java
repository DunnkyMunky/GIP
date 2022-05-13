package geoguesserSpringBoot;

import org.springframework.web.bind.annotation.ResponseBody;

@ResponseBody
public class Lobby {
	
	int gameid;
	String gamename;
	public static boolean gameready = false;

}
