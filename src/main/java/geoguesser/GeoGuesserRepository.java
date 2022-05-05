package geoguesser;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GeoGuesserRepository extends CrudRepository<GeoGuesserEntities, Integer> {

	@Query(value = "Select * from worldcities_csv wc order by rand() limit 1", nativeQuery = true)
	GeoGuesserEntities getcountry();
	
	@Query("select wc from worldcities_csv wc where wc.lat like ?1")
	GeoGuesserEntities findlat(@Param("lat") Double lat);
	
	@Query("select wc from worldcities_csv wc where wc.lng like ?1")
	GeoGuesserEntities findlng(@Param("lng") Double lng);


}
