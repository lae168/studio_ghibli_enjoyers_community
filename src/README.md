# Getting started with [Studio Ghibli Enjoyers' Community]

This project is constructed by using Vite+React.js and Tailwind CSS [].


## Available Scripts
In the project directory,you can run the following scripts in your terminal.

Firstly,
### `npm run json-server`
Open    [http://localhost:3030/users]
        [http://localhost:3030/posts]
        [http://localhost:3030/comments]  to view the json datas in your browser.


Secondly,
### `npm run dev`
        [http://localhost:5173/] to view the results of the assigned project in your browser.



### Expalnation About The Project



1. Project's theme is managed by using useContext hook+local storage

2. In "Posts" page, there is a search bar , featured and all posts (when posts are searched , the searched keywords is highlighted with cyan color  (RegExpression) ) 

3. As a unlogged in user, you cannot create post,comment,check the other profile page (React Authentication + useContext)

4. Once you are logged in, you can access all the functions (creating post, commenting , checking other profiles , deleting or editting your own posts and comments)

5. If you are not a registered user, go to sign up page . You have to fill in valid datas the form (checked with regExpression)

5. All the pages are responsive.