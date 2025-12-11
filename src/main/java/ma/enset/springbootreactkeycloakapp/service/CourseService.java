package ma.enset.springbootreactkeycloakapp.service;

import ma.enset.springbootreactkeycloakapp.entites.Course;
import ma.enset.springbootreactkeycloakapp.repositories.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    private CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }


    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course courseDetails) {
        return courseRepository.findById(id)
                .map(existingCourse -> {
                    // Mise à jour des champs
                    if (courseDetails.getTitle() != null) {
                        existingCourse.setTitle(courseDetails.getTitle());
                    }
                    if (courseDetails.getDescription() != null) {
                        existingCourse.setDescription(courseDetails.getDescription());
                    }
                    return courseRepository.save(existingCourse);
                })
                .orElseThrow(() -> new RuntimeException("Cours non trouvé avec l'ID: " + id));
    }

    public void deleteCourse(Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
        } else {
            throw new RuntimeException("Cours non trouvé avec l'ID: " + id);
        }
    }
    public List<Course> searchCoursesByTitle(String keyword) {
        return courseRepository.findAll().stream()
                .filter(course -> course.getTitle().toLowerCase().contains(keyword.toLowerCase()))
                .toList();
    }
    public boolean courseExists(Long id) {
        return courseRepository.existsById(id);
    }
}
