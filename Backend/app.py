

import openpyxl
import importlib.util
import sys
import os

# --- File paths ---
excel_path = "hostel_data.xlsx"
rooms_file = "rooms.py"

# Check files exist
if not os.path.exists(excel_path):
    raise FileNotFoundError(f"❌ Excel file not found: {excel_path}")
if not os.path.exists(rooms_file):
    raise FileNotFoundError(f"❌ Rooms file not found: {rooms_file}")

# --- Load hostel_data.xlsx ---
wb = openpyxl.load_workbook(excel_path)
sheet = wb.active   # first sheet (with student data)

# Create fresh "final allocation" sheet
if "final allocation" in wb.sheetnames:
    ws_final = wb["final allocation"]
    wb.remove(ws_final)
ws_final = wb.create_sheet("final allocation")
ws_final.append(["Email ID", "Allocated Room"])

# --- Load rooms.py dynamically ---
spec = importlib.util.spec_from_file_location("rooms", rooms_file)
rooms = importlib.util.module_from_spec(spec)
sys.modules["rooms"] = rooms
spec.loader.exec_module(rooms)

# Map Excel preferences to rooms.py variables
pref_map = {
    "MF": "SM",   # Malhar-facing → SM
    "AF": "SA"    # Acad-facing → SA
}

# Helper function to allocate
def allocate_room(pref_code, floor_num):
    """Try to allocate first free room in given preference+floor"""
    if pref_code not in pref_map:
        return None
    block_name = pref_map[pref_code]
    block = getattr(rooms, block_name, None)
    if not block:
        return None

    try:
        floor_idx = int(floor_num) - 1  # floor1=1 → index=0
    except Exception:
        return None

    if floor_idx < 0 or floor_idx >= len(block):
        return None

    for room in block[floor_idx]:
        if room[1] == 0:        # available
            room[1] = 1
            return room[0]      # return room number
    return None

# --- Go through students FIFO ---
for row in sheet.iter_rows(min_row=2, values_only=True):
    if not row or not row[0]:
        continue

    email = row[0]
    floor1, pref1, floor2, pref2, floor3, pref3 = row[3:9]

    allocated = None
    if pref1 and floor1:
        allocated = allocate_room(str(pref1).strip(), floor1)
    if not allocated and pref2 and floor2:
        allocated = allocate_room(str(pref2).strip(), floor2)
    if not allocated and pref3 and floor3:
        allocated = allocate_room(str(pref3).strip(), floor3)

    ws_final.append([email, allocated if allocated else "Not Allocated"])

# Save updated Excel
wb.save(excel_path)

# --- Update rooms.py with new allocations ---
all_rooms = []
for block_name in ["SM", "SA"]:
    block = getattr(rooms, block_name)
    for floor in block:
        for room in floor:
            all_rooms.append(room)

with open(rooms_file, "r") as f:
    code = f.read()

updated_code = []
for line in code.splitlines():
    if "[[" in line:  # line with rooms
        for room in all_rooms:
            line = line.replace(f"[{room[0]}, 0]", f"[{room[0]}, {room[1]}]")
            line = line.replace(f"[{room[0]}, 1]", f"[{room[0]}, {room[1]}]")
    updated_code.append(line)

with open(rooms_file, "w") as f:
    f.write("\n".join(updated_code))

print("✅ Allocation completed with 3 preferences. Excel + rooms.py updated.")
