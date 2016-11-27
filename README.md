# AMBA

## amba.js

AMBA is a **Javascript library for web application development based on modules**. You can create any web application only using Javascript and amba.js. The main source code is located in *public/javascripts/amba.js.*

#### Example code

```
var parent = div().append().size(200,200).border(1).cursorPointer()
	.click(function () {
		div().appendTo(parent).margin(5).size(5,5).color('red');
	})
``` 

AMBA abstracts html \<div\> element by creating *Div* javascript object. You can create a amba object by calling *div()* function which is the constructor of *Div* object. Since the constructor and all methods of *Div* object are basically returning *Div* itself, you can call additional method using chain pattern.  
The example code above shows how easy it is to set css properties for a *Div* object and functionality such as click event handler.


## AMBAIDE

AMBAIDE is an online development environment using AMBA library. It supports strong modularization and dependency system. You can easily modularize your code with *define function* (<a href='http://requirejs.org/docs/api.html#defdep'>how to use</a>). Furthermore, you can set module dependencies just by clicking modules you want in module lists.  
Your app should be runnning on [localhost:3000/?app=ambaide](http://localhost:3000/?app=ambaide "ambaide")

## AMBASA

AMBASA(AMBA Slide Application) is an advanced slide application based on AMBA. It has basic design utils like power point, google slide as well as code editor to confer functionality of object. It supports various types of object and convinient utilities to create slide show. Also, it offers real time coworking using messaging module with primus.  
Your app should be running on [localhost:3000/?app=ambasa](http://localhost:3000/?app=ambaide "AMBASA"). You can access to coworking space throught [localhost:3000/?app=ambasa_list](http://localhost:3000/?app=ambasa_list "AMBASA list")

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [npm](https://www.npmjs.com/) installed. Also, My sql and Redis are required.

```sh
git clone https://github.com/yjsgoon/AMBA.git # or clone your own fork
cd AMBA
npm install
npm start
```
