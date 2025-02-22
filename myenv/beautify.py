import ast
import re

with open('meals.txt', 'r') as file:
    meals = ast.literal_eval(file.read())

with open('meal_hrefs.txt', 'r') as file:
    meal_hrefs = ast.literal_eval(file.read())

with open('meal_details.txt', 'r') as file:
    meal_details = ast.literal_eval(file.read())

with open('ingredients.txt', 'r') as file:
    ingr = ast.literal_eval(file.read())

with open('nutrition.txt', 'r') as file:
    nutr = ast.literal_eval(file.read())
    

meal_names = []

for i in range(0, len(meal_details)):
    start_marker = '<div class=\"station-item-details\"><span class=\"station-item-text\">'
    end_marker ='</span><div'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', meal_details[i])
    if (match):
        meal_names.append(match.group(1).strip())

#print(meal_names)

tags = []

for i in range(0, len(meal_details)):
    start_marker = 'alt=\"'
    end_marker ='\" title='
    matches = re.findall(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', meal_details[i])
    specific_meal_tags = []
    for match in matches:
        specific_meal_tags.append(match.strip())
    tags.append(specific_meal_tags)

#print(tags)

ingredients = []

for i in range(0, len(ingr)):
    if (not (ingr[i] == ('null'))):
        start_marker = '<div class=\"nutrition-ingredient-list\"><div class=\"\">'
        end_marker ='</div></div>'
        match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', ingr[i])
        if (match):
            ingredients.append(match.group(1).strip())

#print(ingredients)

nutrition = []

for i in range(0, len(nutr)):
    nutr_arr = []

    fat = []
    start_marker = '<div class=\"nutrition-table-row\"><span class=\"table-row-label\">'
    end_marker = '</span><span class=\"table-row-labelValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][0])
    if match:
        fat.append(match.group(1).strip())
    start_marker = '</span><span class=\"table-row-labelValue\">'
    end_marker = '</span><span class=\"table-row-dailyValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][0])
    if match:
        fat.append(match.group(1).strip())
    daily_value_start = '</span><span class=\"table-row-dailyValue\">'
    daily_value_end = '</span>'
    daily_value_match = re.search(f'{re.escape(daily_value_start)}(.*?){re.escape(daily_value_end)}', nutr[i][0])
    if daily_value_match:
        fat.append(daily_value_match.group(1).strip())
    nutr_arr.append(fat)

    saturated_fat = []
    start_marker = '<div class=\"nutrition-table-row subRow\"><span class=\"table-row-label\">'
    end_marker = '</span><span class=\"table-row-labelValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][1])
    if match:
        saturated_fat.append(match.group(1).strip())
    start_marker = '</span><span class=\"table-row-labelValue\">'
    end_marker = '</span><span class=\"table-row-dailyValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][1])
    if match:
        saturated_fat.append(match.group(1).strip())
    daily_value_match = re.search(f'{re.escape(daily_value_start)}(.*?){re.escape(daily_value_end)}', nutr[i][1])
    if daily_value_match:
        saturated_fat.append(daily_value_match.group(1).strip())
    nutr_arr.append(saturated_fat)

    cholesterol = []
    start_marker = '<div class=\"nutrition-table-row\"><span class=\"table-row-label\">'
    end_marker = '</span><span class=\"table-row-labelValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][2])
    if match:
        cholesterol.append(match.group(1).strip())
    start_marker = '</span><span class=\"table-row-labelValue\">'
    end_marker = '</span><span class=\"table-row-dailyValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][2])
    if match:
        cholesterol.append(match.group(1).strip())
    daily_value_match = re.search(f'{re.escape(daily_value_start)}(.*?){re.escape(daily_value_end)}', nutr[i][2])
    if daily_value_match:
        cholesterol.append(daily_value_match.group(1).strip())
    nutr_arr.append(cholesterol)

    sodium = []
    start_marker = '<div class=\"nutrition-table-row\"><span class=\"table-row-label\">'
    end_marker = '</span><span class=\"table-row-labelValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][3])
    if match:
        sodium.append(match.group(1).strip())
    start_marker = '</span><span class=\"table-row-labelValue\">'
    end_marker = '</span><span class=\"table-row-dailyValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][3])
    if match:
        sodium.append(match.group(1).strip())
    daily_value_match = re.search(f'{re.escape(daily_value_start)}(.*?){re.escape(daily_value_end)}', nutr[i][3])
    if daily_value_match:
        sodium.append(daily_value_match.group(1).strip())
    nutr_arr.append(sodium)

    carbohydrates = []
    start_marker = '<div class=\"nutrition-table-row\"><span class=\"table-row-label\">'
    end_marker = '</span><span class=\"table-row-labelValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][4])
    if match:
        carbohydrates.append(match.group(1).strip())
    start_marker = '</span><span class=\"table-row-labelValue\">'
    end_marker = '</span><span class=\"table-row-dailyValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][4])
    if match:
        carbohydrates.append(match.group(1).strip())
    daily_value_match = re.search(f'{re.escape(daily_value_start)}(.*?){re.escape(daily_value_end)}', nutr[i][4])
    if daily_value_match:
        carbohydrates.append(daily_value_match.group(1).strip())
    nutr_arr.append(carbohydrates)

    sugar = []
    start_marker = '<div class=\"nutrition-table-row subRow\"><span class=\"table-row-label\">'
    end_marker = '</span><span class=\"table-row-labelValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][5])
    if match:
        sugar.append(match.group(1).strip())
    start_marker = '</span><span class=\"table-row-labelValue\">'
    end_marker = '</span><span class=\"table-row-dailyValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][5])
    if match:
        sugar.append(match.group(1).strip())
    daily_value_match = re.search(f'{re.escape(daily_value_start)}(.*?){re.escape(daily_value_end)}', nutr[i][5])
    if daily_value_match:
        sugar.append(daily_value_match.group(1).strip())
    nutr_arr.append(sugar)

    added_sugar = []
    start_marker = '<div class=\"nutrition-table-row subRow\"><span class=\"table-row-label\">'
    end_marker = '</span><span class=\"table-row-labelValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][6])
    if match:
        added_sugar.append(match.group(1).strip())
    start_marker = '</span><span class=\"table-row-labelValue\">'
    end_marker = '</span><span class=\"table-row-dailyValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][6])
    if match:
        added_sugar.append(match.group(1).strip())
    daily_value_match = re.search(f'{re.escape(daily_value_start)}(.*?){re.escape(daily_value_end)}', nutr[i][6])
    if daily_value_match:
        added_sugar.append(daily_value_match.group(1).strip())
    nutr_arr.append(added_sugar)

    dietary_fiber = []
    start_marker = '<div class=\"nutrition-table-row subRow\"><span class=\"table-row-label\">'
    end_marker = '</span><span class=\"table-row-labelValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][7])
    if match:
        dietary_fiber.append(match.group(1).strip())
    start_marker = '</span><span class=\"table-row-labelValue\">'
    end_marker = '</span><span class=\"table-row-dailyValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][7])
    if match:
        dietary_fiber.append(match.group(1).strip())
    daily_value_match = re.search(f'{re.escape(daily_value_start)}(.*?){re.escape(daily_value_end)}', nutr[i][7])
    if daily_value_match:
        dietary_fiber.append(daily_value_match.group(1).strip())
    nutr_arr.append(dietary_fiber)

    protein = []
    start_marker = '<div class=\"nutrition-table-row\"><span class=\"table-row-label\">'
    end_marker = '</span><span class=\"table-row-labelValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][8])
    if match:
        protein.append(match.group(1).strip())
    start_marker = '</span><span class=\"table-row-labelValue\">'
    end_marker = '</span><span class=\"table-row-dailyValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][8])
    if match:
        protein.append(match.group(1).strip())
    daily_value_match = re.search(f'{re.escape(daily_value_start)}(.*?){re.escape(daily_value_end)}', nutr[i][8])
    if daily_value_match:
        protein.append(daily_value_match.group(1).strip())
    nutr_arr.append(protein)

    calcium = []
    start_marker = '<div class=\"nutrition-table-row\"><span class=\"table-row-label\">'
    end_marker = '</span><span class=\"table-row-dailyValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][9])
    if match:
        calcium.append(match.group(1).strip())
    daily_value_match = re.search(f'{re.escape(daily_value_start)}(.*?){re.escape(daily_value_end)}', nutr[i][9])
    if daily_value_match:
        calcium.append(daily_value_match.group(1).strip())
    nutr_arr.append(calcium)

    iron = []
    start_marker = '<div class=\"nutrition-table-row\"><span class=\"table-row-label\">'
    end_marker = '</span><span class=\"table-row-dailyValue\">'
    match = re.search(f'{re.escape(start_marker)}(.*?){re.escape(end_marker)}', nutr[i][10])
    if match:
        iron.append(match.group(1).strip())
    daily_value_match = re.search(f'{re.escape(daily_value_start)}(.*?){re.escape(daily_value_end)}', nutr[i][10])
    if daily_value_match:
        iron.append(daily_value_match.group(1).strip())
    nutr_arr.append(iron)

    nutrition.append(nutr_arr)

#print(nutrition)