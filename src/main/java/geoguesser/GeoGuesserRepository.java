package geoguesser;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeoGuesserRepository extends CrudRepository<GeoGuesserEntities, Integer> {

	@Query(value = "Select * from worldcities_csv wc order by rand() limit 1", nativeQuery = true)
	GeoGuesserEntities getcountry();

}
