const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 8080,
});

const getRecipes = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * from foodrecipes ORDER BY id DESC', (error, results) => {
            if(error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

const createRecipe = (body) => {
    return new Promise(function(resolve, reject) {
        const { dishName, recipe } = body;
        pool.query('INSERT INTO foodrecipes (name, recipe) VALUES ($1, $2) RETURNING *', [dishName, recipe], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`A new merchant has been added: ${results}`)
        })
    })
}

const deleteRecipe = (id) => {
    return new Promise(function(resolve, reject) {
        pool.query('DELETE from foodrecipes WHERE id = $1', [id], (error, results) => {
            if(error) {
                reject(error);
            }
            resolve(`foodRecipes deleted with ID: ${id}`)
        });
    })
}

const updateRecipe = (body) => {
    return new Promise((resolve, reject) => {
        const {id, name, recipe} = body;
        pool.query('UPDATE foodrecipes SET name=$1, recipe=$2 WHERE id=$3',[name, recipe, id], (error, results) => {
            if(error) {
                reject(error);
            }
            resolve(`foodRecipes updated with ID: ${id}`)
        })
    })
}

module.exports = {
    getRecipes,
    createRecipe,
    deleteRecipe,
    updateRecipe
}