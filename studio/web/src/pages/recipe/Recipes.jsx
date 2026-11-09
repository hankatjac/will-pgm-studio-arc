import { Link } from "react-router-dom";

const Recipes = ({ recipes }) => (
 <div className="container mx-auto px-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {recipes.map((recipe) => (
      <div key={recipe.recipe_id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform">
        <img
          className="w-full h-48 object-cover"
          src={recipe.image_url}
          alt={recipe.title}
        />
        <div className="p-4">
          <h5 className="text-lg font-semibold text-gray-900">
            {recipe.title.length < 20
              ? recipe.title
              : `${recipe.title.substring(0, 25)}...`}
          </h5>
          <p className="text-gray-600 text-sm">
            Publisher: <span className="font-medium">{recipe.publisher}</span>
          </p>
        </div>
        <div className="text-center p-4">
          <Link
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
            to={`/recipe/${recipe.recipe_id}`}
          >
            View Recipe
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>
);

export default Recipes;
