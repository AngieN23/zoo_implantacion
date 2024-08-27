from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS # type: ignore


app = Flask(__name__)
CORS(app)
# Configurar la conexión a MongoDB
client = MongoClient('mongodb+srv://angienicolbenavides:mBTAPqPeLROvsu8t@cluster0.txyoi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.zoologico
coleccion_animales = db.animales 

# Ruta para obtener la lista de todos los animales.
@app.route('/animales', methods=['GET'])
def obtener_animales():
    animales = list(coleccion_animales.find())  
    for animal in animales:
        animal['_id'] = str(animal['_id'])  
    return jsonify(animales)  

# Ruta para obtener un animal específico por su ID.
@app.route('/animales/<id>', methods=['GET'])
def obtener_animal(id):
    animal = coleccion_animales.find_one({"_id": ObjectId(id)})  
    if animal:
        animal['_id'] = str(animal['_id'])  
        return jsonify(animal)  
    else:
        return jsonify({"error": "Animal no encontrado"}), 404  

# Ruta para crear un nuevo animal.
@app.route('/animales', methods=['POST'])
def crear_animal():
    datos = request.json  
    id_animal = coleccion_animales.insert_one(datos).inserted_id  
    return jsonify(str(id_animal)), 201  

# Ruta para actualizar los datos de un animal existente.
@app.route('/animales/<id>', methods=['PUT'])
def actualizar_animal(id):
    datos = request.json  
    resultado = coleccion_animales.update_one({"_id": ObjectId(id)}, {"$set": datos})  
    if resultado.modified_count:
        return jsonify({"mensaje": "Animal actualizado"}), 200  
    else:
        return jsonify({"error": "Animal no encontrado"}), 404  

# Ruta para eliminar un animal por su ID.
@app.route('/animales/<id>', methods=['DELETE'])
def eliminar_animal(id):
    resultado = coleccion_animales.delete_one({"_id": ObjectId(id)})  
    if resultado.deleted_count:
        return jsonify({"mensaje": "Animal eliminado"}), 200  
    else:
        return jsonify({"error": "Animal no encontrado"}), 404  

# Iniciamos la aplicación Flask en modo de depuración.
if __name__ == '__main__':
    app.run(debug=True)

