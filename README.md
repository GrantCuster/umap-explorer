Code for an interactive [UMAP](https://github.com/lmcinnes/umap) visualization of the MNIST data set. Demo at [https://grantcuster.github.io/umap-explorer/](https://grantcuster.github.io/umap-explorer/). You can read more about the demo in [the about section](https://grantcuster.github.io/umap-explorer/#about).

## A rough guide to the code

The demo app is a React app. It uses a `src/Data.js` to fetch the data and `src/Layout.js` to handle the layout of the page. The three.js visualization code is in `src/Projection.js`. The texture atlases are in the public folder as images. I also included the iPython notebook files I used to generate the texture atlases (`making_mnist_images.ipynb`) and to download the UMAP embeddings (`plot_mnist_example.ipynb`).

## Running the app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Learn more about create react app

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
