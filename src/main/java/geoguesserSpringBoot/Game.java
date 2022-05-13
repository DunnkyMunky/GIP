package geoguesserSpringBoot;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.ResponseBody;

@ResponseBody
public class Game {

	int gameid;
	String gamename;
	List<UserLogin> players = new ArrayList<UserLogin>();
	public boolean gameready = true;

	public void addPlayer(UserLogin user) {
		players.add(user);

	}

	public int getGameid() {
		return gameid;
	}

	public void setGameid(int gameid) {
		this.gameid = gameid;
	}

	public String getGamename() {
		return gamename;
	}

	public void setGamename(String gamename) {
		this.gamename = gamename;
	}

	public List<UserLogin> getPlayers() {
		return players;
	}

	public void setPlayers(List<UserLogin> players) {
		this.players = players;
	}

	public boolean isGameready() {
		return gameready;
	}

	public void setGameready(boolean gameready) {
		this.gameready = gameready;
	}

}
