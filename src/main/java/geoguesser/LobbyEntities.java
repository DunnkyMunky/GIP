package geoguesser;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "lobby")
public class LobbyEntities {

	@Id
	@Column(name = "gameid")
	private int gameid;

	@Column(name = "gamename")
	private String gamename;
	


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




}
