from PIL import Image

def remove_background(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        r, g, b, a = item
        # Check if pixel is light/white/gray background
        # Real coffee bean is dark brown (r, g, b are low to mid brown)
        if r > 160 and g > 160 and b > 160:
            new_data.append((0, 0, 0, 0)) # Pure transparent
        elif r > 140 and g > 140 and b > 140 and abs(r - g) < 20 and abs(g - b) < 20:
            new_data.append((0, 0, 0, 0)) # Neutral gray background
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Background successfully removed! Saved to {output_path}")

if __name__ == "__main__":
    remove_background("y:/coffee shop/public/images/real_coffee_bean.png", "y:/coffee shop/public/images/real_coffee_bean.png")
