package geoguesser;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "worldcities_csv")
public class GeoGuesserEntities {

	@Id
	@Column(name = "city")
	private String city;

	@Column(name = "city_ascii")
	private String city_ascii;

	@Column(name = "lat")
	private Double lat;

	@Column(name = "lng")
	private Double lng;

	@Column(name = "country")
	private String country;

	@Column(name = "iso2")
	private String iso2;

	@Column(name = "iso3")
	private String iso3;

	@Column(name = "admin_name")
	private String admin_name;

	@Column(name = "capital")
	private String capital;

	@Column(name = "population")
	private Integer population;

	@Column(name = "id")
	private Integer id;

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCity_ascii() {
		return city_ascii;
	}

	public void setCity_ascii(String city_ascii) {
		this.city_ascii = city_ascii;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getIso2() {
		return iso2;
	}

	public void setIso2(String iso2) {
		this.iso2 = iso2;
	}

	public String getIso3() {
		return iso3;
	}

	public void setIso3(String iso3) {
		this.iso3 = iso3;
	}

	public String getAdmin_name() {
		return admin_name;
	}

	public void setAdmin_name(String admin_name) {
		this.admin_name = admin_name;
	}

	public String getCapital() {
		return capital;
	}

	public void setCapital(String capital) {
		this.capital = capital;
	}

	public Integer getPopulation() {
		return population;
	}

	public void setPopulation(Integer population) {
		this.population = population;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}



}
