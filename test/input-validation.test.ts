import {describe, expect, it} from 'vitest'
import {readFileSync} from "fs";

const filePath = "src/assets/building-blocks_structure.json"
const jsonContent = readFileSync(filePath, "utf8")

type FileNode = {
    name: string
    type: "file"
    path: string
}

type DirectoryNode = {
    name: string
    type: "directory"
    path: string
    children: Node[]
}

type Node = FileNode | DirectoryNode


function validateNode(node: Node, location = "root") {
    expect(node.name).toBeTypeOf("string")
    expect(node.type).toBeTypeOf("string")
    expect(node.path).toBeTypeOf("string")

    if (node.type === "directory" && node.children) {
        expect(Array.isArray(node.children)).toBe(true)

        for (const child of node.children) {
            validateNode(child, `${location}/${child.name}`)
        }
    }
}

// Ensure that the src/assets/building-blocks_structure.json file is valid
describe("JSON file validation", async () => {
    it("should be valid json", async () => {
        expect(() => JSON.parse(jsonContent)).not.toThrow()
    })
})

// Test for expected structure
describe("JSON content validation", async () => {
    const json = JSON.parse(jsonContent)
    it("should have expected structure", async () => {
      // There should be the following properties:
      // name, type, path, children
        expect(json).toMatchObject({
            name: expect.any(String),
            type: expect.any(String),
            path: expect.any(String),
            children: expect.any(Array),
        })

    });
    it("should have at least one child item", async () => {
        expect(json.children.length).toBeGreaterThan(0);
    });
    
    it("should have valid recursive structure", async () => {
        const jsonNodes = json as Node;
        validateNode(jsonNodes)
    })
})