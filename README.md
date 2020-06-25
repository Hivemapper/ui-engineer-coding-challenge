# Hivemapper Web Graphics Engineer Coding Challenge

This coding challenge is designed to test your 3D graphics ability. If you have not worked with OpenGL and/or Three.js before, this challenge will be painful. We have set up a basic application structure as a starting point, but feel free to implement this however you see fit.

This challenge shouldn't take more than 4 hours to finish. Task 2 is signifigantly easier than task 1.

Please document your code as you would in a production system. Please also include a short `README` explaining how you approached the problem, and things you might improve on given more time.

### How to run
Download this repo. If you are going to clone it, do so privately so that nobody else can see your answer.

Please make sure that you have current versions of **`node`** (^14.0.0) and either **`npm`** (^6.0.0) or **`yarn`** (^1.22.0).

To install the dependencies, run **`npm ci`** or just **`yarn`**.

To start the dev server, run **`npm run start-dev-server`** or **`yarn start-dev-server`**.

To load the app, use your browser and head to **`localhost:8080`**.

Webpack will automatically reload the app whenever you make changes.

### About the point cloud
The point cloud provided is a downsampled version of the point clouds that Hivemapper uses to build our map. It is:

- A [PLY](https://en.wikipedia.org/wiki/PLY_(file_format) file.
- Somewhere in San Francisco.
- In the [ECEF](https://en.wikipedia.org/wiki/ECEF) coordinate system.
- Measured in meters ([WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System#A_new_World_Geodetic_System:_WGS_84))

Here is an [ASCII](https://github.com/Hivemapper/ui-engineer-coding-challenge/blob/master/Point%20Clouds/point-cloud-ascii.ply) version so you can see what the coordinates look like.

`App.jsx` already does the work of loading and parsing the PLY file into a THREE.Geometry.

Feel free to download the PLY file and open it in a viewer like [MeshLab](http://www.meshlab.net/) or [CloudCompare](http://www.danielgm.net/cc/) to see what it looks like.

## Task 1: Render the point cloud
With the `THREE.Geometry` loaded by `App.jsx` as a starting point, render this to the screen. There's no right answer here. Don't worry about integrating 3D controls, a static scene is fine.

Note:

- The ECEF coordinate system doesn't align nicely with any of the scene's axes so the model will look slanted. Can you compensate for this so that the scene looks upright?
- You will see floating point imprecision in the scene. Can you correct for this? WebGL doesn't work well with typical ECEF coordinates because graphics hardware tends to only use up to 32-bit floats which has low precision at that magnitude, while JavaScript uses 64-bit floats for all of its numbers and does not have that problem at that magnitude.
- We've included Three.js in the starting code. Feel free to not use Three.js if there's something else you are more comfortable with.

## Task 2: Color the point cloud based on altitude
`App.jsx` comes with two buttons at the top to switch between color modes. For 'Color By Altitude' please color each point based on it's relative height above sea level. In the model provided the minimum altitude is 6.65 meters and the maximum is 58.57 meters.

`geo-utils.js` is your friend here.
