#Women
# Savari Malhar Facing (AM)
MF = [[[101, 1], [102, 0], [103, 0], [106, 0], [110, 0], [111, 0]], [[201, 1], [202, 0], [203, 0], [206, 0], [210, 0], [211, 0]], [[301, 0], [302, 0], [303, 0], [306, 0], [310, 0], [311, 0]]]

# Saveri Acad-facing rooms (SA)
AF = [[[127, 1], [126, 1], [123, 0], [122, 0]], [[227, 1], [226, 1], [223, 0], [222, 0]], [[327, 0], [326, 0], [323, 0], [322, 0]]]

#Malhar Forest Facing (FF)
FF = [[[127, 0], [126, 0], [123, 0], [122, 0]], [[227, 0], [226, 0], [223, 0], [222, 0]], [[327, 0], [326, 0], [323, 0], [322, 0]]]

#Malhar Hill Facing (HF)
HF = [[[101, 0], [102, 0], [103, 0], [106, 0], [110, 0], [111, 0], [112, 0]], [[201, 0], [202, 0], [203, 0], [206, 0], [210, 0], [211, 0], [212, 0]], [[301, 0], [302, 0], [303, 0], [306, 0], [310, 0], [311, 0], [312, 0]]]



#MEN
#Savari Malhar Side (SMS)
SMS = [[[51, 0], [50, 0], [47, 0], [46, 0]], [[151, 0], [150, 0], [147, 0], [146, 0]], [[251, 0], [250, 0], [247, 0], [246, 0]], [[351, 0], [350, 0], [347, 0], [346, 0]]]

#Saveri Opean Side (SOS)
SOS = [[[0, 1], [0, 1], [0, 1], [0, 1]], [[144, 0], [141, 0], [140, 0], [139, 0]], [[244, 0], [241, 0], [240, 0], [239, 0]], [[344, 0], [341, 0], [340, 0], [339, 0]]]

#Saveri kadaram side (SKS)
SKS = [[[37, 0], [35, 0], [34, 0], [33, 0]], [[137, 0], [135, 0], [134, 0], [133, 0]], [[237, 0], [235, 0], [234, 0], [233, 0]], [[337, 0], [335, 0], [334, 0], [333, 0]]]

#Saveri ACad Side (SAS)
SAS = [[[30, 0], [29, 0], [28, 0], [25, 0]], [[130, 0], [129, 0], [128, 0], [125, 0]], [[230, 0], [229, 0], [228, 0], [225, 0]], [[330, 0], [329, 0], [328, 0], [325, 0]]]

#Mahlar Forest 1 side (MF1S)
MF1S = [[[51, 0], [50, 0], [47, 0], [46, 0]], [[151, 0], [150, 0], [147, 0], [146, 0]], [[251, 1], [250, 0], [247, 0], [246, 0]], [[351, 0], [350, 0], [347, 0], [346, 0]]]

#Malhar Forest 2 Side (MF2S)
MF2S = [[[0, 1], [0, 1], [0, 1], [0, 1]], [[144, 0], [141, 0], [140, 0], [139, 0]], [[244, 0], [241, 0], [240, 0], [239, 0]], [[344, 0], [341, 0], [340, 0], [339, 0]]]

#Malhar BasketBall Court Side
MBS = [[[30, 0], [29, 0], [28, 0], [25, 0], [37, 0], [35, 0], [34, 0], [33, 0]], [[130, 1], [129, 0], [128, 0], [125, 0], [137, 0], [135, 0], [134, 0], [133, 0]], [[230, 0], [229, 0], [228, 0], [225, 0], [237, 0], [235, 0], [234, 0], [233, 0]], [[330, 0], [329, 0], [328, 0], [325, 0], [337, 0], [335, 0], [334, 0], [333, 0]]]


def print_allocation():
    print("\n--- Room Allocation Status ---")
    print("Choose option:")
    print("1 → Show both Allocated & Unallocated")
    print("2 → Show only Allocated")
    print("3 → Show only Unallocated")

    choice = input("Enter 1, 2, or 3: ").strip()

    blocks = {
        "MF": MF,
        "AF": AF,
        "FF": FF,
        "HF": HF,
        "SMS": SMS,
        "SOS": SOS,
        "SKS": SKS,
        "SAS": SAS,
        "MF1S": MF1S,
        "MF2S": MF2S,
        "MBS": MBS,
    }

    for block_name, block in blocks.items():
        print(f"\nBlock {block_name}:")
        for floor_idx, floor in enumerate(block):
            if floor_idx == 0:
                floor_name = "0th"
            elif floor_idx == 1:
                floor_name = "1st"
            elif floor_idx == 2:
                floor_name = "2nd"
            elif floor_idx == 3:
                floor_name = "3rd"
            else:
                floor_name = f"{floor_idx}th"

            allocated = [room[0] for room in floor if room[1] == 1]
            unallocated = [room[0] for room in floor if room[1] == 0]

            print(f"  Floor {floor_name} floor:")

            if choice == "1":  # both
                print(f"    Allocated   : {allocated if allocated else 'None'}")
                print(f"    Unallocated : {unallocated if unallocated else 'None'}")
            elif choice == "2":  # only allocated
                print(f"    Allocated   : {allocated if allocated else 'None'}")
            elif choice == "3":  # only unallocated
                print(f"    Unallocated : {unallocated if unallocated else 'None'}")
            else:
                print("    Invalid choice! Showing both by default.")
                print(f"    Allocated   : {allocated if allocated else 'None'}")
                print(f"    Unallocated : {unallocated if unallocated else 'None'}")

if __name__ == "__main__":
    # print_allocation()
    pass
