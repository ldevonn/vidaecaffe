# Vida Caffe API Docs

## User Authentication/Authorization

### All endpoints that require authentication
b
All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
  	"message": "Authentication required"
  }
  ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/users/current
  - Body: none

- Successful Response when there is a logged-in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"id": 1,
    	"username": "Devon",
    	"email": "devon@gmail.com",
        "role": "Admin"
    }
    ```

* Successful Response when there is no logged-in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/auth/login
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"email": "devon@gmail.com",
    	"password": "secret password"
    }
    ```

* Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    		"id": 1,
    		"username": "Devon",
    		"email": "devon@gmail.com",
            "role": "Admin"
    }
    ```

* Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Bad Request",
    	"errors": {
    		"email": ["This field is required"],
    		"password": ["This field is required"]
    	}
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/auth/signup
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"username": "Devon",
    	"email": "devon@gmail.com",
    	"password": "secret password",
        "role": "Admin"
    }
    ```

* Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {"id": 1,
      "username": "Devon",
      "email": "devon@gmail.com",
      "role": "Admin"
    }
    ```

* Error response: User already exists with the specified email

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "User already exists",
    	"errors": {
    		"email": "Email address is already in use",
            "username": "Username is already in use"
    	}
    }
    ```

* Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
    	"message": "Bad Request",
    	"errors": {
    	    "email": "Invalid email address",
    		"username": "This field is required",
            "password": "This field is required",
            "role": "This field is required"
    	}
    }
    ```
    
## Menu Items

### Get all menu items

Returns a list containing all menu items

- Require Authentication: false
- Require Authorization: false
- Request
  - Method: GET
  - URL: /api/menu
  - Headers:
    - Content-Type: application/json
  - Body: none

* Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [{"id": 1,
      "name": "Hot Latte",
      "description": "A rich, creamy hot espresso drink with steamed whole milk",
      "category": "Hot Coffee",
      "productImg": 1,
      "recipeId": 1
      },
      {
      "id": 2,
      "name": "Iced Latte",
      "description": "A rich, creamy iced espresso drink with whole milk",
      "category": "Cold Coffee",
      "productImg": 2,
      "recipeId": 2
    }
    
    ]
    ```
    
### Get a menu item by its id

- Require Authentication: false
- Require Authorization: false
- Request
  - Method: GET
  - URL: /api/menu/:id
  - Headers:
    - Content-Type: application/json
  - Body: none

* Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [{"id": 1,
      "name": "Hot Latte",
      "description": "A rich, creamy hot espresso drink with steamed whole milk",
      "category": "Hot Coffee",
      "productImg": 1,
      "recipeId": 1,
       "test": 3 
      }
    ]
    ```

### Delete a menu item

Deletes a single menu item specified by its id.

- Require Authentication: true
- Require Authorization: true (Admin)
- Request:
  - Method: DELETE
  - URL: /api/menu/:id
  - Headers:
    - Content-Type: application/json
  - Body: none

* Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Menu item deleted successfully"
    }
    ```

* Error Response: Menu item not found

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Menu item not found"
    }
    ```
    
### Create New Menu Item

- Require Authentication: true
- Require Authorization: true (Admin)
   - Method: POST
   - URL: /menu
   - Headers:
     - Content-Type: application/json
   - Request Body:
  ```json
  {
    "name": "Hot Cappuccino",
    "description": "description",
    "category": "Hot Coffee",
    "productImg":  3,
    "recipeId": 3
  }
  ```
  * Successful Response
    - Status Code: 200
    - Headers:
      - Content-Type: application/json
    - Body:

    ```json
    {
      "name": "Hot Cappuccino",
      "description": "description",
      "category": "Hot Coffee",
      "productImg":  3,
      "recipeId": 3
    }
    ```

  * Error Response: Body validation errors

    - Status Code: 404
    - Headers:
      - Content-Type: application/json
    - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "name": "This field is required",
        "description": "This field is required",
        "category": "This field is required",
        "productImg":  "This field is required",
        "recipeId": "This field is required"
      }
    }
    ```
    
### Edit Menu Item

- Require Authentication: true
- Require Authorization: true (Admin)
   - Method: POST
   - URL: /menu/:id
   - Headers:
     - Content-Type: application/json
   - Request Body:
```json
  {
    "name": "Edited Hot Cappuccino",
    "description": "new description",
    "category": "Hot Coffee",
    "productImg":  3,
    "recipeId": 3
  }
```
* Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

```json
  {
    "name": "Edited Hot Cappuccino",
    "description": "new description",
    "category": "Hot Coffee",
    "productImg":  3,
    "recipeId": 3
  }
```
  
* Error Response: Body validation errors
    
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
```json
{
  "message": "Bad Request",
    "errors": {
      "name": "This field is required",
      "description": "This field is required",
      "category": "This field is required",
      "productImg": "This field is required",
      "recipeId": "This field is required",
      "test": "name"
    }
  }
```
* Error Response: Menu Item couldn't be found

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

```json
  {
  "message": "Menu item not found"
  }
 ```

## Recipes

### Get a recipe
- Require Authentication: true
- Require Authorization: true (Admin)
  - Method: GET
    - URL: /recipes/:id
    - Headers:
      - Content-Type: application/json
    - Request Body: None

* Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

```json
  {
    "id": 1,
    "name": "Reg Hot Latte",
    "size": "regular",
    "ingredients": [1, 2]
  }
```

* Error Response: Recipe couldn't be found

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

```json
  {
  "message": "Recipe not found"
  }
 ```

### Create a recipe
- Require Authentication: true
- Require Authorization: true (Admin)
  - Method: POST
    - URL: /recipes
    - Headers:
      - Content-Type: application/json
    - Request Body:

```json
  {
    "name": "Reg Iced Latte",
    "size": "regular",
    "ingredients": [1, 2]
  }
```

* Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

```json
  {
    "name": "Reg Iced Latte",
    "size": "regular",
    "ingredients": [1, 2]
  }
```

* Error Response: Body Validation Errors

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

```json
  {
  "message": "Bad Request",
  "errors": {
    "name": "This field is required",
    "size": "This field is required",
    "ingredients": "This field is required"
  } 
}
 ```
