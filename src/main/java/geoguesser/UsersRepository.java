package geoguesser;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends CrudRepository<UsersEntities, Integer> {

	
	@Query(value = "Select * from users ", nativeQuery = true)
	UsersEntities getUserID();
	
	UsersEntities findByUsername(String username);


}