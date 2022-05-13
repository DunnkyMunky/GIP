package geoguesserSpringBoot;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "users")
public class UsersEntities {

	@Id
	@Column(name = "userID")
	private int userID;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;
	
	public UserLogin convertToUserLogin() {
		UserLogin userlogin = new UserLogin();
		userlogin.id = userID;
		userlogin.user = username;
		userlogin.password = password;
		userlogin.correct = 1;
		return userlogin;
	}


	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}





}