import csv
import json

def csv_to_json(csv_file, json_file):
    # Read CSV file and convert each row to a dictionary
    with open(csv_file, 'r') as csv_input:
        csv_reader = csv.DictReader(csv_input)
        data = [row for row in csv_reader]

    # Write data to JSON file
    with open(json_file, 'w') as json_output:
        json.dump(data, json_output, indent=4)

# Example usage
csv_to_json('products.csv', 'output.json')