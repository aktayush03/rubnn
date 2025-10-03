export default function CourseCard({ course }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{course.title}</h2>
      <p className="text-gray-600">{course.platform}</p>
      <p className="mt-2">{course.description}</p>
      <p className="mt-2 font-bold text-yellow-600">⭐ {course.avgRating.toFixed(1)}</p>
    </div>
  );
}