import { useState } from 'react';

const recipes = [
	{
		id: 1,
		name: 'Chicken Tacos',
		ingredients: [ 'chicken', 'tortillas', 'cheese', 'salsa' ],
		instructions: 'Cook chicken, put chicken in tortillas, top with cheese and salsa',
		favorite: true
	},
	{
		id: 2,
		name: 'Cookies',
		ingredients: [ 'flour', 'sugar', 'eggs', 'butter' ],
		instructions: 'Mix ingredients, bake at 350 for 10 minutes',
		favorite: true
	},
	{
		id: 3,
		name: 'Milkshake',
		ingredients: [ 'milk', 'ice cream' ],
		instructions: 'Blend ice cream and milk',
		favorite: false
	}
];

function RecipeTable({ recipes, deleteRecipe, editRecipe}) {
	const handleDeleteClick = (id) => {
		deleteRecipe(id);
	};
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Ingredients</th>
					<th>Instructions</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{recipes.map((recipe) => (
					<tr key={recipe.id}>
						<td>
							<input
								type="text"
								value={recipe.name}
								onChange={(e) => editRecipe(recipe.id, 'name', e.target.value)}
							/>
						</td>
						<td>
							<ul>
								{recipe.ingredients.map((ingredient, index) => (
									<li key={index}>
										<input
											type="text"
											value={ingredient}
											onChange={(e) => {
												const newIngredients = [ ...recipe.ingredients ];
												newIngredients[index] = e.target.value;
												editRecipe(recipe.id, 'ingredients', newIngredients);
											}}
										/>
									</li>
								))}
							</ul>
						</td>
						<td>
							<textarea
								type="text"
								value={recipe.instructions}
								onChange={(e) => editRecipe(recipe.id, 'instructions', e.target.value)}
							/>
						</td>
						<td>
							<input
								type="checkbox"
								checked={recipe.favorite}
								onChange={(e) => editRecipe(recipe.id, 'favorite', e.target.checked)}
							/>
						</td>
						<td>
							<DeleteRecipe deleteRecipe={handleDeleteClick} id={recipe.id} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

function FavoritesOnly({ recipes, favoriteRecipe }) {
	const favoriteRecipes = recipes.filter((recipe) => recipe.favorite);

	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Ingredients</th>
					<th>Instructions</th>
				</tr>
			</thead>
			<tbody>
				{favoriteRecipes.map((recipe) => (
					<tr key={recipe.id}>
						<td>{recipe.name}</td>
						<td>
							<ul>{recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
						</td>
						<td>{recipe.instructions}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

function DeleteRecipe({ deleteRecipe, id }) {
	const handleDeleteClick = () => {
		deleteRecipe(id);
	};
	return <button onClick={handleDeleteClick}>Delete</button>;
}

function NewRecipe({ addRecipe }) {
	const [ name, setName ] = useState('');
	const [ ingredients, setIngredients ] = useState([]);
	const [ instructions, setInstructions ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		addRecipe({ name, ingredients, instructions });
		setName('');
		setIngredients([]);
		setInstructions('');
	};
	return (
		<form onSubmit={handleSubmit}>
			<label>
				Name:
				<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
			</label>
			<label>
				Ingredients:
				<textarea type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value.split(','))} />
			</label>
			<label>
				Instructions:
				<textarea type="text" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
			</label>
			<button type="submit" value="Add Recipe">
				{' '}
				Add Recipe{' '}
			</button>
		</form>
	);
}

function App() {
	const [ recipeList, setRecipeList ] = useState(recipes);
	const addRecipe = (recipe) => {
		setRecipeList([ ...recipeList, { ...recipe, id: recipeList.length + 1 } ]);
	};

	const deleteRecipe = (id) => {
		setRecipeList(recipeList.filter((recipe) => recipe.id !== id));
	};

	const editRecipe = (id, field, value) => {
		setRecipeList(
			recipeList.map((recipe) => {
				if (recipe.id === id) {
					return {
						...recipe,
						[field]: value
					};
				} else {
					return recipe;
				}
			})
		);
	};
	return (
		<div className="App">
			<div>
				<NewRecipe addRecipe={addRecipe} />
			</div>
			<div>
				<RecipeTable
					recipes={recipeList}
					deleteRecipe={deleteRecipe}
					editRecipe={editRecipe}
				/>
			</div>
			<div>
				<div>
					<h1> Favorites Only </h1>
					<FavoritesOnly recipes={recipeList}  />
				</div>
			</div>
		</div>
	);
}

export default function Page() {
	return (
		<div>
			<App />
		</div>
	);
}
