from flask import Flask, jsonify, request

# Initialize Flask application
app = Flask(__name__)



@app.route("/checkurl", methods=["POST"])
def receive_url():
    data = request.get_json()

    url = data["url"]

    print("URL Received: ", url)

    # TODO: Send this URL to the Deep NN and/or LLM and check if it is malicious or not.

    return jsonify({
        "response": "Message received!",
        "URL": url
    }), 200

# Start server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)