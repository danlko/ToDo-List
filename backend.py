import json
import os
from flask import Flask, request, jsonify, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data_file = 'data.json'


def ensure_data_file():
    if not os.path.exists(data_file):
        with open(data_file, 'w', encoding='utf-8') as f:
            json.dump([], f, ensure_ascii=False, indent=2)


def read_items():
    ensure_data_file()
    with open(data_file, 'r', encoding='utf-8') as f:
        return json.load(f)


def write_items(items):
    with open(data_file, 'w', encoding='utf-8') as f:
        json.dump(items, f, ensure_ascii=False, indent=2)


def next_id(items):
    if not items:
        return 1
    return max(item.get('id', 0) for item in items) + 1


@app.route('/items', methods=['GET'])
def get_items():
    items = read_items()
    return jsonify(items)


@app.route('/items', methods=['POST'])
def add_item():
    payload = request.get_json()
    if not payload or 'name' not in payload:
        return jsonify({'error': 'Missing "name" in request body'}), 400

    items = read_items()
    item = {
        'id': next_id(items),
        'name': str(payload['name']).strip(),
        'completed': bool(payload.get('completed', False))
    }
    items.append(item)
    write_items(items)
    return jsonify(item), 201


@app.route('/items/<int:item_id>', methods=['PUT', 'PATCH'])
def update_item(item_id):
    payload = request.get_json()
    if not payload:
        return jsonify({'error': 'Missing JSON body'}), 400

    items = read_items()
    for i, it in enumerate(items):
        if it.get('id') == item_id:
            name = payload.get('name')
            if name is not None:
                items[i]['name'] = str(name).strip()
            if 'completed' in payload:
                items[i]['completed'] = bool(payload['completed'])
            write_items(items)
            return jsonify(items[i])

    return jsonify({'error': 'Item not found'}), 404


@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    items = read_items()
    new_items = [it for it in items if it.get('id') != item_id]
    if len(new_items) == len(items):
        return jsonify({'error': 'Item not found'}), 404
    write_items(new_items)
    return '', 204


if __name__ == '__main__':
    # Запуск: python backend.py
    app.run(host='127.0.0.1', port=3000, debug=True)