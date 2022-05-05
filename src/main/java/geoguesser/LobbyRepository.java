package geoguesser;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LobbyRepository extends CrudRepository<LobbyEntities, Integer> {

	
	@Query(value = "Select * from lobby ", nativeQuery = true)
	UsersEntities getUserID();
	
	UsersEntities findByGamename(String gamename);


}