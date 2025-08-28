#Women
# Savari Malhar Facing (AM)
SM = [
    [[101, 1], [102, 1], [103, 0], [106, 0], [110, 0], [111, 0]],  # 1st floor
    [[201, 1], [202, 1], [203, 0], [206, 0], [210, 0], [211, 0]],  # 2nd floor
    [[301, 0], [302, 0], [303, 0], [306, 0], [310, 0], [311, 0]]   # 3rd floor
]

# Saveri Acad-facing rooms (SA)
SA = [
    [[127, 1], [126, 1], [123, 0], [122, 0]],  # 1st floor
    [[227, 1], [226, 1], [223, 1], [222, 1]],  # 2nd floor
    [[327, 0], [326, 0], [323, 0], [322, 0]]   # 3rd floor
]


def print_unallocated():
    print("\n--- Unallocated Rooms ---")
    
    for block_name, block in [("SM", SM), ("SA", SA)]:
        print(f"\nBlock {block_name}:")
        for floor_idx, floor in enumerate(block, start=1):
            free_rooms = [room[0] for room in floor if room[1] == 0]
            if free_rooms:
                print(f"  Floor {floor_idx}: {free_rooms}")
            else:
                print(f"  Floor {floor_idx}: None")


# Run only if executed directly
if __name__ == "__main__":
    print_unallocated()