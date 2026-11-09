import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Recipe = () => {
  const [activeRecipe, setActiveRecipe] = useState({});

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(
          `https://forkify-api.herokuapp.com/api/get?rId=${id}`
        );
        const res = await req.json();
        setActiveRecipe(res.recipe);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };

    fetchData();
  }, [id]);

  console.log(activeRecipe.ingredients);

  return (
    <div className="container mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <img
          className="w-full h-auto rounded-md"
          src={activeRecipe.image_url}
          alt={activeRecipe.title}
        />
        <h3 className="text-2xl font-semibold mt-4">{activeRecipe.title}</h3>
      </div>
      <div className="mt-6">
        <p className="font-bold text-lg">Ingredients</p>
        <ul className="list-disc list-inside">
          {activeRecipe.ingredients &&
            activeRecipe.ingredients.map((prop, index) => (
              <li key={index} className="text-gray-700">
                {prop}
              </li>
            ))}
        </ul>
        <p className="mt-4">
          <span className="font-bold">Publisher:</span> {activeRecipe.publisher}
        </p>
        <p>
          <span className="font-bold">Website:</span>
          <a
            className="text-blue-500 hover:underline"
            href={activeRecipe.publisher_url}
          >
            {activeRecipe.publisher_url}
          </a>
        </p>
        <div className="text-center mt-6">
          <Link
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            to="/recipe"
          >
            Change Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
