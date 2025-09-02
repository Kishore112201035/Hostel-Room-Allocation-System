# from flask import Flask, jsonify, request
# from rooms import MF, AF, FF, HF, SMS, SOS, SKS, SAS, MF1S, MF2S, MBS

# app = Flask(__name__)

# @app.route("/rooms", methods=["GET"])
# def get_rooms():
#     choice = request.args.get("choice", "1")  # 1=both, 2=only allocated, 3=only unallocated

#     blocks = {
#         "MF": MF, "AF": AF, "FF": FF, "HF": HF,
#         "SMS": SMS, "SOS": SOS, "SKS": SKS, "SAS": SAS,
#         "MF1S": MF1S, "MF2S": MF2S, "MBS": MBS,
#     }

#     result = {}

#     for block_name, block in blocks.items():
#         result[block_name] = []
#         for floor in block:
#             allocated = [room[0] for room in floor if room[1] == 1]
#             unallocated = [room[0] for room in floor if room[1] == 0]

#             floor_data = {}
#             if choice == "1":
#                 floor_data["allocated"] = allocated
#                 floor_data["unallocated"] = unallocated
#             elif choice == "2":
#                 floor_data["allocated"] = allocated
#             elif choice == "3":
#                 floor_data["unallocated"] = unallocated
#             else:
#                 floor_data["allocated"] = allocated
#                 floor_data["unallocated"] = unallocated

#             result[block_name].append(floor_data)

#     return jsonify(result)

# if __name__ == "__main__":
#     app.run(debug=True)
from flask import Flask, jsonify, request
from flask_cors import CORS  # ✅ allow frontend to access API
from rooms import MF, AF, FF, HF, SMS, SOS, SKS, SAS, MF1S, MF2S, MBS

app = Flask(__name__)
CORS(app)  # ✅ enable CORS

@app.route("/rooms", methods=["GET"])
def get_rooms():
    choice = request.args.get("choice", "1")  # 1=both, 2=only allocated, 3=only unallocated

    blocks = {
        "MF": MF, "AF": AF, "FF": FF, "HF": HF,
        "SMS": SMS, "SOS": SOS, "SKS": SKS, "SAS": SAS,
        "MF1S": MF1S, "MF2S": MF2S, "MBS": MBS,
    }

    result = {}

    for block_name, block in blocks.items():
        result[block_name] = []
        for floor in block:
            allocated = [room[0] for room in floor if room[1] == 1]
            unallocated = [room[0] for room in floor if room[1] == 0]

            floor_data = {}
            if choice == "1":
                floor_data["allocated"] = allocated
                floor_data["unallocated"] = unallocated
            elif choice == "2":
                floor_data["allocated"] = allocated
            elif choice == "3":
                floor_data["unallocated"] = unallocated
            else:
                floor_data["allocated"] = allocated
                floor_data["unallocated"] = unallocated

            result[block_name].append(floor_data)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
