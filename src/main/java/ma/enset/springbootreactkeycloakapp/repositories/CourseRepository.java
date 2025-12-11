package ma.enset.springbootreactkeycloakapp.repositories;

import ma.enset.springbootreactkeycloakapp.entites.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByTitleContainingIgnoreCase(String title);
}
