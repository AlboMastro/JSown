export interface ParseResult {
    output: string;
    error: string | null;
}

/**
 * This function generates the necessary lines and text for a correct tabular view of the JSON file.
 * It's responsible for the type checking and the division of schemas and subschemas
 * 
 * @param input The body of the JSON file in the left panel
 * @returns A Go inspired object, with output and error: if there were no errors, the return value has a valid output and error null, otherwise
 * the output will default to empty string and a valid error value will be used to display a small message in the left panel.
 */
export function generateMarkdown(input: string): ParseResult {
    if (!input.trim()) {
        return { output: '', error: null };
    }

    try {
        // Parsing here acts as a foolproof way to check if the JSON is malformed. If something goes wrong, it throws an error caught at the bottom
        const data = JSON.parse(input);
        const subSchemas: string[] = [];

        let mainMarkdown = '';

        if (Array.isArray(data)) {
            // If the root input ends up being an array of objects, the first item is taken to map out the columns.
            // If the array is made of primitives, then it gets simply mapped.
            if (data.length > 0 && typeof data[0] === 'object' && data[0] !== null) {
                mainMarkdown = parseObjectToTable('Root Array Item', data[0], subSchemas, 'root');
            } else {
                return { output: '```json\n' + JSON.stringify(data, null, 2) + '\n```', error: null };
            }
        } else if (typeof data === 'object' && data !== null) {
            mainMarkdown = parseObjectToTable('Payload Schema', data, subSchemas, 'root');
        } else {
            return { output: '`' + String(data) + '`', error: null };
        }

        let finalOutput = mainMarkdown;
        // If subschemas are found, this part appends a subsection to the main schema
        if (subSchemas.length > 0) {
            finalOutput += `\n\n---\n\n## Nested Schemas\n\n` + subSchemas.join('\n\n');
        }

        return { output: finalOutput, error: null };

    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Invalid JSON syntax';
        return { output: '', error: errorMessage };
    }
}


/**
 * @TODO Provide a proper type to the obj parameter!
 * 
 * Recursive function that handles the table generation.
 * If the element analysed is primitive, then print a table, if not then recursively calls itself to handle nested properties.
 * @param title Header title for the specific table
 * @param obj The object being parsed
 * @param subSchemas The array that collects all the subschemas created
 * @param path The string tracking the hierarchy to create the anchor path
 * @returns A markdown table with the Key, Type and Value Example columns
 */
function parseObjectToTable(
    title: string,
    obj: Record<string, any>,
    subSchemas: string[],
    path: string
): string {
    let table = `### ${title}\n\n| Key | Type | Value Example |\n|---|---|---|\n`;

    const localSubSchemas: string[] = [];

    for (const [key, val] of Object.entries(obj)) {
        const type = Array.isArray(val) ? 'array' : (val === null ? 'null' : typeof val);
        const currentPath = `${path}.${key}`;
        // This is to create a lowercase ID (e.g., #schema-root-category) by stripping out non-word characters ([\W_]+). 
        // This acts as the target destination for the internal markdown links.
        const anchorId = `schema-${currentPath.toLowerCase().replace(/[\W_]+/g, '-')}`;

        if (type === 'object' && val !== null) {
            // Nested Object Condition: Generate the link, then call the function again for the subtable
            table += `| \`${key}\` | *object* | => *See nested schema [\`${key}\`](#${anchorId})* |\n`;
            localSubSchemas.push(parseObjectToTable(`Schema: \`${key}\``, val, subSchemas, currentPath));
        }
        // Array of Objects condition: Look at the first element, create a ling and call the function again for the subtable
        else if (type === 'array' && val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
            table += `| \`${key}\` | *array[object]* | => *See schema array items [\`${key}\`](#${anchorId})* |\n`;
            localSubSchemas.push(parseObjectToTable(`Schema Items: \`${key}\``, val[0], subSchemas, currentPath));
        }
        else {
            // Primitives condition: Simply print the value in the table and move
            const displayVal = type === 'string' ? `"${val}"` : String(val ?? 'null');
            table += `| \`${key}\` | *${type}* | \`${displayVal}\` |\n`;
        }
    }

    // Push local findings into the master subSchemas array after the loop finishes
    subSchemas.push(...localSubSchemas);

    return table;
}