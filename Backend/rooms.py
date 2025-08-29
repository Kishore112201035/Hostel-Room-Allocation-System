#Women
# Savari Malhar Facing (AM)
MF = [
    [[101, 0], [102, 0], [103, 0], [106, 0], [110, 0], [111, 0]],  # 1st floor
    [[201, 0], [202, 0], [203, 0], [206, 0], [210, 0], [211, 0]],  # 2nd floor
    [[301, 0], [302, 0], [303, 0], [306, 0], [310, 0], [311, 0]]   # 3rd floor
]

# Saveri Acad-facing rooms (SA)
AF = [
    [[127, 0], [126, 0], [123, 0], [122, 0]],  # 1st floor
    [[227, 0], [226, 0], [223, 0], [222, 0]],  # 2nd floor
    [[327, 0], [326, 0], [323, 0], [322, 0]]   # 3rd floor
]

#Malhar Forest Facing (FF)
FF = [
    [[127, 0], [126, 0], [123, 0], [122, 0]],  # 1st floor
    [[227, 0], [226, 0], [223, 0], [222, 0]],  # 2nd floor
    [[327, 0], [326, 0], [323, 0], [322, 0]]   # 3rd floor
]

#Malhar Hill Facing (HF)
HF = [
    [[101, 0], [102, 0], [103, 0], [106, 0], [110, 0], [111, 0], [112 ,0]],  # 1st floor
    [[201, 0], [202, 0], [203, 0], [206, 0], [210, 0], [211, 0], [212 ,0]],  # 2nd floor
    [[301, 0], [302, 0], [303, 0], [306, 0], [310, 0], [311, 0], [312 ,0]]   # 3rd floor
]




#MEN
#Savari Malhar Side (SMS)
SMS = [
    [[51, 0], [50, 0], [47, 0], [46, 0]],  # 0th floor
    [[151, 0], [150, 0], [147, 0], [146, 0]],  # 1st floor
    [[251, 0], [250, 0], [247, 0], [246, 0]],  # 2nd floor     
    [[351, 0], [350, 0], [347, 0], [346, 0]]   # 3rd floor       
]

#Saveri Opean Side (SOS)
SOS = [
  [[0, 1], [0, 1], [0, 1], [0, 1]],  
  [[144, 0], [141, 0], [140, 0], [139, 0]],  # 1s
  [[244, 0], [241, 0], [240, 0], [239, 0]],  # 2s
  [[344, 0], [341, 0], [340, 0], [339, 0]]   # 3s
]

#Saveri kadaram side (SKS)
SKS = [
    [[37, 0], [35, 0], [34, 0], [33, 0]],
  [[137, 0], [135, 0], [134, 0], [133, 0]],  
  [[237, 0], [235, 0], [234, 0], [233, 0]],  
  [[337, 0], [335, 0], [334, 0], [333, 0]]   
]

#Saveri ACad Side (SAS)
SAS = [
    [[30, 0], [29, 0], [28, 0], [25, 0]],   # 0th floor
    [[130, 0], [129, 0], [128, 0], [125, 0]],  # 1st floor
    [[230, 0], [229, 0], [228, 0], [225, 0]],  # 2nd floor
    [[330, 0], [329, 0], [328, 0], [325, 0]]   # 3rd floor
]

#Mahlar Forest 1 side (MF1S)
MF1S = [
    [[51, 0], [50, 0], [47, 0], [46, 0]],  # 0th floor
    [[151, 0], [150, 0], [147, 0], [146, 0]],  # 1st floor
    [[251, 0], [250, 0], [247, 0], [246, 0]],  # 2nd floor     
    [[351, 0], [350, 0], [347, 0], [346, 0]]   # 3rd floor       
]

#Malhar Forest 2 Side (MF2S)
MF2S = [
    [[0, 1], [0, 1], [0, 1], [0, 1]],  
  [[144, 0], [141, 0], [140, 0], [139, 0]],  # 1s
  [[244, 0], [241, 0], [240, 0], [239, 0]],  # 2s
  [[344, 0], [341, 0], [340, 0], [339, 0]]   # 3s   
]

#Malhar BasketBall Court Side 
MBS = [
    [[30, 0], [29, 0], [28, 0], [25, 0],[37, 0], [35, 0], [34, 0], [33, 0]],   # 0th floor
    [[130, 0], [129, 0], [128, 0], [125, 0],[137, 0], [135, 0], [134, 0], [133, 0]],  # 1st floor
    [[230, 0], [229, 0], [228, 0], [225, 0],[237, 0], [235, 0], [234, 0], [233, 0]],  # 2nd floor
    [[330, 0], [329, 0], [328, 0], [325, 0],[337, 0], [335, 0], [334, 0], [333, 0]]   # 3rd floor

]


def print_allocation():
    print("\n--- Room Allocation Status ---")
    print("Choose option:")
    print("1 → Show both Allocated & Unallocated")
    print("2 → Show only Allocated")
    print("3 → Show only Unallocated")

    choice = input("Enter 1, 2, or 3: ").strip()

    blocks = {
        "SM": SM,
        "SA": SA,
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
            # floor name formatting
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
    print_allocation()